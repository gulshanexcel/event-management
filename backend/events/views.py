from rest_framework import viewsets, permissions, filters
from .models import Event
from .serializers import EventSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticated
from django.core.mail import send_mail
from rest_framework import generics
from django.shortcuts import get_object_or_404, redirect


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['location', 'title']
    ordering_fields = ['date', 'location']

    def get_queryset(self):
        # Filter events based on the currently logged-in user
        queryset = self.queryset.filter(user=self.request.user)
        date = self.request.query_params.get('date', None)
        location = self.request.query_params.get('location', None)
        if date:
            queryset = queryset.filter(date__date=date)
        if location:
            queryset = queryset.filter(location__icontains=location)
        return queryset
        
    def perform_create(self, serializer):
        event = serializer.save(user=self.request.user)
        event.send_invitations()
    
    def perform_update(self, serializer):
        event = serializer.save()
        # Re-send invitations if invitees are updated
        if 'invitees' in serializer.validated_data:
            event.send_invitations()

    def perform_destroy(self, instance):
        instance.delete()


User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class SignInView(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({
                'detail': 'Email and password are required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'detail': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

class InvitationResponseView(generics.GenericAPIView):
    def post(self, request, event_id):
        email = request.data.get('email')
        response = request.data.get('response')  # Expected values: 'accepted' or 'declined'

        event = get_object_or_404(Event, id=event_id)

        if email not in event.invitation_status:
            return Response({"detail": "Invitation not found for this email."}, status=status.HTTP_404_NOT_FOUND)

        if response == 'accepted':
            event.invitation_status[email] = 'Accepted'
        elif response == 'declined':
            event.invitation_status[email] = 'Declined'
        else:
            return Response({"detail": "Invalid response."}, status=status.HTTP_400_BAD_REQUEST)

        event.save()

        # Notify the event creator
        self.notify_creator(event, email, response)

        return Response({"detail": "Invitation status updated."}, status=status.HTTP_200_OK)

    def notify_creator(self, event, email, response):
        user_email = event.user.email
        send_mail(
            f'Invitation Response for {event.title}',
            f'{email} has {response} your invitation for the event "{event.title}".',
            'from@example.com',
            [user_email],
            fail_silently=False,
        )

class InvitationRedirectView(generics.GenericAPIView):
    def get(self, request):
        user_id = request.query_params.get('userid')
        event_id = request.query_params.get('eventid')
        response_status = request.query_params.get('status')
        
        if not all([user_id, event_id, response_status]):
            return Response({"detail": "Missing parameters."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the event and user
        event = get_object_or_404(Event, id=event_id)
        user = get_object_or_404(User, id=user_id)
        
        # Update the invitation status
        if response_status == 'accepted':
            event.invitation_status[user.email] = 'Accepted'
        elif response_status == 'declined':
            event.invitation_status[user.email] = 'Declined'
        else:
            return Response({"detail": "Invalid status."}, status=status.HTTP_400_BAD_REQUEST)
        
        event.save()

        # Redirect to the frontend URL
        frontend_url = (
            f'http://localhost:3000/invitations?status={response_status}'
            f'&event-title={event.title}'
            f'&sender-username={event.user.username}'
            f'&description={event.description}'
        )
        return redirect(frontend_url)