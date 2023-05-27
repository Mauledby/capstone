from django.urls import path
from basic_app import views

app_name = 'basic_app'

urlpatterns = [
    path('register/', views.register, name='register'),
    path('user_login/', views.user_login, name='user_login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('user_list/', views.user_list, name='userlist'),
    path('award_points/<int:recipient_id>/', views.award_points, name='award_points'),
]
