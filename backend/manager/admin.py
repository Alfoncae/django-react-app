from django.contrib import admin
from .models import Transaction, User
# Register your models here.

admin.site.register(Transaction)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'income', 'expenses', 'savings', 'balance')
