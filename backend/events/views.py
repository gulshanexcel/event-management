from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions,generics
from .models import Event
from django.contrib.auth.models import User
from .serializers import EventSerializer
from .serializers import UserSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
        
    def perform_create(self, serializer):
        event = serializer.save(user=self.request.user)
        event.send_invitations()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer