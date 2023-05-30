from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TransactionSerializer, UserSerializer

from .models import Transaction, User

# Create your views here.
class TransactionView(viewsets.ModelViewSet):

    serializer_class = TransactionSerializer

    queryset = Transaction.objects.all()

class UserView(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    queryset = User.objects.all()