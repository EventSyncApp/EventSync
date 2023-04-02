# start of how data should be serialized into json format
from rest_framework import serializers
from .models import Meets
from .models import Spectators

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meets
        fields = '__all__'

class SpectatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spectators
        fields = ('spectator_fname', 'spectator_lname', 'spectator_email', 'spectator_country', 'spectator_state')