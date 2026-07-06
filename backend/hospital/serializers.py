from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Department, Doctor, Service, EmergencyContact, Announcement


class DepartmentSerializer(serializers.ModelSerializer):
    doctor_count = serializers.IntegerField(source='doctors.count', read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'name', 'slug', 'description', 'icon', 'image', 'is_active', 'doctor_count']


class ServiceSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Service
        fields = ['id', 'department', 'department_name', 'name', 'description', 'price', 'icon', 'is_active']


class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)

    class Meta:
        model = Doctor
        fields = [
            'id', 'user', 'department', 'department_name', 'specialization', 'qualification',
            'experience_years', 'bio', 'consultation_fee', 'available_days',
            'available_time_start', 'available_time_end', 'rating', 'is_active',
        ]


class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ['id', 'title', 'phone_number', 'description', 'is_active', 'order']


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = ['id', 'title', 'content', 'is_published', 'created_by', 'created_at']
        read_only_fields = ['created_by', 'created_at']
