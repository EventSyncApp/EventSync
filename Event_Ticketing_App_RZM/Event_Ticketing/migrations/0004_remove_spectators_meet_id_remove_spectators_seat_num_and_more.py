# Generated by Django 4.1.7 on 2023-03-16 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Event_Ticketing', '0003_spectators_spectator_country_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='spectators',
            name='meet_id',
        ),
        migrations.RemoveField(
            model_name='spectators',
            name='seat_num',
        ),
        migrations.RemoveField(
            model_name='spectators',
            name='ticket_cost',
        ),
    ]
