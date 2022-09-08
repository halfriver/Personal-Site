from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.Index.as_view(), name='home'),
    path('admin/', admin.site.urls),
    path('resume/', views.MainResume.as_view(), name='main_resume'),
    path('programming/', views.MainProgram.as_view(), name='main_program'),
    path('programming/hangman-dict/', views.Dict.as_view()),
    path('art/', views.MainArt.as_view(), name='main_art'),
    path('contact/', views.MainContact.as_view(), name='main_contact'),
    path('update_session/', views.update_session),
    path('gen_email/', views.gen_email)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
