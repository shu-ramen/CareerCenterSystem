from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.template import loader
from . import models, forms

# Create your views here.
def index(request):
    template = loader.get_template('library/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def register_category(request):
    template = loader.get_template('library/register_category.html')
    context = {}
    if request.method == "POST":
        try:
            obj = models.Category()
            category = forms.CategoryForm(request.POST, instance=obj)
            category.save()
            context["message"] = "登録しました"
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))