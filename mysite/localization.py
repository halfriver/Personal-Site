import os
from . import settings

# Each page's content is captured in a dictionary {Section: p1, p2, p3, etc.}

# request.POST.get('lang')

home_headers = ['About','Hobbies','Programming','Art','Contact']
# home = {
#     'About': ["I am an Integrated Data Analyst - Associate at UPMC Workpartners. I graduated with my master's degree in Quantitative Economics from the University of Pittsburgh in May 2021. My capstone project involved working with the Pittsburgh Penguins to model appropriate salaries for minor league hockey players.",
#             "My undergraduate degrees are in economics and geology. As an undergraduate, I studied abroad at Sophia University in Tokyo, Japan on a Nationality Room Scholarship and participated in research as a Pitt Honors College fellow.",
#             "I have worked in various positions from urban gardener to expense report auditor, but I have now found my home in the field of data science and analytics! In addition to economics and programming, I am passionate about plants, fish, and rocks."]
# }

home_eng = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/eng/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}
home_jpn = {x:[p for p in open(settings.BASE_DIR + "/static/files/content/jpn/" + x + ".txt", "r", encoding='utf-8').read().split("\n")] for x in home_headers}

art_eng = {}
art_jpn = {}

cv_eng = {}
cv_jpn = {}
