from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, RegisterView

router = DefaultRouter()
router.register(r'events', EventViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', RegisterView.as_view(), name='register'),
]
