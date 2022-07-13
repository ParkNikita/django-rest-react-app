from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass


class TweetLike(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Tweet(models.Model):
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL, blank=True)
    content = models.TextField(max_length=240, blank=True, null=True)
    image = models.ImageField(blank=True, null=True)
    likes = models.ManyToManyField('User', related_name = 'tweet_user', blank=True, through='TweetLike')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        
    @property
    def is_retweet(self):
        return self.parent != None

    def __str__(self):
        return self.content