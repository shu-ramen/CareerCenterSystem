from django.shortcuts import render
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView
from django.contrib.auth.mixins import LoginRequiredMixin
from .admin import CustomUserCreationForm
from django.urls import reverse_lazy
from django.views import generic

# Create your views here.
class SignUpView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'

class PasswordChange(LoginRequiredMixin, PasswordChangeView):
    success_url =  '/accounts/password/change/done/'
    template_name = 'accounts/password_change.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs) # 継承元のメソッドCALL
        context["form_name"] = "password_change"
        return context

class PasswordChangeDone(LoginRequiredMixin, PasswordChangeDoneView):
    """パスワード変更完了"""
    template_name = 'accounts/password_change_done.html'