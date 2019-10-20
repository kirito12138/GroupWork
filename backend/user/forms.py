from django import forms


class LoginForm(forms.Form):
    account = forms.CharField(label="账户", max_length=40, widget=forms.TextInput(attrs={'class': 'form-control'}))
    password = forms.CharField(label="密码", max_length=64, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
