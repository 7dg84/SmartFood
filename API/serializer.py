from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator


class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = '__all__'
        read_only_fields = ('id_admin',)


class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'
        read_only_fields = ('id_reporte',)


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ('id_producto',)


class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'
        read_only_fields = ('id_inventario',)


class PersonalCafeteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalCafeteria
        fields = '__all__'
        read_only_fields = ('id_cafeteria',)


class MovimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movimiento
        fields = '__all__'
        read_only_fields = ('id_movimiento',)


class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = '__all__'
        read_only_fields = ('id_venta',)


class AlimentoSerializer(serializers.ModelSerializer):
    favorito = serializers.SerializerMethodField()

    class Meta:
        model = Alimento
        fields = '__all__'
        read_only_fields = ('id_alimento',)

    def get_favorito(self, obj):
        # annotated attribute from queryset; default to False if missing
        return bool(getattr(obj, 'favorito', False))

# Usamos el modelo de usuarios por defecto de Django el lugar de uno aparte
# class UsuarioSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Usuario
#         fields = '__all__'
#         read_only_fields = ('id_usuario',)
        
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        read_only_fields = ('id', 'password', 'email')
        


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = '__all__'
        read_only_fields = ('id_consulta',)


class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = '__all__'
        read_only_fields = ('id_favorito', 'id_usuario', 'fecha_transaccion')


class CalificacionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='id_usuario.username', read_only=True)
    class Meta:
        model = Calificacion
        fields = '__all__'
        read_only_fields = ('id_calificacion', 'id_usuario')


class RecomendacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recomendacion
        fields = '__all__'
        read_only_fields = ('id_recomendacion', 'fecha', 'id_usuario',)


class SugerenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sugerencia
        fields = '__all__'
        read_only_fields = ('id_sugerencia',)


class RecursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recursos
        fields = '__all__'
        read_only_fields = ('id_recurso',)


class InfografiaSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source='id_recurso.titulo', read_only=True)
    tipo = serializers.CharField(source='id_recurso.tipo', read_only=True)
    descripcion = serializers.CharField(source='id_recurso.descripcion', read_only=True)
    class Meta:
        model = Infografia
        fields = '__all__'
        read_only_fields = ('id_recurso',)


class VideoSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source='id_recurso.titulo', read_only=True)
    tipo = serializers.CharField(source='id_recurso.tipo', read_only=True)
    descripcion = serializers.CharField(source='id_recurso.descripcion', read_only=True)
    class Meta:
        model = Video
        fields = '__all__'
        read_only_fields = ('id_recurso',)


class ConsejoSerializer(serializers.ModelSerializer):
    titulo = serializers.CharField(source='id_recurso.titulo', read_only=True)
    tipo = serializers.CharField(source='id_recurso.tipo', read_only=True)
    descripcion = serializers.CharField(source='id_recurso.descripcion', read_only=True)
    class Meta:
        model = Consejo
        fields = '__all__'
        read_only_fields = ('id_recurso',)


class ProgresoActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgresoActividad
        fields = '__all__'
        read_only_fields = ('id_progreso',)


class TriviaSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Trivia
        fields = '__all__'
        read_only_fields = ('id_trivia',)


class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = '__all__'
        read_only_fields = ('id_pregunta',)


class IntentoEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntentoEncuesta
        fields = '__all__'
        read_only_fields = ('id_intento',)

                
# reseñas serializer
class ReseñaSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='id_usuario.username', read_only=True)
    class Meta:
        model = Resena
        fields = '__all__'
        read_only_fields = ('id_resena', 'fecha', 'id_usuario')