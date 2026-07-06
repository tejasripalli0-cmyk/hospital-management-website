from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'DOCTOR')


class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'PATIENT')


class IsOwnerOrAdmin(BasePermission):
    """Allow access only to the object's owner or an admin."""

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'ADMIN':
            return True
        owner = getattr(obj, 'user', None) or getattr(obj, 'patient', None)
        return owner == request.user
