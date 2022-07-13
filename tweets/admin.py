from django.contrib import admin

from . import models
from profiles.models import Profile
# Register your models here.

admin.site.register(Profile)
admin.site.register(models.User)
admin.site.register(models.Tweet)