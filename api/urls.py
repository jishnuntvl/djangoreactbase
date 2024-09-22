
from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApiOverview, name='home'),
    path('create/', views.add_items, name='add-items'),
    path('all/', views.view_notes, name='view_items'),
    path('update/<int:pk>/', views.update_items, name='update-items'),
    path('item/<int:pk>/delete/', views.delete_items, name='delete-items'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),


    path('images/', views.list_images, name='image-list'),          # GET all images
    path('images/<int:pk>/', views.retrieve_image, name='image-detail'),  # GET single image
    path('images/create/', views.create_image, name='image-create'),   # POST create image
    path('images/<int:pk>/update/', views.update_image, name='image-update'),  # PUT update image
    path('images/<int:pk>/delete/', views.delete_image, name='image-delete'),  # DELETE image
    
]
