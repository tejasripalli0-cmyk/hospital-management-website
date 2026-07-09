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
    help = "Seed hospital database with realistic sample data (idempotent, update-safe)"

    def handle(self, *args, **kwargs):

        # ------------------------------------------------------------------
        # SECTION 1: DEPARTMENTS
        # Each department has a name, slug, professional description and a
        # unique icon name. update_or_create() is used so that existing
        # records (e.g. ones seeded earlier with icon="hospital") are
        # corrected automatically instead of being left stale.
        # ------------------------------------------------------------------
        departments = [
            (
                "Cardiology",
                "cardiology",
                "Diagnosis and treatment of heart diseases including ECG, "
                "angiography and cardiac surgery.",
                "heart",
            ),
            (
                "Neurology",
                "neurology",
                "Comprehensive care for brain, spinal cord and nervous "
                "system disorders.",
                "brain",
            ),
            (
                "Orthopedics",
                "orthopedics",
                "Treatment of bones, joints, ligaments and muscles, "
                "including fractures and joint replacement.",
                "bone",
            ),
            (
                "Dermatology",
                "dermatology",
                "Diagnosis and treatment of skin, hair and nail conditions "
                "using modern dermatological care.",
                "shield",
            ),
            (
                "General Medicine",
                "general-medicine",
                "Primary healthcare for adults covering diagnosis, "
                "treatment and prevention of common illnesses.",
                "stethoscope",
            ),
            (
                "Gynecology",
                "gynecology",
                "Specialized care for women's reproductive health, "
                "pregnancy and childbirth.",
                "heart-pulse",
            ),
            (
                "Pediatrics",
                "pediatrics",
                "Medical care for infants, children and adolescents, "
                "including growth and vaccination monitoring.",
                "baby",
            ),
            (
                "Ophthalmology",
                "ophthalmology",
                "Complete eye care including vision correction, cataract "
                "and retina treatment.",
                "eye",
            ),
            (
                "ENT",
                "ent",
                "Treatment of ear, nose and throat disorders including "
                "hearing and sinus problems.",
                "ear",
            ),
            (
                "Psychiatry",
                "psychiatry",
                "Mental health evaluation, counselling and treatment for "
                "emotional and psychological wellbeing.",
                "brain-circuit",
            ),
            (
                "Pulmonology",
                "pulmonology",
                "Diagnosis and management of lung and respiratory tract "
                "conditions such as asthma and COPD.",
                "lungs",
            ),
            (
                "Nephrology",
                "nephrology",
                "Specialized care for kidney diseases, dialysis and "
                "related disorders.",
                "droplets",
            ),
            (
                "Radiology",
                "radiology",
                "Advanced diagnostic imaging services including X-ray, "
                "CT and MRI scans.",
                "scan",
            ),
            (
                "Dentistry",
                "dentistry",
                "Complete dental care including cleaning, fillings, "
                "root canal and orthodontics.",
                "smile",
            ),
            (
                "Gastroenterology",
                "gastroenterology",
                "Diagnosis and treatment of digestive system disorders "
                "including the stomach, liver and intestines.",
                "pill",
            ),
        ]

        dept_objects = {}

        for name, slug, description, icon in departments:
            dept, _ = Department.objects.update_or_create(
                name=name,
                defaults={
                    "slug": slug,
                    "description": description,
                    "icon": icon,
                    "is_active": True,
                },
            )
            dept_objects[name] = dept

        # ------------------------------------------------------------------
        # SECTION 2: DOCTORS
        # One doctor per department with realistic Indian names and
        # professional details. "doctor_icon" is only written if the
        # Doctor model actually defines that field, since the model does
        # not contain an ImageField and must not be modified.
        # ------------------------------------------------------------------
        doctor_field_names = {f.name for f in Doctor._meta.get_fields()}
        supports_doctor_icon = "doctor_icon" in doctor_field_names

        doctors = [
            ("arjun.sharma", "Arjun", "Sharma", "Cardiology", "Cardiologist",
             "MBBS, MD (Cardiology)", 12, 800, "stethoscope",
             "Specialist in interventional cardiology and heart failure management."),
            ("priya.reddy", "Priya", "Reddy", "Neurology", "Neurologist",
             "MBBS, DM (Neurology)", 10, 900, "user-round",
             "Expert in stroke management and epilepsy treatment."),
            ("rahul.verma", "Rahul", "Verma", "Orthopedics", "Orthopedic Surgeon",
             "MBBS, MS (Ortho)", 15, 750, "badge-plus",
             "Experienced in joint replacement and sports injury surgery."),
            ("sneha.nair", "Sneha", "Nair", "Dermatology", "Dermatologist",
             "MBBS, MD (Dermatology)", 8, 600, "user",
             "Focused on cosmetic dermatology and skin allergy treatment."),
            ("vikram.singh", "Vikram", "Singh", "General Medicine", "General Physician",
             "MBBS, MD (Medicine)", 14, 500, "stethoscope",
             "Provides comprehensive primary care for chronic and acute illnesses."),
            ("ananya.gupta", "Ananya", "Gupta", "Gynecology", "Gynecologist",
             "MBBS, MS (OBG)", 11, 700, "user-round",
             "Specializes in high-risk pregnancies and laparoscopic surgery."),
            ("kiran.kumar", "Kiran", "Kumar", "Pediatrics", "Pediatrician",
             "MBBS, MD (Pediatrics)", 9, 550, "baby",
             "Dedicated to child healthcare, immunization and nutrition."),
            ("neha.joshi", "Neha", "Joshi", "Ophthalmology", "Eye Specialist",
             "MBBS, MS (Ophthalmology)", 7, 600, "eye",
             "Skilled in cataract surgery and retinal disease management."),
            ("nikhil.reddy", "Nikhil", "Reddy", "ENT", "ENT Specialist",
             "MBBS, MS (ENT)", 10, 650, "ear",
             "Experienced in sinus surgery and hearing disorder treatment."),
            ("pooja.patel", "Pooja", "Patel", "Psychiatry", "Psychiatrist",
             "MBBS, MD (Psychiatry)", 6, 700, "brain-circuit",
             "Provides counselling and treatment for anxiety, depression and stress disorders."),
            ("rohan.mehta", "Rohan", "Mehta", "Pulmonology", "Pulmonologist",
             "MBBS, MD (Pulmonology)", 13, 750, "user",
             "Specialist in asthma, COPD and sleep-related breathing disorders."),
            ("meera.krishnan", "Meera", "Krishnan", "Nephrology", "Nephrologist",
             "MBBS, DM (Nephrology)", 12, 850, "droplets",
             "Expert in dialysis management and chronic kidney disease care."),
            ("kavya.iyer", "Kavya", "Iyer", "Radiology", "Radiologist",
             "MBBS, MD (Radiology)", 9, 600, "scan",
             "Experienced in diagnostic imaging including CT and MRI interpretation."),
            ("aditya.rao", "Aditya", "Rao", "Gastroenterology", "Gastroenterologist",
             "MBBS, DM (Gastroenterology)", 11, 800, "user-round",
             "Specializes in endoscopy and treatment of liver and digestive disorders."),
            ("sanjay.kullu", "Sanjay", "Kullu", "Dentistry", "Dental Surgeon",
             "BDS, MDS", 8, 500, "smile",
             "Focused on restorative dentistry, root canal and orthodontic care."),
        ]

        for i, (username, first, last, dept, spec, qualification,
                experience, fee, doc_icon, bio) in enumerate(doctors):

            # Create or update the underlying user account.
            user, created = User.objects.update_or_create(
                username=username,
                defaults={
                    "email": f"{username}@gmail.com",
                    "first_name": first,
                    "last_name": last,
                    "role": "Doctor",
                    "is_active": True,
                },
            )

            # Only reset the password on first creation so existing
            # doctor accounts are not locked out on re-seed.
            if created:
                user.set_password("Doctor@123")
                user.save()

            doctor_defaults = {
                "department": dept_objects[dept],
                "specialization": spec,
                "qualification": qualification,
                "experience_years": experience,
                "bio": bio,
                "consultation_fee": fee,
                "available_days": "Mon,Tue,Wed,Fri",
                "available_time_start": "09:00",
                "available_time_end": "17:00",
                "rating": 4.5,
                "is_active": True,
            }

            # Only include doctor_icon if the model actually supports it.
            if supports_doctor_icon:
                doctor_defaults["doctor_icon"] = doc_icon

            Doctor.objects.update_or_create(
                user=user,
                defaults=doctor_defaults,
            )

        # ------------------------------------------------------------------
        # SECTION 3: SERVICES
        # One consultation service per department, using the same icon as
        # its department for visual consistency.
        # ------------------------------------------------------------------
        for name, slug, description, icon in departments:
            dept = dept_objects[name]
            Service.objects.update_or_create(
                department=dept,
                name=f"{name} Consultation",
                defaults={
                    "description": f"Consultation and treatment services in {name}.",
                    "price": 500,
                    "icon": icon,
                    "is_active": True,
                },
            )

        # ------------------------------------------------------------------
        # SECTION 4: EMERGENCY CONTACTS
        # ------------------------------------------------------------------
        emergency_contacts = [
            ("Ambulance", "108", "24x7 Emergency Ambulance Service", 1),
            ("Emergency Room", "+91 9876500001", "Round-the-clock emergency medical care", 2),
            ("Hospital Reception", "+91 9876543210", "Main hospital reception desk", 3),
            ("Blood Bank", "+91 9876500002", "Blood availability and donation enquiries", 4),
            ("ICU", "+91 9876500003", "Intensive Care Unit contact for critical care", 5),
        ]

        for title, phone, description, order in emergency_contacts:
            EmergencyContact.objects.update_or_create(
                title=title,
                defaults={
                    "phone_number": phone,
                    "description": description,
                    "order": order,
                },
            )

        # ------------------------------------------------------------------
        # SECTION 5: ANNOUNCEMENTS
        # Requires an existing superuser to be set as the author.
        # ------------------------------------------------------------------
        admin = User.objects.filter(is_superuser=True).first()

        if admin:
            announcements = [
                ("Hospital Open 24x7",
                 "Our hospital provides round-the-clock emergency and outpatient services."),
                ("Free Health Camp",
                 "Join our free general health checkup camp this weekend. All are welcome."),
                ("COVID Vaccination",
                 "COVID-19 vaccination is now available for all age groups. Walk-ins accepted."),
                ("Blood Donation Camp",
                 "Participate in our blood donation drive and help save lives in your community."),
                ("New MRI Facility",
                 "We have launched a state-of-the-art MRI facility for faster, accurate diagnosis."),
            ]

            for title, content in announcements:
                Announcement.objects.update_or_create(
                    title=title,
                    defaults={
                        "content": content,
                        "created_by": admin,
                    },
                )
        else:
            self.stdout.write(
                self.style.WARNING(
                    "⚠️  No superuser found. Skipping announcement seeding."
                )
            )

        # ------------------------------------------------------------------
        # DONE
        # ------------------------------------------------------------------
        self.stdout.write(
            self.style.SUCCESS("✅ Hospital sample data seeded successfully.")
        )