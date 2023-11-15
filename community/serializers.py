from rest_framework import serializers
from .models import Community


class CommunitySerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    profiles_count = serializers.ReadOnlyField()

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Community
        fields = ['id', 'owner', 'name', 'description', 'users', 'comment',
            'like', 'created_at', 'updated_at', 'posts_count', 'profiles_count']
