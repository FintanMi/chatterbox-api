from django.urls import path
from community import views

urlpatterns = [
    path('community/', views.CommunityList.as_view()),
    path('community/<int:pk>/', views.CommunityDetail.as_view()),
]
