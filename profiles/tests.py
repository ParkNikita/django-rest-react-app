from venv import create
from django.test import TestCase
from django.contrib.auth import get_user_model

from . import models

# Create your tests here.

User = get_user_model()


def create_user(username, password):
    return User.objects.create_user(username, password)


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user1 = create_user('first', 'somepass')
        self.user2 = create_user('second', 'somepass')
        self.profile1 = models.Profile.objects.create(user=self.user1)
        self.profile2 = models.Profile.objects.create(user=self.user2)

    def test_profile_created(self):
        qs = models.Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        self.profile1.followers.add(self.user2)
        second_user_following_whom = self.user2.following.all()
        qs = second_user_following_whom.filter(user = self.user1)
        first_user_following_no_one = self.user1.following.all()
        self.assertTrue(qs.exists())
        self.assertFalse(first_user_following_no_one.exists())

