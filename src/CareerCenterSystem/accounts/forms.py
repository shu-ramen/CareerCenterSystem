from django.forms import ModelForm
from .models import CustomUser

class UserUpdateForm(ModelForm):
    class Meta:
        model = CustomUser
        fields = [
            'last_name',
            'first_name',
            'last_name_kana',
            'first_name_kana',
            'email',
            'phone_number',
        ]
    
    def __init__(self, first_name=None, last_name=None, first_name_kana=None, last_name_kana=None, email=None, phone_number=None, *args, **kwargs,):
        kwargs.setdefault('label_suffix', '')
        super().__init__(*args, **kwargs)
        if last_name:
            self.fields['last_name'].widget.attrs['value'] = last_name
        if first_name:
            self.fields['first_name'].widget.attrs['value'] = first_name
        if last_name_kana:
            self.fields['last_name_kana'].widget.attrs['value'] = last_name_kana
        if first_name_kana:
            self.fields['first_name_kana'].widget.attrs['value'] = first_name_kana
        if email:
            self.fields['email'].widget.attrs['value'] = email
        if phone_number:
            self.fields['phone_number'].widget.attrs['value'] = phone_number
    
    def update(self, user):
        user.last_name = self.cleaned_data['last_name']
        user.first_name = self.cleaned_data['first_name']
        user.last_name_kana = self.cleaned_data['last_name_kana']
        user.first_name_kana = self.cleaned_data['first_name_kana']
        user.email = self.cleaned_data['email']
        user.phone_number = self.cleaned_data['phone_number']
        user.save()