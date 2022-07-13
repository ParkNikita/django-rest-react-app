from pyexpat import model
from django.db import models
from django.conf import settings
# Create your models here.

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=60, blank=True, null=True)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    nickname = models.CharField(max_length=60, blank=True, null=True)
    bio = models.CharField(max_length=300, blank=True, null=True)
    location = models.CharField(max_length=300, blank=True, null=True)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.user.username
