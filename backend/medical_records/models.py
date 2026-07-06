from django.conf import settings
from django.db import models
from hospital.models import Doctor


class MedicalRecord(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='medical_records')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, related_name='medical_records')
    diagnosis = models.CharField(max_length=255)
    prescription = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    attachment = models.FileField(upload_to='medical_records/', null=True, blank=True)
    record_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-record_date']

    def __str__(self):
        return f"{self.patient} — {self.diagnosis} ({self.record_date})"
