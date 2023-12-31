from rest_framework import serializers
from .models import Contact
from django.contrib.humanize.templatetags.humanize import naturaltime


class ContactSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    class Meta:
        model = Contact
        fields = ['id', 'owner', 'is_owner', 'issue', 'body', 'created_at', 'profile_id',
                  'profile_image',
                  ]
