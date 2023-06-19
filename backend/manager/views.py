from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import TransactionSerializer, UserSerializer, UserDetailSerializer

from .models import Transaction, User

# Create your views here.

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def Transactions(request):

    if request.method == 'GET':
        data = Transaction.objects.all()
        serializer = TransactionSerializer(data, many=True)
        return Response({'transactions': serializer.data})
    elif request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['PUT', 'GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def TransactionDetails(request, id):

    data = get_object_or_404(Transaction, id=id)

    if request.method == 'GET':
        serializer = TransactionSerializer(data)
        return Response({'transaction': serializer.data})

    # UPDATES THE OLD DATA WITH THE NEW SUBMITTED ONE
    elif request.method == 'PUT':
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


@api_view(['POST'])
def Register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        tokens = {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
        return Response(tokens, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def UserDetails(request, user):

    data = get_object_or_404(User, username=user)

    if request.method == 'GET':
        serializer = UserDetailSerializer(data)
        return Response({'user': serializer.data})
    elif request.method == 'PUT':
        serializer = UserDetailSerializer(data, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)