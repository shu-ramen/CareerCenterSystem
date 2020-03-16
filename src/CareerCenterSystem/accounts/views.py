from django.shortcuts import render
from django.views.generic import FormView, TemplateView
from django.contrib.auth.views import PasswordChangeView, PasswordChangeDoneView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from .admin import CustomUserCreationForm
from .forms import UserUpdateForm
from .models import CustomUser
from django.urls import reverse_lazy
from django.views import generic

# Create your views here.
class SignUpView(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'accounts/signup.html'

class PasswordChange(LoginRequiredMixin, PasswordChangeView):
    success_url =  reverse_lazy('accounts:password_change_done')
    template_name = 'accounts/password_change.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs) # 継承元のメソッドCALL
        context["form_name"] = "password_change"
        return context

class PasswordChangeDone(LoginRequiredMixin, PasswordChangeDoneView):
    """パスワード変更完了"""
    template_name = 'accounts/password_change_done.html'

class PasswordReset(PasswordResetView):
    """パスワード変更用URLの送付ページ"""
    subject_template_name = 'accounts/reset/subject.txt'
    email_template_name = 'accounts/reset/message.html'
    template_name = 'accounts/password_reset_form.html'
    success_url = reverse_lazy('accounts:password_reset_done')

class PasswordResetDone(PasswordResetDoneView):
    """パスワード変更用URLを送りましたページ"""
    template_name = 'accounts/password_reset_done.html'

class PasswordResetConfirm(PasswordResetConfirmView):
    """新パスワード入力ページ"""
    success_url = reverse_lazy('accounts:password_reset_confirm_done')
    template_name = 'accounts/password_reset_confirm.html'

class PasswordResetConfirmDone(PasswordResetCompleteView):
    """新パスワード設定しましたページ"""
    template_name = 'accounts/password_reset_complete.html'

class UserDetailView(LoginRequiredMixin, TemplateView):
    template_name = 'accounts/user_detail.html'
    
    def get_queryset(self):
        return CustomUser.objects.get(username=self.request.user.username)

class UserUpdateView(LoginRequiredMixin, FormView):
    template_name = 'accounts/user_update.html'
    form_class = UserUpdateForm
    success_url = reverse_lazy('accounts:user_detail')

    def form_valid(self, form):
        form.update(user=self.request.user)
        return super().form_valid(form)

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs.update({
            'last_name': self.request.user.last_name,
            'first_name': self.request.user.first_name,
            'last_name_kana': self.request.user.last_name_kana,
            'first_name_kana': self.request.user.first_name_kana,
            'email': self.request.user.email,
            'phone_number': self.request.user.phone_number
        })
        return kwargs