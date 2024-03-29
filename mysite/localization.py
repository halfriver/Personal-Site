import os
from . import settings

home_headers = ['About','Hobbies','Programming','Art','Contact']
home_eng = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/eng/home/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}
home_jpn = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/jpn/home/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}

resume_headers = ['Statement','ProLang','Projects','Education','Awards','Jobs']
resume_eng = {x:[p.split("@") for p in open(settings.BASE_DIR + "/static/files/content/eng/resume/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in resume_headers}
resume_jpn = {x:[p.split("@") for p in open(settings.BASE_DIR + "/static/files/content/jpn/resume/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in resume_headers}

art_eng = {}
art_jpn = {}

contact_eng = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/eng/contact/Contact.txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}
contact_jpn = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/jpn/contact/Contact.txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}
