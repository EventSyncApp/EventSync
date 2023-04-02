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
# import for sendgrid
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


import mysql.connector

#def send_email(request, id):
#    # Connect to the MySQL database
#    mydb = mysql.connector.connect(
#        host="localhost",
#        user='root',
#        password='rzmApplications124',
#        database='ticketingdb'
#    )
#
#    mycursor = mydb.cursor()
#
#    # Retrieve the email address from the database using the given id
#    mycursor.execute("SELECT email FROM customers WHERE id = %s", (id,))
#    result = mycursor.fetchone()
#    email = result[0]
#    mydb.close()
#    
#    # Call the send_mail function with the retrieved email address
#    send_mail(email)



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

            # Email portion of the view
            spectator_email = serializer.validated_data['spectator_email']
            spectator_fname = serializer.validated_data['spectator_fname']
            # create email message
            message = Mail(
                from_email='eventticketingapprzm@gmail.com',
                to_emails=spectator_email,
                subject='Form Submission Confirmation',
                html_content='<p>Thank you for submitting the form!</p>')

            # send email using SendGrid API
            try:
                sg = SendGridAPIClient(api_key='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')
                response = sg.send(message)
                print(response.status_code)
                print(response.body)
                print(response.headers)
            except Exception as e:
                print(e)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
