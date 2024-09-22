from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Notes,Image
from .serializers import NoteSerializer,UserLoginSerializer,UserSerializer,ImageSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def ApiOverview(request):
	api_urls = {
		'all_items': '/all',
		'Search by Category': '/?category=category_name',
		'Search by Subcategory': '/?subcategory=category_name',
		'Add': '/create',
		'Update': '/update/pk',
		'Delete': '/item/pk/delete'
	}

	return Response(api_urls)

@api_view(['POST'])
def add_items(request):
	note = NoteSerializer(data=request.data)
	if note.is_valid():
		note.save()
		return Response(note.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def view_notes(request):
	# checking for the parameters from the URL
	if request.query_params:
		notes = Notes.objects.filter(**request.query_params.dict())
	else:
		notes = Notes.objects.all()

	# if there is something in items else raise error
	if notes:
		serializer = NoteSerializer(notes, many=True)
		return Response(serializer.data)
	else:
		return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def update_items(request, pk):
    try:
        note = Notes.objects.get(pk=pk)
    except Notes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    # Update the note with the provided data
    data = NoteSerializer(instance=note, data=request.data)
    
    if data.is_valid():
        data.save()
        return Response(data.data)
    else:
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_items(request, pk):
	item = get_object_or_404(Notes, pk=pk) # type: ignore
	item.delete()
	return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['POST'])
def login_view(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        # Here, you would typically generate a token or session
        return Response({"message": "Login successful", "user": user.username}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Create Image
@api_view(['POST'])
def create_image(request):
    serializer = ImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve All Images
@api_view(['GET'])
def list_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

# Retrieve Single Image
@api_view(['GET'])
def retrieve_image(request, pk):
    image = get_object_or_404(Image, pk=pk)
    serializer = ImageSerializer(image)
    return Response(serializer.data)

# Update Image
@api_view(['PUT'])
def update_image(request, pk):
    image = get_object_or_404(Image, pk=pk)
    serializer = ImageSerializer(instance=image, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Image
@api_view(['DELETE'])
def delete_image(request, pk):
    image = get_object_or_404(Image, pk=pk)
    image.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)