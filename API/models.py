from django.db import models
import uuid

# Create your models here.
class Administrador(models.Model):
    id_admin = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    
    def __str__(self):
        return self.nombre