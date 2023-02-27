# Generated by Django 4.1.7 on 2023-02-27 00:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meets',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('meetName', models.CharField(max_length=75, unique=True)),
                ('meetDate', models.DateField()),
                ('maxCapacity', models.IntegerField()),
                ('creationTime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Spectators',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SpectatorFname', models.CharField(max_length=75)),
                ('SpectatorLname', models.CharField(max_length=75)),
                ('purchaseTime', models.DateTimeField(auto_now_add=True)),
                ('ticketCost', models.DecimalField(decimal_places=2, max_digits=10)),
                ('seatNum', models.CharField(max_length=10)),
                ('meetID', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='Event_Ticketing.meets')),
            ],
        ),
    ]
