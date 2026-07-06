from rest_framework.routers import DefaultRouter
from .views import (
    DepartmentViewSet, DoctorViewSet, ServiceViewSet,
    EmergencyContactViewSet, AnnouncementViewSet,
)

router = DefaultRouter()
router.register('departments', DepartmentViewSet, basename='department')
router.register('doctors', DoctorViewSet, basename='doctor')
router.register('services', ServiceViewSet, basename='service')
router.register('emergency-contacts', EmergencyContactViewSet, basename='emergency-contact')
router.register('announcements', AnnouncementViewSet, basename='announcement')

urlpatterns = router.urls
