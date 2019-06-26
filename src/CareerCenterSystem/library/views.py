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
    if request.method == "POST":
        try:
            # 検索条件を取得
            title = request.POST["title"]
            category_name = request.POST["category"]
            category = None
            if category_name != "":
                category = models.Category.objects.get(name=category_name)
            publisher = request.POST["publisher"]
            # 検索
            results = None
            if category != None:
                results = models.Book.objects.filter(title__icontains=title, category=category, publisher__icontains=publisher)
            else:
                results = models.Book.objects.filter(title__icontains=title, publisher__icontains=publisher)
            # 値をセットする
            if results.count() > 0:
                context["results"] = list(results)
                context["message"] = "検索が完了しました"
            else:
                context["message"] = "検索条件に一致するものは存在しません"
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
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