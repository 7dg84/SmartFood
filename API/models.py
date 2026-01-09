from django.db import models
import uuid
from django.core.exceptions import ValidationError
from django.conf import settings
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Administrador(models.Model):
    id_admin = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)
    
    def __str__(self):
        return self.nombre

class Reporte(models.Model):
    id_reporte = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    tipo = models.CharField(max_length=50)
    contenido = models.TextField(blank=True, null=True)
    fecha = models.DateTimeField(null=True, blank=True)
    id_admin = models.ForeignKey(Administrador, on_delete=models.CASCADE, related_name='reportes')

    def __str__(self):
        return f"Reporte {self.id_reporte} - {self.tipo}"

class Producto(models.Model):
    id_producto = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    codigo = models.CharField(max_length=50, blank=True, null=True)
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50, blank=True, null=True)
    precio = models.FloatField(null=True, blank=True)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Inventario(models.Model):
    id_inventario = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='inventarios')
    cantidad_actual = models.IntegerField(default=0)
    stock_minimo = models.IntegerField(default=0)
    alerta = models.BooleanField(default=False)

    def __str__(self):
        return f"Inventario {self.id_inventario} - {self.id_producto.nombre}"

class PersonalCafeteria(models.Model):
    id_cafeteria = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contrasena = models.CharField(max_length=100)
    turno_inicio = models.TimeField(null=True, blank=True)
    turno_fin = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Movimiento(models.Model):
    id_movimiento = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='movimientos')
    tipo = models.CharField(max_length=50)
    cantidad = models.IntegerField()
    fecha = models.DateTimeField(null=True, blank=True)
    id_admin = models.ForeignKey(Administrador, on_delete=models.CASCADE, null=True, blank=True, related_name='movimientos')
    id_cafeteria = models.ForeignKey(PersonalCafeteria, on_delete=models.CASCADE, null=True, blank=True, related_name='movimientos')

    def clean(self):
        # enforce exactly one actor (admin xor cafeteria)
        has_admin = self.id_admin is not None
        has_cafeteria = self.id_cafeteria is not None
        if (has_admin and has_cafeteria) or (not has_admin and not has_cafeteria):
            raise ValidationError('Movimiento must have exactly one actor: either id_admin or id_cafeteria')

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        actor = self.id_admin or self.id_cafeteria
        return f"Movimiento {self.id_movimiento} - {self.tipo} ({actor})"

class Venta(models.Model):
    id_venta = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_cafeteria = models.ForeignKey(PersonalCafeteria, on_delete=models.CASCADE, related_name='ventas')
    id_producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='ventas')
    cantidad = models.IntegerField()
    total = models.FloatField(null=True, blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    nombre_cliente = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Venta {self.id_venta} - {self.id_producto.nombre}"

class Alimento(models.Model):
    # Diferentes categorias de alimentos
    class Categoria(models.TextChoices):
        FRUTAS = 'FRUTAS', _('Frutas')
        BEBIDAS = 'BEBIDAS', _('Bebidas')
        LACTEOS = 'LACTEOS', _('Lácteos')
        SNACKS = 'SNACKS', _('Snacks')
        
    
    id_alimento = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    nombre = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50, choices=Categoria.choices, blank=True, null=True)
    descripcion = models.TextField(blank=True, null=True)
    permitido = models.BooleanField(default=True)
    informacion_nutricional = models.TextField(blank=True, null=True)
    imagen = models.CharField(max_length=255, blank=True, null=True)
    id_producto = models.ForeignKey(Producto, on_delete=models.SET_NULL, null=True, blank=True, related_name='alimentos')
    sellos = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.nombre

# class Usuario(models.Model):
#     id_usuario = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
#     username = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=100)

#     def __str__(self):
#         return self.nombre
# Use Django's built-in user model (settings.AUTH_USER_MODEL) instead of a local Usuario model

class Consulta(models.Model):
    id_consulta = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='consultas')
    id_alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name='consultas')
    fecha = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Consulta {self.id_consulta} - {self.id_usuario}"

