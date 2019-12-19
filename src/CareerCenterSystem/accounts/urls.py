from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('password/change/', views.PasswordChange.as_view(), name='password_change'),
    path('password/change/done/', views.PasswordChangeDone.as_view(), name='password_change'),
]
