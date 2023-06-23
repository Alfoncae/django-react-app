from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import Sum


class User(AbstractUser):
    monthly_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    @property
    def savings(self):                                                          # returns sum by the name then function used or 0 if 0
        return self.user_transactions.filter(transaction_type=Transaction.SAVING).aggregate(Sum('amount'))['amount__sum'] or 0

    @property
    def expenses(self):                                                         # returns sum by the name then function used or 0 if 0
        return self.user_transactions.filter(transaction_type=Transaction.EXPENSE).aggregate(Sum('amount'))['amount__sum'] or 0

    @property
    def income(self):                                                           # returns sum by the name then function used or 0 if 0
        return self.user_transactions.filter(transaction_type=Transaction.INCOME).aggregate(Sum('amount'))['amount__sum'] or 0
        

    @property
    def balance(self):
        income = self.income
        expenses = self.expenses
        return income - expenses


class Transaction(models.Model):
    INCOME = 'IN'
    EXPENSE = 'EX'
    SAVING = 'SA'

    TRANSACTION_TYPES = [
        (INCOME, 'Income'),
        (EXPENSE, 'Expense'),
        (SAVING, 'Saving'),
    ]

    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    note = models.CharField(max_length=100, blank=True, null=True, )
    transaction_type = models.CharField(max_length=2, choices=TRANSACTION_TYPES, default=INCOME)
    category = models.CharField(max_length=100, blank=True, null=True)
