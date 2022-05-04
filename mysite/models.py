from django.db import models
from .storage import OverwriteStorage

class Meta:
    app_label  = 'mysite'


class ArtTag(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name


class ArtPiece(models.Model):
    name = models.CharField(max_length=30, unique=True)
    image = models.ImageField(storage=OverwriteStorage(), null=True, upload_to="img")
    description = models.TextField(null=True)
    date = models.DateField(null=True)
    tags = models.ManyToManyField(ArtTag)

    def __str__(self):
        return self.name


class Program(models.Model):
    name = models.CharField(max_length=30, unique=True)
    html = models.CharField(max_length=30, null=True, blank=True)
    python = models.FileField(null=True, blank=True, upload_to="code/python")
    js = models.FileField(null=True, blank=True, upload_to="code/js")
    r = models.FileField(null=True, blank=True, upload_to="code/r")
    demo = models.BooleanField(null=True, default=False)
    description = models.TextField(null=True)

    def __str__(self):
        return self.name
