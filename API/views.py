from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, BasePermission
from rest_framework.authentication import TokenAuthentication
from rest_framework import status, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from django.db.models import Exists, OuterRef, Value, BooleanField

from .serializer import *
from .models import *
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

# Create viewsets for all models

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return getattr(obj, 'id_usuario', None) == request.user

class AdministradorViewSet(viewsets.ModelViewSet):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    serializer_class = ReporteSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


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
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['nombre',]
    filterset_fields = ['categoria', 'permitido']

    # Permiso de lectura a usuarios no autenticados
    def get_permissions(self):
        if self.action in ['list',]:
            return [AllowAny()]
        return [IsAuthenticated() and IsAdminUser()]

    def get_queryset(self):
        """Support filtering by ?favorite=true to return only alimentos the
        requesting user has saved in `Favorito`.

        - ?favorite=true  => return only favorites for authenticated user
        - ?favorite=false => return only non-favorites for authenticated user
        If not present, return all alimentos (subject to other filters).
        If user is not authenticated and favorite=true, return empty queryset.
        """
        qs = super().get_queryset()
        fav = self.request.query_params.get('favorite')
        user = self.request.user
        
        # si no hay filtro de favoritos
        if fav is None:
            # Si el usuario no esta autenticado, devolver queryset con valores de favorito en false
            if not user or not user.is_authenticated:
                return qs
            
            # Si el usuario esta autenticado, devolver el querryset con los favoritos del usuario
            if user and user.is_authenticated:
                fav_subquery = Favorito.objects.filter(id_alimento=OuterRef('pk'), id_usuario=user)
                qs = qs.annotate(favorito=Exists(fav_subquery))
                print("user authtenticated and no favorite filter returning vaulues with favorite paramm")
                return qs
            else:
                # unauthenticated users: favorite=False
                return qs.annotate(favorite=Value(False, output_field=BooleanField()))

        fav_val = fav.lower() if fav is not None else None

        # si el usuario esta autenticado, y filtra por favoritos
        if user and user.is_authenticated and fav_val is not None:
            fav_subquery = Favorito.objects.filter(id_alimento=OuterRef('pk'), id_usuario=user)
            qs = qs.annotate(favorito=Exists(fav_subquery))
            
            if fav_val in ('1','true','yes'):
                return qs.filter(favorito=True)
            if fav_val in ('0','false','no'):
                return qs.exclude(favorito=True)
        
        # Si ninguno de los casos se cumple, devolver todo el queryset, con todos los valores de favoritos en false
        return qs


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
# Login de usuarios
@api_view(['POST'])
def login(request):
    # Lógica de autenticación aquí
    
    user = get_object_or_404(User, email=request.data['email'])
    
    if not user.check_password(request.data['password']):
        return Response({'error': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
    
    token, created = Token.objects.get_or_create(user=user)
    serilized = UserSerializer(user)
    
    return Response({'token': token.key, 'user': serilized.data}, status=status.HTTP_200_OK)

# Registro de usuarios
@api_view(['POST'])
def register(request):
    # Lógica de registro aquí
    serializer = UserSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data['username'])
        user.set_password(request.data['password'])
        user.save()
        
        token = Token.objects.create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Informacion del usuario autenticado
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def user(request):
    serilized = UserSerializer(request.user)
    return Response(serilized.data, status=status.HTTP_200_OK)


# Logout de usuarios
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout (request):
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)

# recuperacion de contraseña
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def recover(request):
    return Response({'user':request.user})

class ConsultaViewSet(viewsets.ModelViewSet):
    queryset = Consulta.objects.all()
    serializer_class = ConsultaSerializer

    
class FavoritoViewSet(viewsets.ModelViewSet):
    serializer_class = FavoritoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['id_alimento']
    search_fields = ['id_alimento__nombre']   

    def get_queryset(self):
        user = self.request.user
        return Favorito.objects.filter(id_usuario=user)

    def perform_create(self, serializer):
        # Associate the new favorito with the authenticated user
        if Favorito.objects.filter(id_usuario=self.request.user, id_alimento=serializer.validated_data['id_alimento']).exists():
            raise serializers.ValidationError("Este alimento ya está en tus favoritos.")
        serializer.save(id_usuario=self.request.user)
        

class CalificacionViewSet(viewsets.ModelViewSet):
    queryset = Calificacion.objects.all()
    serializer_class = CalificacionSerializer


class RecomendacionViewSet(viewsets.ModelViewSet):
    queryset = Recomendacion.objects.all()
    serializer_class = RecomendacionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    # Permiso de creacion a usuarios autenticados
    def get_permissions(self):
        if self.action in ['create',]:
            return [IsAuthenticated()]
        return [IsAdminUser()]
    
    def get_queryset(self):
        user = self.request.user
        return Favorito.objects.filter(id_usuario=user)
    
    
    def perform_create(self, serializer):
        # Associate the new recomendacion with the authenticated user
        serializer.save(id_usuario=self.request.user)


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
    
