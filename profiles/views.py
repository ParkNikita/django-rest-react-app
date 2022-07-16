from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from tweets.models import Tweet
from tweets.serializers import TweetSerializer
from . import models
from . import serializers

# Create your views here.

User = get_user_model()


class ProfileTweetListView(APIView):
    def get(self, request, username, *args, **kwargs):
        queryset = Tweet.objects.filter(user__username=username)
        serializer = TweetSerializer(queryset, many=True)
        return Response(serializer.data, status=200)


class ProfileDetailView(APIView):
    def get(self, request, username, *args, **kwargs):
        try:
            queryset = models.Profile.objects.get(user__username=username)
        except:
            return Response({'message': 'Profile does not find'}, status=404)
        serializer = serializers.ProfileSerializer(queryset)
        return Response(serializer.data, status=200)


class ProfileUpdateView(APIView):
    def put(self, request, username, *args, **kwargs):
        profile = models.Profile.objects.get(user__username=username)
        serializer = serializers.ProfileSerializer(profile, data=request.data)    
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileFollowView(APIView):
    def post(self, request, username, *args, **kwargs):
        me = User.objects.get(username=username)
        try:
            to_follow_user = models.Profile.objects.get(user__username=request.data['username'])
        except:
            return Response({"message":"Cant follow user"}, status=401)  
        to_follow_user.followers.add(me)
        return Response({"message":"successfully followed"},status=200)




