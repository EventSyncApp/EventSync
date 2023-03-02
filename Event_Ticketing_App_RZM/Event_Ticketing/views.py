from django.shortcuts import render
# imports for REST API views
from rest_framework import viewsets
from .models import Meets
from .serializers import HomeSerializer

# Create your views here.

# REST API class for handling http requests
class HomeViewSet(viewsets.ModelViewSet):
    queryset = Meets.objects.all()
    serializer_class = HomeSerializer