import json
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
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

@login_required(login_url="/accounts/login/")
def borrow(request):
    template = loader.get_template('library/borrow.html')
    context = {}
    if request.method == "POST":
        try:
            body = request.body
            data = json.loads(body)
            process = data["process"]
            if process == "add_book":
                book_id = int(data["book_id"])
                response = None
                if (len(models.Book.objects.filter(id=book_id)) > 0):
                    book = models.Book.objects.get(id=book_id)
                    histories = models.History.objects.filter(book=book)
                    latest = None
                    if (len(histories) > 0):
                        latest = histories.order_by('-timestamp')[0]
                    if (latest is not None):
                        print(latest.action)
                        if latest.action == "0":
                            response = {
                                "message": "その本はすでに借り出されています",
                                "success": False,
                            }
                            return JsonResponse(response)
                    response = {
                        "book_id": book.id,
                        "book_title": book.title,
                        "book_category": book.category.name,
                        "book_publisher": book.publisher,
                        "success": True
                    }
                else:
                    response = {
                        "message": "IDの一致する図書が存在しません",
                        "success": False,
                    }
                return JsonResponse(response)
            elif process == "borrow_request":
                books = data["books"]
                user = request.user
                for book in books:
                    book_obj = models.Book.objects.get(id=book["id"])
                    history = models.History(
                        book=book_obj,
                        user=user,
                        action=0
                    )
                    history.save()
                response = {
                    "message": "貸出が完了しました",
                    "success": True,
                }
                return JsonResponse(response)
            else:
                return JsonResponse({"test": "test"})
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
            data = {
                "name": request.POST["name"]
            }
            category = forms.CategoryForm(data, instance=obj)
            if category.is_valid():
                category.save()
                context["message"] = "登録しました"
            else:
                context["form"] = category
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def register_book(request):
    template = loader.get_template('library/register_book.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()]
    }
    if request.method == "POST":
        try:
            obj = models.Book()
            data = {
                "title": request.POST["title"],
                "category": models.Category.objects.get(name=request.POST["category"]).id,
                "publisher": request.POST["publisher"]
            }
            book = forms.BookForm(data, instance=obj)
            if book.is_valid():
                book.save()
                context["message"] = "登録しました"
            else:
                context["form"] = book
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))