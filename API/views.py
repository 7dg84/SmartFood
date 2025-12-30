from django.shortcuts import render
from rest_framework import viewsets
from .serializer import *
from .models import *

# Create viewsets for all models


class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer


class PersonalCafeteriaViewSet(viewsets.ModelViewSet):
    queryset = PersonalCafeteria.objects.all()
    serializer_class = PersonalCafeteriaSerializer


class MovimientoViewSet(viewsets.ModelViewSet):
    queryset = Movimiento.objects.all()
    serializer_class = MovimientoSerializer


class VentaViewSet(viewsets.ModelViewSet):
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer


class AlimentoViewSet(viewsets.ModelViewSet):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer


class FavoritoViewSet(viewsets.ModelViewSet):
    queryset = Favorito.objects.all()
    serializer_class = FavoritoSerializer


class CalificacionViewSet(viewsets.ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer


class RecomendacionViewSet(viewsets.ModelViewSet):
    queryset = Recomendacion.objects.all()
    serializer_class = RecomendacionSerializer


class SugerenciaViewSet(viewsets.ModelViewSet):
    queryset = Sugerencia.objects.all()
    serializer_class = SugerenciaSerializer


class RecursosViewSet(viewsets.ModelViewSet):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer


class InfografiaViewSet(viewsets.ModelViewSet):
    queryset = Infografia.objects.all()
    serializer_class = InfografiaSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class ConsejoViewSet(viewsets.ModelViewSet):
    queryset = Consejo.objects.all()
    serializer_class = ConsejoSerializer


class ProgresoActividadViewSet(viewsets.ModelViewSet):
    queryset = ProgresoActividad.objects.all()
    serializer_class = ProgresoActividadSerializer


class TriviaViewSet(viewsets.ModelViewSet):
    queryset = Trivia.objects.all()
    serializer_class = TriviaSerializer


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer


class IntentoEncuestaViewSet(viewsets.ModelViewSet):
    queryset = IntentoEncuesta.objects.all()
    serializer_class = IntentoEncuestaSerializer
    
