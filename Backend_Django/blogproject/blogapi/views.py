from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.status import ( HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_204_NO_CONTENT )
from rest_framework.response import Response
from .serializers import PostSerializer, RegisterSerializer, CommentSerializer
from blog.models import Post, Comment


#  http://127.0.0.1:8000/blogapi/register
@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def Register(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid()
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'user_info':{
                'id': user.id, 
                'username' : user.username,
                'email' : user.email
            },'token':token.key}, status=HTTP_201_CREATED)
    return Response('Unsuccessful registration. Invalid information."',status=HTTP_400_BAD_REQUEST)


#  http://127.0.0.1:8000/blogapi/login
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def Login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},status=HTTP_400_BAD_REQUEST)
   
    user = authenticate (username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},status=HTTP_404_NOT_FOUND)
    
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token':token.key},status=HTTP_200_OK)


#  http://127.0.0.1:8000/blogapi/logout
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def Logout(request):
    if request.user.is_authenticated:
        Token.objects.filter(user=request.user).delete()
    return Response('You have successfully logged out.',status=HTTP_200_OK)


#  http://127.0.0.1:8000/blogapi/posts
@csrf_exempt
@api_view(['GET', 'POST'])
def Post_List(request):
    if request.method == "GET":
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data,status=HTTP_200_OK)
    
    elif request.method == "POST":
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)


#  http://127.0.0.1:8000/blogapi/posts/1
@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def Post_Detail(request,id):
    try:
        post = Post.objects.get(id=id)

    except Post.DoesNotExist:
        return Response({'error': 'Post not found'},status=HTTP_404_NOT_FOUND)


    if request.method == "GET":
        serializer = PostSerializer(post)
        return Response(serializer.data,status=HTTP_200_OK)
    
    elif request.method == "PUT":
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=HTTP_200_OK)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        post.delete()
        return Response('Deleted Successfully',status=HTTP_204_NO_CONTENT)


#  http://127.0.0.1:8000/blogapi/comment/1
@csrf_exempt
@api_view(['POST'])
def Add_Comment(request, post_id):
   if request.method == "POST":
        
        try:
            post = Post.objects.get(id=post_id)

        except Post.DoesNotExist:
            return Response({'error': 'Post not found'},status=HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(post=post)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors,status=HTTP_400_BAD_REQUEST)
