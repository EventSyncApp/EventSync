# Generated by Django 4.1.7 on 2023-08-03 00:13

import Event_Ticketing.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Event_Ticketing', '0008_spectators_purchase_time_spectators_ticket_cost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spectators',
            name='purchase_time',
            field=models.DateTimeField(default=Event_Ticketing.models.get_current_time),
        ),
    ]
