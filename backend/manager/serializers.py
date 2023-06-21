
# import serializers from the REST framework
from rest_framework import serializers
 
# import the todo data model
from .models import Transaction, User
 
# create a serializer class
class TransactionSerializer(serializers.ModelSerializer):
 
    # create a meta class
    class Meta:
        model = Transaction
        fields = '__all__'
        ordering = ['created']


class UserSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )

        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserDetailSerializer(serializers.ModelSerializer):
    income = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    expenses = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    savings = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    balance = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = User
        exclude = ('password','username')
