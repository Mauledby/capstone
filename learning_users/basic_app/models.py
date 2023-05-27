from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # Any additional fields or modifications you need
    objects = UserManager()

    USERNAME_FIELD = 'email'

    class Meta:
        swappable = 'AUTH_USER_MODEL'
        default_related_name = 'basic_app_users'

    
class UserProfileInfo(models.Model):
    profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    coin_balance = models.FloatField(default=0.0)
    point_balance = models.FloatField(default=0.0)

    def __str__(self):
        return self.user.email


class Transaction(models.Model):
    transactionId = models.CharField(max_length=100)
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    transactionType = models.CharField(max_length=100)
    amount = models.FloatField()
    currency = models.CharField(max_length=100)
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.transactionId
