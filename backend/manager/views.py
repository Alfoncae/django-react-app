from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TransactionSerializer

from .models import Transaction

# Create your views here.
class TransactionView(viewsets.ModelViewSet):
    pass