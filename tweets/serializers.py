from django.conf import settings

from rest_framework import serializers

from . import models
from profiles.models import Profile


TWEET_ACTIONS_OPTIONS = settings.TWEET_ACTIONS_OPTIONS


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = models.User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        profile = Profile.objects.create(
            user = user
        )
        return user

    class Meta:
        model = models.User
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "username", "password", )


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if value not in TWEET_ACTIONS_OPTIONS:
            raise serializers.ValidationError('This is not a valid action for tweets')
        return value



class TweetCreateSerializer(serializers.HyperlinkedModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Tweet
        fields = ['id', 'content', 'likes', 'username']

    def get_likes(self, obj):
        return obj.likes.count()
    
    def get_username(self, obj):
        return obj.user.username


class TweetSerializer(serializers.HyperlinkedModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    content = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True) 

    class Meta:
        model = models.Tweet
        fields = ['id', 'likes', 'is_retweet', 'parent', 'image', 'content', 'user'] 

    def get_likes(self, obj):
        return obj.likes.count()

    def get_content(self, obj):
        if obj.is_retweet:
            return obj.parent.content 
        return obj.content

    def get_user(self, obj):
        return obj.user.username
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.url