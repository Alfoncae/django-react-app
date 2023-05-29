
# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import Transaction
 
# create a serializer class
class TransactionSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Transaction
        fields = ('created', 'user', 'amount', 'note')