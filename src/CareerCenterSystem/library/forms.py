from django import forms
from . import models

class CategoryForm(forms.ModelForm):
    class Meta:
        model = models.Category
        fields = ['name']

class BookForm(forms.ModelForm):
    class Meta:
        model = models.Book
        fields = ['control_number', 'title', 'category', 'publisher']