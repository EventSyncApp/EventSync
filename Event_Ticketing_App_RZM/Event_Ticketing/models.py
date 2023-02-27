from django.db import models

# Create your models here.
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
    purchase_time = models.DateTimeField(auto_now_add=True)
    ticket_cost = models.DecimalField(max_digits=10, decimal_places=2)
    seat_num = models.CharField(max_length=10)
    # seatType look into how to set it up
    meet_id = models.ForeignKey(Meets, on_delete=models.PROTECT)

    def __str__(self):
        return self.spectator_fname + " " + self.spectator_lname