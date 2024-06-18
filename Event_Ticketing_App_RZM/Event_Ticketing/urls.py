from django.urls import path, include
from rest_framework import routers
from .views import HomeViewSet, CreateSpectatorView, create_payment_intent, SubmitMeetForm, SpectatorsByMeetView, AllSpectators

router = routers.DefaultRouter()
router.register(r'home_page', HomeViewSet, basename='home_page')

app_name = 'events'

urlpatterns = [
    path('home_page/', HomeViewSet.as_view({'get': 'list'}), name='home_page'),
    path('add_spectator/', CreateSpectatorView.as_view(), name='add_spectator'),
    path('create-payment-intent/', create_payment_intent, name='create_payment_intent'),
    path('add_meet/', SubmitMeetForm.as_view(), name='add_meet'),
    path('spectators_by_meet/<int:meet_id>/', SpectatorsByMeetView.as_view(), name='spectators_by_meet'),
    path('all_spectators/', AllSpectators.as_view(), name='all_spectators'),
]

urlpatterns += router.urls
