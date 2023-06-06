from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from django.http import JsonResponse, Http404
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TransactionSerializer, UserSerializer

from .models import Transaction, User

# Create your views here.

@api_view(['GET'])
def Transactions(request):

    if request.method == 'GET':
        data = Transaction.objects.all()
        serializer = TransactionSerializer(data, many=True)
        return Response({'transactions': serializer.data})
    return Response(status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST', 'GET', 'DELETE'])
def SingleTransaction(request, id):

    try:
        data = Transaction.objects.get(id=id)
    except Transaction.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TransactionSerializer(data)
        return Response({'transaction': serializer.data})

    # UPDATES THE OLD DATA WITH THE NEW SUBMITTED ONE
    elif request.method == 'POST':
        serializer = TransactionSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'Transaction': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # DELETES THE DATA WE ARE LOOKING AT
    elif request.method == 'DELETE':
        data.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def Users(request):

    if request.method == 'GET':
        data = User.objects.all()
        serializer = UserSerializer(data, many=True)
        return Response({'users': serializer.data})
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def SingleUser(request, id):

    try:
        data = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(data)
        return Response({'user': serializer.data})
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    data = request.data

    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=data['username'], password=data['password'], email=data['email'])
    login(request, user)
    return Response({'message': 'User created successfully '}, status=status.HTTP_201_CREATED)


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


@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'User logged out successfully'}, status=status.HTTP_202_ACCEPTED)