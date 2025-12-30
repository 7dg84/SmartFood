from django.contrib import admin
from .models import *

# Register your models here.
admin.site.site_header = "SmartFood Administration"
admin.site.site_title = "SmartFood Admin Portal"
admin.site.register(Administrador)
admin.site.register(Reporte)
admin.site.register(Producto)
admin.site.register(Inventario)
admin.site.register(PersonalCafeteria)
admin.site.register(Movimiento)
admin.site.register(Venta)
admin.site.register(Alimento)
admin.site.register(Usuario)
admin.site.register(Consulta)
admin.site.register(Favorito)
admin.site.register(Calificacion)
admin.site.register(Recomendacion)
admin.site.register(Sugerencia)
admin.site.register(Recursos)
admin.site.register(Infografia)
admin.site.register(Video)
admin.site.register(Consejo)
admin.site.register(ProgresoActividad)
admin.site.register(Trivia)
admin.site.register(Pregunta)
admin.site.register(IntentoEncuesta)