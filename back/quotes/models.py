from django.db import models

from django.db import models
from django.contrib.auth.models import User

class Quote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    author = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)