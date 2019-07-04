from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='library-index'),
    path('search/', views.search, name='library-search'),
    path('borrow/', views.borrow, name='library-borrow'),
    path('giveback/', views.giveback, name='library-giveback'),
    path('register/category/', views.register_category, name='library-register-category'),
    path('register/book/', views.register_book, name='library-register-book'),
    path('unregister/book/', views.unregister_book, name='library-unregister-book'),
    path('status/borrow/recent/', views.status_borrow_recent, name='library-status-borrow-recent'),
    path('status/borrow/past/', views.status_borrow_past, name='library-status-borrow-past'),
]
