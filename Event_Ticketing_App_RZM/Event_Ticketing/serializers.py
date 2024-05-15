# start of how data should be serialized into json format
from rest_framework import serializers
from .models import Meets
from .models import Spectators

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meets
        fields = ('meet_name', 'meet_date', 'meet_time_start', 'meet_location_venue', 'meet_location_address', 'meet_location_city', 'meet_location_state', 'meet_location_zipcode', 'meet_about_text', 'ticket_cost', 'max_capacity')

class SpectatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spectators
        fields = ('spectator_fname', 'spectator_lname', 'spectator_email', 'spectator_state', 'meets.ticket_cost')