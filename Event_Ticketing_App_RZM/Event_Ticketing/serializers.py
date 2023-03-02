# start of how data should be serialized into json format
from rest_framework import serializers
from .models import Meets
from .models import Spectators

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meets
        fields = '__all__'