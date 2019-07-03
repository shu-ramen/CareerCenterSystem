from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='library-index'),
    path('search/', views.search, name='library-search'),
    path('borrow/', views.borrow, name='library-borrow'),
    path('giveback/', views.giveback, name='library-giveback'),
    path('register/category/', views.register_category, name='library-register-category'),
    path('register/book/', views.register_book, name='library-register-book'),
]
