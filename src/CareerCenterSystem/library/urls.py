from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='library-index'),
    path('register/category/', views.register_category, name='library-register-category'),
]
