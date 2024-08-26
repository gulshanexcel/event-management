from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ('user',)  # Ensure 'user' is read-only