from django.urls import path
from contact import views

urlpatterns = [
    path('contacts/', views.ContactList.as_view()),
    path('contacts/<int:pk>/', views.ContactDetail.as_view())
]
