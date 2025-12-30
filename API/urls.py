from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from API import views

routers = routers.DefaultRouter()
routers.register(r'admins', views.AdministradorViewSet, 'admins')

urlpatterns = [
    path("v1/", include(routers.urls)),
    path('docs/', include_docs_urls(title='SmartFood API')),
]