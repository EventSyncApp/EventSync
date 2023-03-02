from django.db import models
from django_countries.fields import CountryField

# Create your models here.

# Create state choices
STATE_CHOICES = [
    ('AL', 'Alabama'),
    ('AK', 'Alaska'),
    ('AZ', 'Arizona'),
    ('AR', 'Arkansas'),
    ('CA', 'California'),
    ('CO', 'Colorado'),
    ('CT', 'Connecticut'),
    ('DE', 'Delaware'),
    ('FL', 'Florida'),
    ('GA', 'Georgia'),
    ('HI', 'Hawaii'),
    ('ID', 'Idaho'),
    ('IL', 'Illinois'),
    ('IN', 'Indiana'),
    ('IA', 'Iowa'),
    ('KS', 'Kansas'),
    ('KY', 'Kentucky'),
    ('LA', 'Louisiana'),
    ('ME', 'Maine'),
    ('MD', 'Maryland'),
    ('MA', 'Massachusetts'),
    ('MI', 'Michigan'),
    ('MN', 'Minnesota'),
    ('MS', 'Mississippi'),
    ('MO', 'Missouri'),
    ('MT', 'Montana'),
    ('NE', 'Nebraska'),
    ('NV', 'Nevada'),
    ('NH', 'New Hampshire'),
    ('NJ', 'New Jersey'),
    ('NM', 'New Mexico'),
    ('NY', 'New York'),
    ('NC', 'North Carolina'),
    ('ND', 'North Dakota'),
    ('OH', 'Ohio'),
    ('OK', 'Oklahoma'),
    ('OR', 'Oregon'),
    ('PA', 'Pennsylvania'),
    ('RI', 'Rhode Island'),
    ('SC', 'South Carolina'),
    ('SD', 'South Dakota'),
    ('TN', 'Tennessee'),
    ('TX', 'Texas'),
    ('UT', 'Utah'),
    ('VT', 'Vermont'),
    ('VA', 'Virginia'),
    ('WA', 'Washington'),
    ('WV', 'West Virginia'),
    ('WI', 'Wisconsin'),
    ('WY', 'Wyoming'),
]

class Meets(models.Model):
    # Meet ID is generated automatically
    meet_name = models.CharField(max_length=75, unique=True)
    meet_date = models.DateField()
    max_capacity = models.IntegerField()
    creation_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.meet_name

class Spectators(models.Model):
    # Spectator ID is generated automatically
    spectator_fname = models.CharField(max_length=75)
    spectator_lname = models.CharField(max_length=75)
    spectator_email = models.EmailField(max_length=100, default='example@example.com')
    spectator_country = CountryField(default="US")
    spectator_state = models.CharField(max_length=2, choices=STATE_CHOICES, default="MD")
    purchase_time = models.DateTimeField(auto_now_add=True)
    ticket_cost = models.DecimalField(max_digits=10, decimal_places=2)
    seat_num = models.CharField(max_length=10)
    # seatType look into how to set it up
    meet_id = models.ForeignKey(Meets, on_delete=models.PROTECT)

    def __str__(self):
        return self.spectator_fname + " " + self.spectator_lname
    
#zach comment test