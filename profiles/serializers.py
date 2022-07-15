from rest_framework import serializers

from . import models

class ProfileSerializer(serializers.Serializer):
    user = serializers.CharField()
    nickname = serializers.CharField(required=False)
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    date_of_birth = serializers.DateField(required=False)
    bio = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    image = serializers.ImageField(required=False)
    followers = serializers.SerializerMethodField(required=False)
    following = serializers.SerializerMethodField(required=False)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        print(validated_data)
        instance.nickname = validated_data.get('nickname', instance.nickname)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.location = validated_data.get('location', instance.location)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
    
    def get_followers(self, obj):
        return obj.followers.count()

    def get_following(self, obj):
        return obj.user.following.count()





    # id = serializers.SerializerMethodField(read_only=False)
    # username = serializers.SerializerMethodField(read_only=False)
    # nickname = serializers.SerializerMethodField(required=False, read_only=False)
    # bio = serializers.SerializerMethodField(required=False, read_only=False)
    # location = serializers.SerializerMethodField(required=False, read_only=False)
    # image = serializers.SerializerMethodField(read_only=False)

    # class Meta:
    #     model = models.Profile
    #     fields = ['id', 'username','nickname', 'bio', 'location', 'image']

    # def get_id(self, obj):
    #     return obj.id

    # def get_nickname(self, obj):
    #     return obj.nickname

    # def get_username(self, obj):
    #     return obj.user.username

    # def get_bio(self, obj):
    #     return obj.bio

    # def get_location(self, obj):
    #     return obj.location
    
    # def get_image(self, obj):
    #     return obj.image.url

    # def update(self, instance, validated_data):
    #     """
    #     Update and return an existing `Snippet` instance, given the validated data.
    #     """
    #     print(self.validated_data['location'])
    #     instance.nickname = validated_data.get('nickname', instance.nickname)
    #     instance.bio = validated_data.get('bio', instance.bio)
    #     instance.location = validated_data.get('location', instance.location)
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.save()
    #     return instance