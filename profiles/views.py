from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from tweets.models import Tweet
from tweets.serializers import TweetSerializer

from . import models
from . import serializers

# Create your views here.

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



