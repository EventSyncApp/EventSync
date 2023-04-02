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



import mysql.connector

def send_email(request, id):
    # Connect to the MySQL database
    mydb = mysql.connector.connect(
        host="localhost",
        user='root',
        password='rzmApplications124',
        database='ticketingdb'
    )

    mycursor = mydb.cursor()

    # Retrieve the email address from the database using the given id
    mycursor.execute("SELECT email FROM customers WHERE id = %s", (id,))
    result = mycursor.fetchone()
    email = result[0]
    mydb.close()
    
    # Call the send_mail function with the retrieved email address
    send_mail(email)



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

