"""
URL routes for the blogs app.
Defines endpoints for registration, blogs, and comments.
"""

from django.urls import path
from .views import RegisterView, BlogListCreateView, BlogDetailView, CommentListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('blogs/', BlogListCreateView.as_view(), name='blog-list-create'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('comments/', CommentListCreateView.as_view(), name='comment-list-create'),
]