from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event
from django.contrib.auth.hashers import make_password   

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ('user', 'invitation_status')  # Ensure 'user' and 'invitation_status' are read-only
