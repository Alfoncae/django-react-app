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
@permission_classes({IsAuthenticated})
def Transactions(request):

    if request.method == 'GET':
        data = Transaction.objects.all()
        serializer = TransactionSerializer(data, many=True)
        return Response({'transactions': serializer.data})
    return Response(status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST', 'GET', 'DELETE'])
@permission_classes({IsAuthenticated})
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
