from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import stripe
from .models import Meets, Spectators
from .serializers import HomeSerializer, SpectatorSerializer

class HomeViewSet(viewsets.ModelViewSet):
    queryset = Meets.objects.all()
    serializer_class = HomeSerializer

class CreateSpectatorView(APIView):
    def post(self, request):
        print("Received data:", request.data)  # Debugging log
        serializer = SpectatorSerializer(data=request.data)
        if serializer.is_valid():
            spectator = serializer.save()

            # Email portion of the view
            spectator_email = serializer.validated_data['spectator_email']
            meet = spectator.meets  # Correctly get the related meet object
            ticket_cost = meet.ticket_cost
            # create email message
            message = Mail(
                from_email='eventticketingapprzm@gmail.com',
                to_emails=spectator_email,
                subject='Form Submission Confirmation',
                html_content=f'<p>Thank you for submitting the form!</p><br /><p>Ticket cost: ${ticket_cost}</p>')

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
        else:
            print("Validation errors:", serializer.errors)  # Debugging log
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def create_payment_intent(request):
    stripe.api_key = "sk_test_51MvjSdLxodRxB3c1zq9m4ffnJUuRD9MJzTdYkMwgFXOZxikY8Za1ZV7MZkVxNDdNYqqGkhPyEh8b2STWwAa4FRAQ00w3w1E765"
    amount = 6000
    currency = 'usd'
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method_types=['card'],
        )
        return JsonResponse({'clientSecret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error': str(e)})

class SubmitMeetForm(APIView):
    def post(self, request):
        serializer = HomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SpectatorsByMeetView(APIView):
    def get(self, request, meet_id):
        spectators = Spectators.objects.filter(meets__id=meet_id)
        serializer = SpectatorSerializer(spectators, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllSpectators(APIView):
    def get(self, request):
        queryset = Spectators.objects.all()
        serializer = SpectatorSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
