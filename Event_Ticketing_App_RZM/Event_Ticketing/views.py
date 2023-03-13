from django.shortcuts import render
# imports for REST API views
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Meets
from .models import Spectators
from .serializers import HomeSerializer

# Create your views here.

# REST API class for handling http requests
class HomeViewSet(viewsets.ModelViewSet):
    queryset = Meets.objects.all()
    serializer_class = HomeSerializer

@csrf_exempt
def add_spectator(request):
    if request.method == 'POST':
        spectator_fname = request.POST.get('spectator_fname')
        spectator_lname = request.POST.get('spectator_lname')
        spectator_email = request.POST.get('spectator_email')
        spectator_country = request.POST.get('spectator_country')
        spectator_state = request.POST.get('spectator_state')
        purchase_time = request.POST.get('purchase_time')
        ticket_cost = request.POST.get('ticket_cost')
        seat_num = request.POST.get('seat_num')
        spectator = Spectators(spectator_fname=spectator_fname, spectator_lname=spectator_lname, spectator_email=spectator_email, spectator_country=spectator_country, 
                               spectator_state=spectator_state, purchase_time=purchase_time, ticket_cost=ticket_cost, seat_num=seat_num)
        spectator.save()
        return JsonResponse({'status': 'ok'})
    else:
        return JsonResponse({'status': 'error'})