class Favorito(models.Model):
    id_favorito = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='favoritos')
    id_alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name='favoritos')
    fecha_transaccion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Favorito {self.id_favorito} - {self.id_usuario}"

class Calificacion(models.Model):
    id_calificacion = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='calificaciones')
    id_alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name='calificaciones')
    fecha = models.DateTimeField(auto_now_add=True)
    comentario = models.TextField(blank=False, null=False)
    valor = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return f"Calificacion {self.id_calificacion} - {self.valor}"

class Recomendacion(models.Model):
    id_recomendacion = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recomendaciones')
    id_alimento = models.ForeignKey(Alimento, on_delete=models.CASCADE, related_name='recomendaciones')
    fecha = models.DateTimeField(auto_now_add=True)
    motivo = models.TextField(blank=False)

    def __str__(self):
        return f"Recomendacion {self.id_recomendacion}"

class Sugerencia(models.Model):
    id_sugerencia = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sugerencias')
    texto = models.TextField()
    fecha = models.DateTimeField(null=True, blank=True)
    archivo = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Sugerencia {self.id_sugerencia} - {self.id_usuario}"

class Recursos(models.Model):
    TIPO_CHOICES = [
        ('infografia', 'Infografía'),
        ('video', 'Video'),
        ('consejo', 'Consejo'),
    ]
    id_recurso = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    titulo = models.CharField(max_length=100)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.titulo

class Infografia(models.Model):
    id_recurso = models.OneToOneField(Recursos, on_delete=models.CASCADE, primary_key=True, related_name='infografia')
    imagen = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Infografia {self.id_recurso_id}"

class Video(models.Model):
    id_recurso = models.OneToOneField(Recursos, on_delete=models.CASCADE, primary_key=True, related_name='video')
    url = models.CharField(max_length=255)

    def __str__(self):
        return f"Video {self.id_recurso_id}"

class Consejo(models.Model):
    id_recurso = models.OneToOneField(Recursos, on_delete=models.CASCADE, primary_key=True, related_name='consejo')
    categoria = models.CharField(max_length=50, blank=False, null=False)
    texto = models.TextField(blank=False, null=False)
    icon = models.CharField(max_length=255, blank=False, null=False)

    def __str__(self):
        return f"Consejo {self.id_recurso_id}"

class ProgresoActividad(models.Model):
    id_progreso = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='progresos')
    id_recurso = models.ForeignKey(Recursos, on_delete=models.CASCADE, related_name='progresos')
    completado = models.BooleanField(default=False)
    fecha = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Progreso {self.id_progreso} - {self.id_usuario}"

class Trivia(models.Model):
    id_trivia = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.titulo

class Pregunta(models.Model):
    id_pregunta = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_trivia = models.ForeignKey(Trivia, on_delete=models.CASCADE, related_name='preguntas')
    texto = models.TextField()
    opcion_a = models.CharField(max_length=255, blank=True, null=True)
    opcion_b = models.CharField(max_length=255, blank=True, null=True)
    opcion_c = models.CharField(max_length=255, blank=True, null=True)
    opcion_d = models.CharField(max_length=255, blank=True, null=True)
    respuesta_correcta = models.CharField(max_length=1, blank=True, null=True)

    def __str__(self):
        return f"Pregunta {self.id_pregunta}"

class IntentoEncuesta(models.Model):
    id_intento = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='intentos')
    id_trivia = models.ForeignKey(Trivia, on_delete=models.CASCADE, related_name='intentos')
    fecha = models.DateTimeField(null=True, blank=True)
    puntaje = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"Intento {self.id_intento} - {self.puntaje}"

# Reseñas
class Resena(models.Model):
    id_resena = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='resenas')
    comentario = models.TextField(blank=False, null=False)
    valor = models.IntegerField(null=False, blank=False)
    fecha = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Resena {self.id_resena} - {self.valor}"