from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from hospital.models import (
    Department,
    Doctor,
    Service,
    EmergencyContact,
    Announcement,
)

User = get_user_model()


class Command(BaseCommand):
    help = "Seed hospital database with sample data"

    def handle(self, *args, **kwargs):

        departments = [
            ("Cardiology", "cardiology"),
            ("Neurology", "neurology"),
            ("Orthopedics", "orthopedics"),
            ("Dermatology", "dermatology"),
            ("General Medicine", "general-medicine"),
            ("Gynecology", "gynecology"),
            ("Pediatrics", "pediatrics"),
            ("Ophthalmology", "ophthalmology"),
            ("ENT", "ent"),
            ("Psychiatry", "psychiatry"),
            ("Pulmonology", "pulmonology"),
            ("Nephrology", "nephrology"),
            ("Radiology", "radiology"),
            ("Dentistry", "dentistry"),
            ("Gastroenterology", "gastroenterology"),
        ]

        dept_objects = {}

        for name, slug in departments:
            dept, _ = Department.objects.get_or_create(
                name=name,
                defaults={
                    "slug": slug,
                    "description": f"{name} Department",
                    "icon": "hospital",
                    "is_active": True,
                },
            )
            dept_objects[name] = dept

        doctors = [
            ("arjun.sharma", "Arjun", "Sharma", "Cardiology", "Cardiologist"),
            ("priya.reddy", "Priya", "Reddy", "Neurology", "Neurologist"),
            ("rahul.verma", "Rahul", "Verma", "Orthopedics", "Orthopedic Surgeon"),
            ("sneha.nair", "Sneha", "Nair", "Dermatology", "Dermatologist"),
            ("vikram.singh", "Vikram", "Singh", "General Medicine", "General Physician"),
            ("ananya.gupta", "Ananya", "Gupta", "Gynecology", "Gynecologist"),
            ("kiran.kumar", "Kiran", "Kumar", "Pediatrics", "Pediatrician"),
            ("neha.joshi", "Neha", "Joshi", "Ophthalmology", "Eye Specialist"),
            ("nikhil.reddy", "Nikhil", "Reddy", "ENT", "ENT Specialist"),
            ("pooja.patel", "Pooja", "Patel", "Psychiatry", "Psychiatrist"),
            ("rohan.mehta", "Rohan", "Mehta", "Pulmonology", "Pulmonologist"),
            ("meera.krishnan", "Meera", "Krishnan", "Nephrology", "Nephrologist"),
            ("kavya.iyer", "Kavya", "Iyer", "Radiology", "Radiologist"),
            ("adiya.rao", "Adiya", "Rao", "Gastroenterology", "Gastroenterologist"),
            ("sanjay.kullu", "Sanjay", "Kullu", "Dentistry", "Dental Surgeon"),
        ]

        for i, (username, first, last, dept, spec) in enumerate(doctors):

            user, created = User.objects.get_or_create(
                username=username,
                defaults={
                    "email": f"{username}@gmail.com",
                    "first_name": first,
                    "last_name": last,
                    "role": "Doctor",
                    "is_active": True,
                },
            )

            if created:
                user.set_password("Doctor@123")
                user.save()

            Doctor.objects.get_or_create(
                user=user,
                defaults={
                    "department": dept_objects[dept],
                    "specialization": spec,
                    "qualification": "MBBS, MD",
                    "experience_years": 5 + i,
                    "bio": f"Experienced {spec}.",
                    "consultation_fee": 500 + (i * 50),
                    "available_days": "Mon,Tue,Wed,Fri",
                    "available_time_start": "09:00",
                    "available_time_end": "17:00",
                    "rating": 4.5,
                    "is_active": True,
                },
            )

        for dept in Department.objects.all():
            Service.objects.get_or_create(
                department=dept,
                name=f"{dept.name} Consultation",
                defaults={
                    "description": f"Consultation in {dept.name}",
                    "price": 500,
                    "icon": "medical",
                    "is_active": True,
                },
            )

        EmergencyContact.objects.get_or_create(
            title="Ambulance",
            defaults={
                "phone_number": "108",
                "description": "Emergency Ambulance",
                "order": 1,
            },
        )

        EmergencyContact.objects.get_or_create(
            title="Hospital Reception",
            defaults={
                "phone_number": "+91 9876543210",
                "description": "Main Reception",
                "order": 2,
            },
        )

        admin = User.objects.filter(is_superuser=True).first()

        if admin:
            Announcement.objects.get_or_create(
                title="Welcome to Hospital",
                defaults={
                    "content": "We provide quality healthcare services.",
                    "created_by": admin,
                },
            )

        self.stdout.write(
            self.style.SUCCESS("✅ Hospital sample data created successfully!")
        )