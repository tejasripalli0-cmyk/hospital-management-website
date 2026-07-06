from django.contrib import admin
from .models import Department, Doctor, Service, EmergencyContact, Announcement

admin.site.register(Department)
admin.site.register(Doctor)
admin.site.register(Service)
admin.site.register(EmergencyContact)
admin.site.register(Announcement)
