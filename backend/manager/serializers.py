
# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import Transaction, User
 
# create a serializer class
class TransactionSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Transaction
        fields = ('id', 'created', 'user', 'amount', 'note')


class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'savings', 'expenses')