from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path('signup/', views.SignUpView.as_view(), name='signup'),
    path('password/change/', views.PasswordChange.as_view(), name='password_change'),
    path('password/change/done/', views.PasswordChangeDone.as_view(), name='password_change_done'),
    path('password/reset/', views.PasswordReset.as_view(), name='password_reset'),
    path('password/reset/done/', views.PasswordResetDone.as_view(), name='password_reset_done'),
    path('password/reset/confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name='password_reset_confirm'),
    path('password/reset/confirm/done/', views.PasswordResetConfirmDone.as_view(), name='password_reset_confirm_done'),
    path('user/detail/', views.UserDetailView.as_view(), name='user_detail'),
    path('user/update/', views.UserUpdateView.as_view(), name='user_update'),
]
