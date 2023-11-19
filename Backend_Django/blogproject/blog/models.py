from django.db import models
from django.contrib.auth.models import User
# from ckeditor.fields import RichTextField

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField(null=True)
    author = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='uploads', null=True)
          
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-created_on']
    

class Comment(models.Model):
    name = models.CharField(max_length=100, null=True)
    post = models.ForeignKey(Post, related_name="comments",on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    comment = models.TextField(null=True)
    email = models.EmailField(null=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return '%s - %s' % (self.post.title, self.name)

    class Meta:
        ordering = ['-created']