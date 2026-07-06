<<<<<<< HEAD
# MediCare — Hospital Management Website

A full-stack Hospital Management System built with **React (Vite)**, **Django REST Framework**,
**PostgreSQL**, and **JWT authentication** — implementing every phase of the AI Development
Master Guide (Parts 1–10).

```
hospital-management-website/
├── backend/                # Django REST API
│   ├── config/              # Project settings, root urls, wsgi/asgi
│   ├── accounts/            # Custom User model (Patient/Doctor/Admin), JWT auth, profile
│   ├── hospital/            # Department, Doctor, Service, EmergencyContact, Announcement
│   ├── appointments/        # Appointment booking, cancellation, status management
│   ├── medical_records/     # Patient medical records
│   ├── contact/             # Public contact form + admin inbox
│   ├── requirements.txt
│   └── manage.py
└── frontend/                # React + Vite + Tailwind
    ├── src/
    │   ├── components/      # Navbar, Footer, Hero, Cards, Forms, Modal, Toast, etc.
    │   ├── pages/            # Home, Doctors, Appointment, Dashboards, Auth, etc.
    │   ├── contexts/         # AuthContext, ToastContext
    │   ├── services/         # Axios instance + API service modules
    │   └── hooks/            # useFetch, etc.
    └── package.json
```

## Part 1 — Architecture

- **Frontend:** React 18 + Vite, React Router v6, Axios, Context API, Tailwind CSS.
- **Backend:** Django 5 + Django REST Framework, JWT (SimpleJWT), PostgreSQL.
- **Roles:** `PATIENT` (default on signup), `DOCTOR`, `ADMIN` — enforced via DRF permission classes.

## Part 2 — Backend Models

| App | Models |
|---|---|
| `accounts` | `User` (role, phone, address, DOB, profile picture) |
| `hospital` | `Doctor`, `Department`, `Service`, `EmergencyContact`, `Announcement` |
| `appointments` | `Appointment` (status: Pending/Confirmed/Completed/Cancelled) |
| `medical_records` | `MedicalRecord` |
| `contact` | `ContactMessage` |

## Part 3 — Serializers, Views & APIs

All apps expose full CRUD via DRF `ModelViewSet`/routers. Key endpoints:

```
POST   /api/auth/register/
POST   /api/auth/login/                 → { access, refresh, user }
POST   /api/auth/login/refresh/
POST   /api/auth/logout/
GET    /api/auth/profile/               PATCH to update

GET    /api/hospital/departments/
GET    /api/hospital/doctors/?search=&department=
GET    /api/hospital/services/
GET    /api/hospital/emergency-contacts/
GET    /api/hospital/announcements/

GET    /api/appointments/appointments/          (?mine handled automatically by role)
POST   /api/appointments/appointments/          (book)
PATCH  /api/appointments/appointments/{id}/     (cancel/confirm/complete)

GET    /api/medical-records/records/
POST   /api/medical-records/records/

POST   /api/contact/messages/                    (public)
GET    /api/contact/messages/                    (admin only)
```

## Part 4–6 — Frontend Setup, Pages & Components

Routing, protected routes, and role-based redirects live in `App.jsx` /
`components/ProtectedRoute.jsx`. All 15 pages from the guide are implemented (Home, About,
Doctors, Doctor Details, Departments, Services, Appointment, Contact, Login, Register, Patient
Dashboard, Admin Dashboard, Profile, Emergency, 404), built from reusable components (Navbar,
Footer, Hero, DoctorCard, DepartmentCard, ServiceCard, AppointmentForm, SearchBar,
TestimonialSlider, FAQ, Pagination, Modal, Toast, LoadingSpinner, Sidebar, ProfileCard, StatCard).

## Part 7 — Authentication & Dashboards

- JWT access/refresh stored in `localStorage`; Axios interceptor auto-refreshes on 401.
- `AuthContext` exposes `user`, `login`, `register`, `logout`, `updateUser`.
- Patient Dashboard: appointments + medical records.
- Admin Dashboard: manage/confirm/cancel all appointments, doctor & department stats.

## Part 8 — API Integration

`src/services/api.js` centralizes the Axios instance, auth headers, and silent token refresh.
Domain services (`authService`, `doctorService`, `appointmentService`, `contactService`,
`medicalRecordService`) wrap each endpoint group.

## Part 9 — Styling & UX

Tailwind CSS with a custom healthcare palette (`primary` blue / `accent` teal), reusable utility
classes (`.btn-primary`, `.card`, `.input-field`, `.section-title`), responsive grid layouts,
loading skeletons/spinners, and toast notifications.

## Part 10 — Setup, Testing & Deployment

### 1. Backend setup

```bash
cd backend
python -m venv venv && source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                                   # then edit values
# Create the Postgres database first, e.g.:
#   createdb hospital_db
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver                              # http://localhost:8000
```

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev                                              # http://localhost:5173
```

### 3. Seeding sample data

Log into `/admin` (Django admin at `http://localhost:8000/admin/`) with your superuser and add
a few Departments, then Doctors (create a `User` with role=DOCTOR first, then a linked `Doctor`
profile), Services, and Emergency Contacts so the site has content to display.

### 4. Testing

- Backend: `python manage.py test` (add tests per app as you build out business logic).
- Frontend: consider adding Vitest + React Testing Library for component tests.

### 5. Deployment

- **Backend → Render (or Railway/Fly.io):** set `DEBUG=False`, add your Render Postgres
  connection details as env vars, set `ALLOWED_HOSTS`, run `python manage.py collectstatic`,
  and add a `gunicorn config.wsgi` start command.
- **Frontend → Vercel:** set `VITE_API_BASE_URL` to your deployed backend URL, build command
  `npm run build`, output directory `dist`.
- Update `CORS_ALLOWED_ORIGINS` / `FRONTEND_URL` in the backend `.env` to your Vercel domain.

### Future enhancements

- Email/SMS appointment reminders (e.g. via Celery + Redis).
- Doctor self-service portal for managing their own schedule and patient notes.
- Payment integration for consultation fees.
- Full test coverage and CI/CD pipeline.

---

**Note on AI-assisted development:** Each folder above maps directly to a phase in the original
Master Guide. When extending a section (e.g. adding a new page or model), prompt your AI
assistant with the specific file's purpose, expected behavior, and how it should integrate with
the existing services/contexts shown here for consistent, maintainable results.
=======
# hospital-website
>>>>>>> 88329a3e8dcfcf21a4c1267c7c423bea6e2406ba
