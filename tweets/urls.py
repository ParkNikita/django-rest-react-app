from django.urls import path, include

from . import views

app_name = 'tweets'

urlpatterns = [
    path('', views.TweetListView.as_view(), name='tweet-list'),
    path('create/', views.TweetCreateView.as_view(), name='tweet-create'),
    path('<int:pk>/', views.TweetDetailView.as_view(), name='tweet-detail'),
    path('<int:pk>/delete/', views.TweetDeleteView.as_view(), name='tweet-delete'),
    path('action/', views.TweetActionView.as_view(), name='tweet-action')
]
