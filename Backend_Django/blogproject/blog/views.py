from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Post, Comment
from .forms import PostForm, RegisterForm, CommentForm
from django.contrib import messages
from django.core.paginator import Paginator

# <<========== Home Page ========== >>
def Index(request):
    pass
    return render(request, 'index.html')



# <<========== Registration Form ========== >>
def Register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request,"Registration successful.")
            return redirect ('/blog/login')
        else:
            messages.error(request, "Unsuccessful registration. Invalid information.")
        
    else:
        form = RegisterForm()

    context = {
        'form' : form
        }
    return render(request,'user_register.html',context)


# <<==========Login Form ========== >>
def Login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request,"Login successful.")
            return redirect('/blog/dashboard')
        else:
            messages.error(request,"Invalid username or password.")
            return redirect ('/blog/login')
    else:
        return render(request,'user_login.html')


# <<========== Logout ========== >>
def Logout(request):
    logout(request)
    messages.info(request, "You have successfully logged out.") 
    return redirect('/blog/login')


# <<========== Post List View ========== >>
def Post_List_View(request):
    post_list = Post.objects.all()
    paginator = Paginator(post_list, 6)

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)
       
    context = {
        'page_obj': page_obj
    }
    return render(request, 'post_list_view.html', context)


# <<========== Post Detail View ========== >>
def Post_Detail_View(request,id):
    post = Post.objects.get(id=id)
    if request.method == 'POST':
        form = CommentForm(request.POST, instance=post)
        if form.is_valid():
            name = form.cleaned_data['name']
            comment = form.cleaned_data['comment']
            form = Comment(post=post,name=name,comment=comment)
            form.save()
            return redirect(f'/blog/post/detail/{post.id}')
    else:
        form = CommentForm()

    context = {
        'post': post,
        'form': form,
        }
    return render(request, 'post_detail_view.html', context)


# <<========== Create Post ========== >>
@login_required(login_url='/blog/login')
def Create_Post(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            form.image = request.FILES['image']
            form.save()
            messages.success(request,"Your Post has been Created Successfully.")
            return redirect('/blog/dashboard')
    else:
        form = PostForm()

    context = {
        'form' : form
        }
    return render(request,'post_create.html', context)


# <<========== Update Post========== >>
@login_required(login_url='/blog/login')
def Update_Post(request,id):
    post = Post.objects.get(id=id)
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES, instance=post)
        if form.is_valid():
            form.image = request.FILES['image'] 
            form.save()
            messages.success(request,"Your Post has been Updated Successfully.")
            return redirect('/blog/dashboard')
    else:
        form = PostForm(instance=post)
    
    context = {
        'post': post,
        'form': form
    }
    return render(request,'post_update.html',context)


# <<========== Delete Post ========== >>
@login_required(login_url='/blog/login')
def Delete_Post(request,id):
    post = Post.objects.get(id=id)
    if request.method == 'POST':
        post.delete()
        messages.info(request,"Your Post has been Deleted Successfully.")
        return redirect ('/blog/dashboard')
    else:
        post = Post.objects.all()

    context = {
        'post': post
        }
    return render(request, 'post_delete.html', context)


# <<========== Serach ========== >>
def Search(request):
    searchbar = request.GET.get('searchbar')
    if request.method == 'GET':
        page_obj = Post.objects.filter(title__istartswith=searchbar)
    else:
        page_obj = Post.objects.all()

    context = {
        'searchbar' : searchbar,
        'page_obj' : page_obj
    }
    return render(request,'post_list_view.html',context)


# <<========== Dashboard ========== >>
@login_required(login_url='/blog/login')
def Dashboard(request):
    # Dashboard Post List View
    post_list = Post.objects.all()
    paginator = Paginator(post_list, 7)

    # Dashboard Pagination
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {
        'page_obj': page_obj,
        }
        
    return render(request,'dashboard.html',context)

# <<========== Dashboard filter========== >>
@login_required(login_url='/blog/login')
def Filter(request):
    searchbar = request.GET.get('searchbar')
    if request.method == 'GET':
        page_obj = Post.objects.filter(title__istartswith=searchbar)
    else:
        page_obj = Post.objects.all()

    context = {
        'searchbar' : searchbar,
        'page_obj' : page_obj
    }
    return render(request,'dashboard.html',context)