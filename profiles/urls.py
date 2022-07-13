from django.urls import path

from . import views

app_name = 'profile'

urlpatterns = [
    path('<str:username>/', views.ProfileDetailView.as_view(), name='profile-detail'),
    path('<str:username>/tweets/', views.ProfileTweetListView.as_view(), name='profile-tweets'),
    path('<str:username>/update/', views.ProfileUpdateView.as_view(), name='profile-update'),
    
]