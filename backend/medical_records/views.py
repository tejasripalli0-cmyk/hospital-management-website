from rest_framework import viewsets, permissions
from accounts.permissions import IsOwnerOrAdmin
from .models import MedicalRecord
from .serializers import MedicalRecordSerializer


class MedicalRecordViewSet(viewsets.ModelViewSet):
    """Patients see only their own records; doctors/admins can create and view records."""
    serializer_class = MedicalRecordSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        qs = MedicalRecord.objects.select_related('patient', 'doctor__user')
        if user.role in ('ADMIN', 'DOCTOR'):
            return qs
        return qs.filter(patient=user)
