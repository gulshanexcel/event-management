from django.db import models
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta

class Event(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=200)
    reminder = models.DateTimeField(null=True, blank=True)
    invitees = models.TextField(null=True, blank=True)
    invitation_status = models.JSONField(default=dict)

    def send_invitations(self):
        if self.invitees:
            emails = [email.strip() for email in self.invitees.split(',')]
            for email in emails:
                if not self.validate_email(email):
                    self.invitation_status[email] = 'Invalid Email'
                    continue
                try:
                    accept_link = f'http://yourdomain.com/events/{self.id}/respond/?email={email}&response=accepted'
                    decline_link = f'http://yourdomain.com/events/{self.id}/respond/?email={email}&response=declined'

                    send_mail(
                        f'You are invited to {self.title}',
                        f'Event Details:\n\n{self.description}\n\nDate: {self.date}\nLocation: {self.location}\n\n'
                        f'Click here to accept: {accept_link}\n'
                        f'Click here to decline: {decline_link}',
                        'from@example.com',
                        [email],
                        fail_silently=False,
                    )
                    self.invitation_status[email] = 'Pending'
                except Exception as e:
                    self.invitation_status[email] = 'Failed'

            self.save()

    def send_reminder(self):
        if self.reminder and timezone.now() >= self.reminder - timedelta(minutes=30):
            send_mail(
                f'Reminder: {self.title}',
                f'Reminder for the event "{self.title}" which is scheduled on {self.date} at {self.location}.',
                'from@example.com',
                [self.user.email],
                fail_silently=False,
            )

    def validate_email(self, email):
        try:
            validate_email(email)
            return True
        except ValidationError:
            return False

    def __str__(self):
        return self.title
