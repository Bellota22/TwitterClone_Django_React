from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('follow/<str:username>/', views.follow),
    path('register/', views.register),
    path('reco/', views.reco ),
    path('login/', views.MyTokenObtainPairSerializer.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('<str:username>/', views.UserDetailView.as_view()),
    path('u/search/', views.search),
]

