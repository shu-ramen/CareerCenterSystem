from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from . import models, forms
from .backend.controller import BookController as BookCtrl
from .backend.controller import CommController as CommCtrl

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
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "search":
                # 検索条件を取得
                control_number = data["control_number"]
                title = data["title"]
                category_name = data["category"]
                category = None
                if category_name != "":
                    category = models.Category.objects.get(name=category_name)
                publisher = data["publisher"]
                # 検索
                books, message = BookCtrl.search(control_number, title, category, publisher)
                if books is not None:
                    context["results"] = []
                    for book in books:
                        context["results"].append({})
                        context["results"][-1].update({
                            "book_id": book.id,
                            "control_number": book.control_number,
                            "title": book.title,
                            "category": book.category,
                            "publisher": book.publisher,
                            "borrowable": BookCtrl.is_borrowable(book.id)
                        })
                context["message"] = message
            elif process == "borrow_request":
                book_id = int(data["book_id"])
                user = request.user
                message, success = BookCtrl.borrow([book_id], user)
                responce = {
                    "message": message,
                    "success": success
                }
                return JsonResponse(responce)
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))

@login_required(login_url="/accounts/login/")
def borrow(request):
    template = loader.get_template('library/borrow.html')
    context = {}
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "add_book_id":
                # カートイン処理
                book_id = int(data["book_id"])
                response = None
                book, message = BookCtrl.cart_in(book_id, BookCtrl.CARTIN_MODE_ID)
                if book is not None:
                    response = {
                        "book_id": book.id,
                        "control_number": book.control_number,
                        "book_title": book.title,
                        "book_category": book.category.name,
                        "book_publisher": book.publisher,
                        "success": True
                    }
                else:
                    response = {
                        "message": message,
                        "success": False
                    }
                return JsonResponse(response)
            elif process == "add_book_control_number":
                # カートイン処理
                control_number = data["control_number"]
                response = None
                book, message = BookCtrl.cart_in(control_number, BookCtrl.CARTIN_MODE_CTRL_NUM)
                if book is not None:
                    response = {
                        "book_id": book.id,
                        "control_number": book.control_number,
                        "book_title": book.title,
                        "book_category": book.category.name,
                        "book_publisher": book.publisher,
                        "success": True
                    }
                else:
                    response = {
                        "message": message,
                        "success": False
                    }
                return JsonResponse(response)
            elif process == "borrow_request":
                # 貸出処理
                books = data["books"]
                book_ids = [book["book_id"] for book in books]
                user = request.user
                message, success = BookCtrl.borrow(book_ids, user)
                response = {
                    "message": message,
                    "success": success,
                }
                return JsonResponse(response)
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))

@login_required(login_url="/accounts/login/")
def giveback(request):
    template = loader.get_template('library/giveback.html')
    context = {}
    user = request.user
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            book_id = data["book_id"]
            message = BookCtrl.giveback(book_id, user)
            context["message"] = message
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    borrowList = BookCtrl.get_borrowed_books(user)
    if len(borrowList) > 0:
        context["borrowList"] = borrowList
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def register_category(request):
    template = loader.get_template('library/register_category.html')
    context = {}
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            obj = models.Category()
            obj_data = {
                "name": data["name"]
            }
            category = forms.CategoryForm(obj_data, instance=obj)
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
            data = CommCtrl.get_posted_data(request)
            obj = models.Book()
            obj_data = {
                "control_number": data["control_number"],
                "title": data["title"],
                "category": models.Category.objects.get(name=data["category"]).id,
                "publisher": data["publisher"]
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

@staff_member_required(login_url="/accounts/login/")
def unregister_book(request):
    template = loader.get_template('library/unregister_book.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()]
    }
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "search":
                # 検索条件を取得
                control_number = data["control_number"]
                title = data["title"]
                category_name = data["category"]
                category = None
                if category_name != "":
                    category = models.Category.objects.get(name=category_name)
                publisher = data["publisher"]
                # 検索
                books, message = BookCtrl.search(control_number, title, category, publisher)
                if books is not None:
                    context["results"] = []
                    for book in books:
                        context["results"].append({})
                        context["results"][-1].update({
                            "book_id": book.id,
                            "control_number": book.control_number,
                            "title": book.title,
                            "category": book.category,
                            "publisher": book.publisher,
                            "borrowable": BookCtrl.is_borrowable(book.id)
                        })
                context["message"] = message
            elif process == "unregister_book_request":
                book_id = int(data["book_id"])
                # message = BookCtrl.deactivate(book_id)
                # context["message"] = message
                context["message"] = book_id
        except Exception as e:
            context["message"] = "失敗しました：{}".format(e)
    return HttpResponse(template.render(context, request))