from django.db import models
import os

class Notes(models.Model):
	title=models.CharField(max_length=100)
	content=models.CharField(max_length=10000000000)

	def __str__(self) -> str:
		return self.title
	
class Image(models.Model):
    images = models.ImageField(upload_to='gallery_images/')
    caption = models.CharField(max_length=255, blank=True, null=True)


    def delete(self, *args, **kwargs):
        # Delete the image file from the local directory
        os.remove(self.images.path)
        
