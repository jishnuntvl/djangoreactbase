from django.db.models import fields
from rest_framework import serializers
from .models import Notes,Image
from django.contrib.auth import authenticate

from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user


class NoteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Notes
		fields = [
        'id',
        'title',
        'content'
        ]

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        return user

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'images', 'caption']