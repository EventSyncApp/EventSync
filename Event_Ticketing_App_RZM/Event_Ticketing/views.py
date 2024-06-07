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
# import for stripe
import stripe

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

# Stripe payment intent view
@csrf_exempt
def create_payment_intent(request):
    # This is your test secret API key.
    stripe.api_key = "sk_test_51MvjSdLxodRxB3c1zq9m4ffnJUuRD9MJzTdYkMwgFXOZxikY8Za1ZV7MZkVxNDdNYqqGkhPyEh8b2STWwAa4FRAQ00w3w1E765"
    amount = 6000
    currency = 'usd'

    # Check if there's a PaymentIntent associated with the user's session or client ID
    # client_secret = request.session.get('payment_intent_client_secret')

    # if client_secret:
        # If a PaymentIntent exists in the session, return it
        # return JsonResponse({'clientSecret': client_secret})

    # If no existing PaymentIntent in the session, create a new one
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method_types=['card'],
        )

        # Save the new PaymentIntent in the session
        # request.session['payment_intent_client_secret'] = intent.client_secret

        # Debug: Print the session data to the server logs
        # print(request.session.items())

        return JsonResponse({'clientSecret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error': str(e)})


class SpectatorsByMeetView(APIView):
    def get(self, request, meet_id):
        spectators = Spectators.objects.filter(meets_id=meet_id)  # Use meets_id for filtering
        serializer = SpectatorSerializer(spectators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllSpectators(APIView):
    def get(self, request):
        queryset = Spectators.objects.all()
        serializer = SpectatorSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubmitMeetForm(APIView):
    def post(self, request):
        serializer = HomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HomeViewSet(APIView):
    def get(self, request):
        queryset = Meets.objects.all()
        serializer = HomeSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateSpectatorView(APIView):
    def post(self, request):
        serializer = SpectatorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # Email portion of the view
            spectator_email = serializer.validated_data['spectator_email']
            ticket_cost = serializer.validated_data['meets.ticket_cost']
            # create email message
            message = Mail(
                from_email='eventticketingapprzm@gmail.com',
                to_emails=spectator_email,
                subject='Form Submission Confirmation',
                html_content=f'<p>Thank you for submitting the form!</p><br /><p>ticket cost: ${ticket_cost}</p>')

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

