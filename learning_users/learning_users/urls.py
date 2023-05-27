from django.urls import path, include
from django.contrib import admin
from basic_app import views

urlpatterns = [
    path('', views.index, name='index'),
    path('special/', views.special, name='special'),
    path('admin/', admin.site.urls),
    path('basic_app/', include('basic_app.urls')),
    path('logout/', views.user_logout, name='logout'),
]
from django.urls import path, include
from django.contrib import admin
from basic_app import views

urlpatterns = [
    path('', views.index, name='index'),
    path('special/', views.special, name='special'),
    path('admin/', admin.site.urls),
    path('basic_app/', include('basic_app.urls')),
    path('logout/', views.user_logout, name='logout'),
]
