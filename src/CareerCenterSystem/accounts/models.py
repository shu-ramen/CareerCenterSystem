from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, first_name, last_name, first_name_kana, last_name_kana, phone_number, password=None):
        if not username:
            raise ValueError("Users must have an username")
        if not email:
            raise ValueError("Users must have an email")
        if not first_name:
            raise ValueError("Users must have a first name")
        if not last_name:
            raise ValueError("Users must have a last name")
        if not first_name_kana:
            raise ValueError("Users must have a first name kana")
        if not last_name_kana:
            raise ValueError("Users must have a last name kana")
        if not phone_number:
            raise ValueError("Users must have a phone number")
        
        user = self.model(
            username = username,
            email = BaseUserManager.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            first_name_kana = first_name_kana,
            last_name_kana = last_name_kana,
            phone_number = phone_number
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, first_name, last_name, first_name_kana, last_name_kana, phone_number, password):
        u = self.create_user(username, email, first_name, last_name, first_name_kana, last_name_kana, phone_number, password=password)
        u.is_superuser = True
        u.is_staff = True
        u.save(using=self._db)
        return u

class CustomUser(AbstractUser):
    """ カスタムユーザーモデル
    
    Args:
        AbstractUser (object): AbstractUserを継承
    """
    first_name_kana = models.CharField(_('first name kana'), max_length=30, blank=True)
    last_name_kana = models.CharField(_('last name kana'), max_length=150, blank=True)
    phone_number = models.CharField(_('phone number'), max_length=16, blank=False)

    objects=CustomUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'first_name_kana',
        'last_name_kana',
        'email',
        'phone_number',
    ]

    def get_full_name(self):
        full_name = "%s %s".format(self.last_name, self.first_name)
        return full_name
    
    def get_full_name_kana(self):
        full_name_kana = "%s %s".format(self.last_name_kana, self.first_name_kana)
        return full_name_kana