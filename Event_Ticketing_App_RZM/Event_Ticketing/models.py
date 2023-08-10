from django.db import models
from datetime import datetime
from django.utils import timezone
from django.core.exceptions import ValidationError

#function for getting purchase time
def get_current_time():
    return timezone.now()

#function for converting meet time
def validate_time_format(value):
    try:
        # Attempt to parse the input value as time with format "HH:MM"
        hour, minute = value.split(":")
        hour, minute = int(hour), int(minute)
        if not (0 <= hour <= 23) or not (0 <= minute <= 59):
            raise ValueError
    except ValueError:
        raise ValidationError('Invalid time format. Time should be in "HH:MM" format.')

# Create your models here.
class Meets(models.Model):
    # Meet ID is generated automatically
    meet_name = models.CharField(max_length=75, unique=True)
    meet_date = models.DateField()
    meet_time_start = models.CharField(max_length=5, validators=[validate_time_format], default='00:00')
    meet_location_venue = models.CharField(max_length=75, unique=False, default='Chiseled Life')
    meet_location_address = models.CharField(max_length=75, unique=False, default='123 Broderick Ln')
    meet_location_city = models.CharField(max_length=75, unique=False, default='Columbia')
    meet_location_state = models.CharField(max_length=2, default="MD")
    meet_location_zipcode = models.CharField(max_length=5, unique=False, default='00000')
    meet_about_text = models.TextField(max_length=1200, default='Please add a paragraph about the meet.')
    max_capacity = models.IntegerField()
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.meet_name

class Spectators(models.Model):
    # Spectator ID is generated automatically
    spectator_fname = models.CharField(max_length=75)
    spectator_lname = models.CharField(max_length=75)
    spectator_email = models.EmailField(max_length=100, default='example@example.com')
    spectator_state = models.CharField(max_length=2, default="MD")
    purchase_time = models.DateTimeField(auto_now_add=True)
    ticket_cost = models.DecimalField(max_digits=10, decimal_places=2, default=30.00)
    meets = models.ForeignKey(Meets, on_delete=models.PROTECT)
    # seat_num = models.CharField(max_length=10)
    # seatType look into how to set it up

    def __str__(self):
        return self.spectator_fname + " " + self.spectator_lname
    
