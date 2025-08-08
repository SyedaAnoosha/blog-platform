"""
Serializers for Scroll Space.

Converts Blog, Comment, and User data to JSON and validates input.
"""

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'blog', 'author', 'content', 'created_at']