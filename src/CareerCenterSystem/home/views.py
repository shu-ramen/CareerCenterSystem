from django.shortcuts import render
from django.http import HttpResponse, Http404
from django.template import loader
from library.backend.controller import NoticeController as NoticeCtrl

# Create your views here.
def index(request):
    template = loader.get_template('home/index.html')
    context = {
      "news_messages": NoticeCtrl.get_notice_tags(False),
      "important_news_messages": NoticeCtrl.get_notice_tags(True)
    }
    return HttpResponse(template.render(context, request))
