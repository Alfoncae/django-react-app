from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TransactionSerializer, UserSerializer

from .models import Transaction, User

# Create your views here.
class TransactionView(viewsets.ModelViewSet):

    serializer_class = TransactionSerializer

    queryset = Transaction.objects.all()

class UserView(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    queryset = User.objects.all()


@api_view(['POST'])
def register(request):
    data = request.data

    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=data['username'], password=data['password'], email=data['email'])
    login(request, user)
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def login_view(request):

    data = request.data

    # Attempt to sign user in
    username = data['username']
    password = data['password']
    user = authenticate(request, username=username, password=password)
    currentUser = request.user
    if user is not None:
        login(request, user)
        return Response({'message': 'User logged In successfully'}, status=status.HTTP_202_ACCEPTED)
    
    return Response({'error': 'No'}, status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'User logged out successfully'}, status=status.HTTP_202_ACCEPTED)