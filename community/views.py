from rest_framework import generics
from .models import Community
from .serializers import CommunitySerializer
from chatterbox_api.permissions import IsOwnerOrReadOnly


class CommunityList(generics.ListAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer


class CommunityDetail(generics.RetrieveUpdateAPIView):
    serializer_class = CommunitySerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Community.objects.all()