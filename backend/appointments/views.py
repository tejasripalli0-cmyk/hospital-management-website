from rest_framework import viewsets, permissions
from .models import Appointment
from .serializers import AppointmentSerializer


class IsPatientOwnerDoctorOrAdmin(permissions.BasePermission):
    """Patients see/manage only their own appointments; doctors see their own patients'
    appointments; admins see everything."""

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.role == 'ADMIN':
            return True
        if user.role == 'DOCTOR':
            return hasattr(user, 'doctor_profile') and obj.doctor_id == user.doctor_profile.id
        return obj.patient_id == user.id


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Booking:      POST /api/appointments/appointments/
    Cancel:       PATCH /api/appointments/appointments/{id}/  {"status": "CANCELLED"}
    My bookings:  GET  /api/appointments/appointments/?mine=true
    """
    serializer_class = AppointmentSerializer
    permission_classes = [IsPatientOwnerDoctorOrAdmin]

    def get_queryset(self):
        user = self.request.user
        qs = Appointment.objects.select_related('patient', 'doctor__user')
        if user.role == 'ADMIN':
            return qs
        if user.role == 'DOCTOR' and hasattr(user, 'doctor_profile'):
            return qs.filter(doctor=user.doctor_profile)
        return qs.filter(patient=user)
