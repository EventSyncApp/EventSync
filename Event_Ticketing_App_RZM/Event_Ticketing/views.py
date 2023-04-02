from django.shortcuts import render
# imports for REST API views
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Meets
from .models import Spectators
from .serializers import HomeSerializer
from .serializers import SpectatorSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Create your views here.

# REST API class for handling http requests
class HomeViewSet(viewsets.ModelViewSet):
    queryset = Meets.objects.all()
    serializer_class = HomeSerializer

class CreateSpectatorView(APIView):
    def post(self, request):
        serializer = SpectatorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

