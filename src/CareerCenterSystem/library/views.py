from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from . import models, forms

# Create your views here.
@login_required(login_url="/accounts/login/")
def index(request):
    template = loader.get_template('library/index.html')
    context = {}
    return HttpResponse(template.render(context, request))

@login_required
def search(request):
    template = loader.get_template('library/search.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()]
    }
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
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