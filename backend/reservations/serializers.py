from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    voiture_nom = serializers.CharField(
        source='voiture.__str__', read_only=True
    )

    class Meta:
        model = Reservation
        fields = '__all__'
