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
    category = models.ForeignKey("Category", related_name="book_category", on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=256)
    publisher = models.CharField(max_length=256)

class History(models.Model):
    book = models.ForeignKey("Book", related_name="history_book", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(CustomUser, related_name="history_user", on_delete=models.SET_NULL, null=True)
    ACTION_CHOICE = (
        ("0", "貸出"),
        ("1", "返却"),
    )
    action = models.CharField(max_length=1, choices=ACTION_CHOICE)
    timestamp = models.DateTimeField(auto_now=True)