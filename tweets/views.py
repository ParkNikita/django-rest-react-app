from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import CreateAPIView

from . import models
from . import serializers
# Create your views here.


class UserCreateView(CreateAPIView):
    model = models.User
    permission_classes = [
        AllowAny 
    ]
    serializer_class = serializers.UserCreateSerializer
    


class TweetListView(APIView):
    def get(self, request, *args, **kwargs):
        queryset = models.Tweet.objects.all()
        serializer = serializers.TweetSerializer(queryset, many=True)
        return Response(serializer.data, status=200)


class TweetDetailView(APIView):
    def get(self, request, pk,  *args, **kwargs):
        try:
            queryset = models.Tweet.objects.get(id=pk)
        except:
            return Response({'message': 'Tweet does not exist'}, status=404)
        serializer = serializers.TweetSerializer(queryset)
        return Response(serializer.data, status=200)


class TweetCreateView(APIView):
    permission_classes = [IsAuthenticated] 

    def post(self, request, *args, **kwargs):
        serializer = serializers.TweetCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=200)
        return Response(serializer.errors)


class TweetDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            tweet = models.Tweet.objects.get(id=pk)
        except:
            return Response({'message': 'You can not delete this tweet'}, status=401)
        tweet.delete()
        return Response({'message': 'Tweet removed'}, status=200)


class TweetActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = serializers.TweetActionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            data = serializer.validated_data
            id = data.get('id')
            action = data.get('action')
            content = data.get('content')
            tweet = models.Tweet.objects.get(id=id)
            if not tweet:
                return Response({}, status=404)

            if action == 'like':
                tweet.likes.add(request.user)
                serializer = serializers.TweetSerializer(tweet)
                return Response(serializer.data, status=200)

            elif action == 'unlike':
                tweet.likes.remove(request.user)
                serializer = serializers.TweetSerializer(tweet)
                return Response(serializer.data, status=200)

            elif action == 'retweet' and tweet.parent != None:
                new_tweet = models.Tweet.objects.create(
                    user = request.user,
                    parent = tweet.parent,
                    content = content
                )

            elif action == 'retweet':
                new_tweet = models.Tweet.objects.create(
                    user = request.user,
                    parent = tweet,
                    content = content
                )
                serializer = serializers.TweetSerializer(new_tweet)
                return Response(serializer.data, status=201)

