from django.contrib.auth import get_user_model

from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers

from . import models

User = get_user_model()

class FollowerProfile(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ('image', 'first_name', 'last_name')
    

class FollowerUserSerializer (serializers.ModelSerializer):
    profile = FollowerProfile()

    class Meta:
        model = User
        fields = ('username', 'profile', )


class FollowingSerializer (serializers.ModelSerializer):
    user = FollowerUserSerializer()
    
    class Meta:
        model = models.Profile
        fields = ('user',)


class ProfileSerializer(serializers.Serializer):
    user = serializers.CharField()
    nickname = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    bio = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)
    count_followers = serializers.SerializerMethodField(required=False)
    count_following = serializers.SerializerMethodField(required=False)
    followers = serializers.SerializerMethodField(required=False) 
    following = serializers.SerializerMethodField(required=False) 
    is_following = serializers.SerializerMethodField(required=False) 
    
    def get_is_following(self, obj):
        is_following = False
        user = self.context.get('request', None).user
        is_following = user in obj.followers.all()
        return is_following

    def get_count_followers(self, obj):
        return obj.followers.count()

    def get_followers(self, obj):
        profile = models.Profile.objects.get(id=obj.id)
        followers = profile.followers.all()
        serializer = FollowerUserSerializer(followers, many=True)
        return serializer.data

    def get_count_following(self, obj):
        return obj.user.following.count()

    def get_following(self, obj):
        followers = obj.user.following.all()
        serializer = FollowingSerializer(followers, many=True)
        return serializer.data
    
    def update(self, instance, validated_data):
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.location = validated_data.get('location', instance.location)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
