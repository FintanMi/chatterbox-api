from rest_framework import generics, permissions
from chatterbox_api.permissions import IsOwnerOrReadOnly
from .models import Contact
from .serializers import ContactSerializer


class ContactList(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Contact.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ContactDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
