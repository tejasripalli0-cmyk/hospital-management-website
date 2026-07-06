from rest_framework import viewsets, permissions
from accounts.permissions import IsAdmin
from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactMessageViewSet(viewsets.ModelViewSet):
    """Anyone can POST a message (contact form). Only admins can list/view/manage."""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [IsAdmin()]
