from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, RegisterView,SignInView,ProfileView,InvitationResponseView,InvitationRedirectView

router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/signin/', SignInView.as_view(), name='signin'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('invites/', InvitationRedirectView.as_view(), name='invitation-redirect'),
    path('events/<int:event_id>/respond/', InvitationResponseView.as_view(), name='invitation-response'),
    
]
