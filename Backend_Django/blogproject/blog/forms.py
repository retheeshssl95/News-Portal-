from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('title','author','content', 'image')

class RegisterForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('username','email', 'password1', 'password2' )

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('name','comment','email')