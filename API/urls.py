from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from API import views

router = routers.DefaultRouter()
router.register(r'admins', views.AdministradorViewSet, basename='admins')
router.register(r'reportes', views.ReporteViewSet, basename='reportes')
router.register(r'productos', views.ProductoViewSet, basename='productos')
router.register(r'inventarios', views.InventarioViewSet, basename='inventarios')
router.register(r'personal', views.PersonalCafeteriaViewSet, basename='personal')
router.register(r'movimientos', views.MovimientoViewSet, basename='movimientos')
router.register(r'ventas', views.VentaViewSet, basename='ventas')
router.register(r'alimentos', views.AlimentoViewSet, basename='alimentos')
# router.register(r'usuarios', views.UsuarioViewSet, basename='usuarios')
router.register(r'consultas', views.ConsultaViewSet, basename='consultas')
router.register(r'favoritos', views.FavoritoViewSet, basename='favoritos')
router.register(r'calificaciones', views.CalificacionViewSet, basename='calificaciones')
router.register(r'recomendaciones', views.RecomendacionViewSet, basename='recomendaciones')
router.register(r'sugerencias', views.SugerenciaViewSet, basename='sugerencias')
router.register(r'recursos', views.RecursosViewSet, basename='recursos')
router.register(r'infografias', views.InfografiaViewSet, basename='infografias')
router.register(r'videos', views.VideoViewSet, basename='videos')
router.register(r'consejos', views.ConsejoViewSet, basename='consejos')
router.register(r'progresos', views.ProgresoActividadViewSet, basename='progresos')
router.register(r'trivias', views.TriviaViewSet, basename='trivias')
router.register(r'preguntas', views.PreguntaViewSet, basename='preguntas')
router.register(r'intentos', views.IntentoEncuestaViewSet, basename='intentos')

urlpatterns = [
    path("v1/", include(router.urls)),
    path('docs/', include_docs_urls(title='SmartFood API')),
    re_path("v1/login/", views.login, name="login"),
    re_path("v1/register/", views.register, name="register"),
    re_path("v1/logout/", views.logout, name="logout"),
    re_path("v1/recover/", views.recover, name="recover"),
    # endpoint to download infografia file
    re_path(r"v1/infografia/(?P<pk>[^/]+)/file/", views.infografia_file, name='infografia-file'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)