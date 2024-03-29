from django.views.generic import ListView, TemplateView, DetailView, View
from .localization import *
from django.http import HttpResponseNotAllowed, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import ArtPiece, ArtTag, Program
from django.templatetags.static import static
from django.core.mail import send_mail
from django.core import mail
from .secrets import EMAIL
from random import choice
from .settings import BASE_DIR
import os
import time

class Index(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'lang' not in self.request.session:
            self.request.session['lang'] = 'eng'
        context["lang"] = self.request.session.get('lang')
        context["darkmode"] = self.request.session.get('darkmode')
        if context["lang"] == "eng":
            context["home"] = home_eng
        elif context["lang"] == "jpn":
            context["home"] = home_jpn

        return context


class MainArt(ListView):
    model = ArtTag
    template_name = "gallery.html"
    context_object_name = "tag"

    def get_queryset(self, **kwargs):
        queryset = ArtTag.objects.all().order_by('name')
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tags = ArtTag.objects.values_list("name", flat=True)
        art_dict = {}
        for tag in tags:
            art_dict[tag] = ArtPiece.objects.filter(tags__name__in=[tag])
        context["art"] = art_dict
        context["all"] = ArtPiece.objects.all().order_by('-date')

        if 'lang' not in self.request.session:
            self.request.session['lang'] = 'eng'
        context["lang"] = self.request.session.get('lang')
        context["darkmode"] = self.request.session.get('darkmode')

        return context


class MainContact(TemplateView):
    template_name = 'contact.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'lang' not in self.request.session:
            self.request.session['lang'] = 'eng'
        context["lang"] = self.request.session.get('lang')
        context["darkmode"] = self.request.session.get('darkmode')
        if context["lang"] == "eng":
            context["contact"] = contact_eng
        elif context["lang"] == "jpn":
            context["contact"] = contact_jpn
        return context

def gen_email(request):
    # send_mail(
    #     'Test Subject',
    #     request.POST.get('message'),
    #     'from@example.com',
    #     [EMAIL]
    # )
    with mail.get_connection() as connection:
        mail.EmailMessage(
            'Test Subject', request.POST.get('message'), 'from@example.com', [EMAIL],
            connection=connection,
        ).send()
    return HttpResponse('ok')


class MainResume(TemplateView):
    template_name = "resume.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if 'lang' not in self.request.session:
            self.request.session['lang'] = 'eng'
        context["lang"] = self.request.session.get('lang')
        context["darkmode"] = self.request.session.get('darkmode')
        if context["lang"] == "eng":
            context["resume"] = resume_eng
        elif context["lang"] == "jpn":
            context["resume"] = resume_jpn

        context["modtime"] = time.strftime('%Y-%m-%d', time.localtime(os.path.getmtime(BASE_DIR + "/static/files/OhkawaResume.pdf")))

        return context


class MainProgram(ListView):
    model = Program
    template_name = "programs.html"
    context_object_name = "programs"

    def get_queryset(self, **kwargs):
        queryset = Program.objects.all().order_by('name')
        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        if not self.request.session['lang']:
            self.request.session['lang'] = 'eng'
        context["lang"] = self.request.session.get('lang')
        context["darkmode"] = self.request.session.get('darkmode')

        return context


class Dict(View):
    def get(self, request, *args, **kwargs):
        dict = static('files/dictionary.txt')
        f = open(BASE_DIR + dict, "r")
        choices = f.read().split()
        f.close()
        word = choice(choices)

        return HttpResponse(word)


@ensure_csrf_cookie
def update_session(request):
    if not request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest' or not request.method=='POST':
        return HttpResponseNotAllowed(['POST'])

    if request.POST.get('lang') == 'jpn':
        request.session['lang'] = 'jpn'
    else:
        request.session['lang'] = 'eng'

    if request.POST.get('darkmode') == "true":
        request.session['darkmode'] = 'dark'
    else:
        request.session['darkmode'] = 'light'
    return HttpResponse('ok')


@ensure_csrf_cookie
def get_email(request):
    if not request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest' or not request.method=='POST':
        return HttpResponseNotAllowed(['POST'])
    if request.POST.get('email') == 'email':
        return HttpResponse(EMAIL)
