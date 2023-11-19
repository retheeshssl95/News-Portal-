from django.urls import path
from . import views

urlpatterns = [
  path('register',views.Register, name='register-api'),
  path('login', views.Login, name='login-api'),
  path('logout', views.Logout, name='logout-api'),
  path('posts', views.Post_List, name="list-api"),
  path('posts/<int:id>', views.Post_Detail, name='detail-api'),
  path('comment/<int:post_id>', views.Add_Comment, name='comment-api'),

]
