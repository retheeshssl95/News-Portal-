from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.Index, name='index'),
    path('login', views.Login, name='login'),
    path('register', views.Register, name='register'),
    path('logout', views.Logout, name='logout'), 
    path('post/', views.Post_List_View, name='list'),
    path('post/create', views.Create_Post, name='create'),
    path('post/update/<int:id>', views.Update_Post, name='update'),
    path('post/delete/<int:id>', views.Delete_Post, name='delete'),
    path('post/detail/<int:id>', views.Post_Detail_View, name='detail'), 
    path('post/search', views.Search, name='search'),
    path('dashboard', views.Dashboard, name='dashboard'),
    path('dashboard/filter', views.Filter, name='filter'), 

    
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
