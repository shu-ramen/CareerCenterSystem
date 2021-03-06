from django.db import models
from django.utils.translation import ugettext_lazy as _
from accounts.models import CustomUser

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=64, unique=True, null=False,
        error_messages={
            'unique': _("This category name already exists."),
        },
    )

class Book(models.Model):
    control_number = models.CharField(max_length=16, unique=True, null=False,
        error_messages={
            'unique': _("This control number already exists."),
        },
    )
    title = models.CharField(max_length=256)
    category = models.ForeignKey("Category", related_name="book_category", on_delete=models.SET_NULL, null=True)
    publisher = models.CharField(max_length=256)
    is_active = models.BooleanField(default=True)

class History(models.Model):
    book = models.ForeignKey("Book", related_name="history_book", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(CustomUser, related_name="history_user", on_delete=models.SET_NULL, null=True)
    ACTION_CHOICE = (
        ("0", "貸出"),
        ("1", "返却"),
    )
    action = models.CharField(max_length=1, choices=ACTION_CHOICE)
    timestamp = models.DateTimeField(auto_now=True)

class ReminderHistory(models.Model):
    timestamp = models.DateTimeField(auto_now=True)

class Notice(models.Model):
    content = models.CharField(max_length=1024)
    is_important = models.BooleanField(default=False)