from blog.models import Post, Comment
from rest_framework import serializers, validators
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = '__all__'
       
class RegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username','email', 'password','password_confirmation')
        extra_kwargs = {
            'password':{'write_only':True},
            'email' : { 
                'required': True, 
                'allow_blank': False, 
                'validators': [
                    validators.UniqueValidator(
                         User.objects.all(), 
                         message='Email Already Exists'
                    )
                ]
            }
        }
    def validate(self, data):
        if data.get('password') != data.get('password_confirmation'):
            raise serializers.ValidationError('Password do not match.')
        return data
    
    def create(self,validated_data):
        user = User.objects.create_user(
            username = validated_data.get('username'),
            email = validated_data.get('email'),
            password = validated_data.get('password')

        )
        return user

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Comment
        fields = '__all__'