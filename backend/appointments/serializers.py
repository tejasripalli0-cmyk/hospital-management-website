from rest_framework import serializers
from accounts.serializers import UserSerializer
from hospital.serializers import DoctorSerializer
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    patient_detail = UserSerializer(source='patient', read_only=True)
    doctor_detail = DoctorSerializer(source='doctor', read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 'patient', 'patient_detail', 'doctor', 'doctor_detail',
            'appointment_date', 'appointment_time', 'reason', 'status',
            'notes', 'created_at', 'updated_at',
        ]
        read_only_fields = ['patient', 'status', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['patient'] = self.context['request'].user
        return super().create(validated_data)
