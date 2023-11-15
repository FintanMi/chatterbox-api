from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from comments.models import Comment
from likes.models import Like


class Community(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    users = models.ForeignKey(User, on_delete=models.CASCADE, related_name='users')
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    like = models.ForeignKey(Like, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} community"


def create_community(sender, instance, created, **kwargs):
    if created:
        Community.objects.create(owner=instance)


post_save.connect(create_community, sender=User)
