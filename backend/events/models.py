from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail

class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    reminder = models.DateTimeField(null=True, blank=True)
    invitees = models.TextField(null=True, blank=True)

    def send_invitations(self):
        if self.invitees:
            emails = self.invitees.split(',')
            send_mail(
                f'You are invited to {self.title}',
                f'Event Details:\n\n{self.description}\n\nDate: {self.date}\nLocation: {self.location}',
                'from@example.com',
                emails,
                fail_silently=False,
            )

    def __str__(self):
        return self.title