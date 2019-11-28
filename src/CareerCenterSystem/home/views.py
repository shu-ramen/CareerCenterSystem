from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template import loader
from . import news

# Create your views here.
def index(request):
    template = loader.get_template('home/index.html')
    context = {
      "news_messages": news.news_messages,
      "important_news_messages": news.important_news_messages
    }
    return HttpResponse(template.render(context, request))
