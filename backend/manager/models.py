from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Transaction(models.Model):
     
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=100, blank=True, null=True)