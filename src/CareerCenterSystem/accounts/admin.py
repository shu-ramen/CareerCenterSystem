from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import ugettext_lazy as _
from .models import CustomUser

# Register your models here.
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = get_user_model()
        fields = "__all__"

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = get_user_model()
        fields = ("username",
                  "first_name",
                  "last_name",
                  "first_name_kana",
                  "last_name_kana",
                  "email",
                  "phone_number",)
    
    def clean_username(self):
        username = self.cleaned_data["username"]
        try:
            get_user_model().objects.get(username=username)
        except get_user_model().DoesNotExist:
            return username
        raise forms.ValidationError(self.error_messages['duplicate_username'])

class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    fieldsets = (
        (None, {"fields": [("username", "password")]}),
        (_("Personal info"), {"fields": ("first_name", "last_name", "first_name_kana", "last_name_kana", "email", "phone_number")}),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ("username", "email", "phone_number", "is_staff")
    search_fields = ("username", "email")
    filter_horizontal = ("groups", "user_permissions")

admin.site.register(CustomUser, CustomUserAdmin)