from rest_framework import generics, filters
from .models import Community
from .serializers import CommunitySerializer
from chatterbox_api.permissions import IsOwnerOrReadOnly
from django.db.models import Count


class CommunityList(generics.ListAPIView):
    queryset = Community.objects.annotate(
        profiles_count=Count('owner__profile', distinct=True),
        posts_count=Count('owner__post', distinct=True)
    ).order_by('-created_at')
    serializer_class = CommunitySerializer
    filter_backends = [
        filters.OrderingFilter
    ]
    ordering_fields = [
        'profiles_count',
        'posts_count',
    ]


class CommunityDetail(generics.RetrieveUpdateAPIView):
    serializer_class = CommunitySerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Community.objects.all()
