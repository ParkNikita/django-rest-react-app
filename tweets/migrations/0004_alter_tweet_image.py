# Generated by Django 4.0.5 on 2022-07-03 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0003_tweetlike_tweet_likes_tweetlike_tweet_tweetlike_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
