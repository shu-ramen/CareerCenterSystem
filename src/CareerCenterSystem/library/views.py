import csv
import datetime
from io import TextIOWrapper, StringIO
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
from django.template import loader
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from . import models, forms
from .backend.controller import BookController as BookCtrl
from .backend.controller import CommController as CommCtrl
from .backend.controller import EmailController as EmailCtrl

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
        "categories": [c.name for c in models.Category.objects.all()],
        "messages": [],
        "errors": []
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
                    context["messages"].append(message)
                else:
                    context["errors"].append(message)
            elif process == "borrow_request":
                book_id = int(data["book_id"])
                user = request.user
                message, success = BookCtrl.borrow([book_id], user)
                responce = {
                    "message": message,
                    "success": success
                }
                EmailCtrl.send_email_borrow([book_id], user)
                return JsonResponse(responce)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@login_required(login_url="/accounts/login/")
def borrow(request):
    template = loader.get_template('library/borrow.html')
    context = {
        "messages": [],
        "errors": []
    }
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
                EmailCtrl.send_email_borrow(book_ids, user)
                return JsonResponse(response)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@login_required(login_url="/accounts/login/")
def giveback(request):
    template = loader.get_template('library/giveback.html')
    context = {
        "messages": [],
        "errors": []
    }
    user = request.user
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            book_id = data["book_id"]
            message = BookCtrl.giveback(book_id, user)
            context["messages"].append(message)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    borrowList = BookCtrl.get_borrowed_books(user)
    if len(borrowList) > 0:
        context["borrowList"] = borrowList
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def register_category(request):
    template = loader.get_template('library/register_category.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()],
        "messages": [],
        "errors": []
    }
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "register_category":
                # 登録処理
                obj = models.Category()
                obj_data = {
                    "name": data["name"]
                }
                category = forms.CategoryForm(obj_data, instance=obj)
                if category.is_valid():
                    category.save()
                    context["messages"].append("登録しました")
                    context["categories"] = [c.name for c in models.Category.objects.all()]
                else:
                    context["form"] = category
            elif process == "delete_category":
                # 削除処理
                category_name = data["category"]
                if category_name != "":
                    category = models.Category.objects.get(name=category_name)
                    print(category.delete())
                    context["categories"] = [c.name for c in models.Category.objects.all()]
                    context["messages"].append("カテゴリ【{}】を削除しました".format(category_name))
                    responce = {
                        "message": "カテゴリ【{}】を削除しました".format(category_name),
                        "success": True
                    }
                    return JsonResponse(responce)
            elif process == "change_category":
                # 変更処理
                category_name = data["category"]
                new_name = data["name"]
                if category_name != "":
                    category = models.Category.objects.get(name=category_name)
                    category.name = new_name
                    category.save()
                    context["categories"] = [c.name for c in models.Category.objects.all()]
                    context["messages"].append("カテゴリ【{}】を【{}】に変更しました".format(category_name, new_name))
                else:
                    context["errors"].append("変更するカテゴリを選択してください")
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def register_book(request):
    template = loader.get_template('library/register_book.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()],
        "messages": [],
        "errors": []
    }
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            if data["process"] == "register_book":
                obj = models.Book()
                obj_data = {
                    "control_number": data["control_number"],
                    "title": data["title"],
                    "category": models.Category.objects.get(name=data["category"]).id,
                    "publisher": data["publisher"]
                }
                book = forms.BookForm(obj_data, instance=obj)
                if book.is_valid():
                    book.save()
                    context["messages"].append("登録しました")
                else:
                    context["form"] = book
            elif data["process"] == "register_book_file":
                if "file" in request.FILES:
                    if str(request.FILES["file"]).split(".")[-1] == "csv":
                        form_data = TextIOWrapper(request.FILES["file"])
                        csv_file = csv.reader(form_data)
                        for idx, line in enumerate(csv_file):
                            if idx == 0:
                                if len(line) == 4:
                                    if line[0] == "管理番号" and \
                                       line[1] == "書籍名" and \
                                       line[2] == "カテゴリ" and \
                                       line[3] == "出版社":
                                        continue
                                    else:
                                        context["messages"].append("【失敗】データの形式が正しくありません．登録処理は行われていません．")
                                        break
                                else:
                                    context["messages"].append("【失敗】データの形式が正しくありません．登録処理は行われていません．")
                                    break
                            else:
                                if len(line) == 4:
                                    control_number = line[0]
                                    title = line[1]
                                    category = line[2]
                                    publisher = line[3]
                                    if BookCtrl.search(control_number=control_number)[0].count() != 0:
                                        context["errors"].append("【失敗】{}件目のデータが不正です．管理番号が既存のものと重複しています．以降のデータはすべて登録されていません．".format(idx))
                                        break
                                    if models.Category.objects.filter(name=category).count() != 1:
                                        context["errors"].append("【失敗】{}件目のデータが不正です．指定されたカテゴリは存在しません．以降のデータはすべて登録されていません．".format(idx))
                                        break
                                    if control_number=="" or title == "" or category == "" or publisher == "":
                                        context["errors"].append("【失敗】{}件目のデータが不正です．空白のデータは許容されません．以降のデータはすべて登録されていません．".format(idx))
                                        break
                                    book = models.Book(
                                        control_number=control_number,
                                        title=title,
                                        publisher=publisher,
                                        category=models.Category.objects.get(name=category)
                                    )
                                    book.save()
                                else:
                                    context["errors"].append("【失敗】{}件目のデータが不正です．データ形式を確認してください．以降のデータはすべて登録されていません．".format(idx))
                                    break
                            context["messages"].append("【完了】{}件のデータを登録しました．".format(idx))
                    else:
                        context["errors"].append("【失敗】CSVファイルをアップロードしてください．")
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def unregister_book(request):
    template = loader.get_template('library/unregister_book.html')
    context = {
        "categories": [c.name for c in models.Category.objects.all()],
        "messages": [],
        "errors": []
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
                    context["messages"].append(message)
                else:
                    context["errors"].append(message)
            elif process == "unregister_book_request":
                book_id = int(data["book_id"])
                message, success = BookCtrl.deactivate(book_id)
                response = {
                    "message": message,
                    "success": success
                }
                return JsonResponse(response)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def status_borrow_recent(request):
    template = loader.get_template('library/status_borrow.html')
    context = {
        "results": BookCtrl.get_current_history(),
        "messages": [],
        "errors": []
    }
    if request.method == "POST":
        response = HttpResponse(content_type='text/csv; charset=Shift-JIS')
        filename = datetime.datetime.now().strftime("history_recent_%Y%m%d_%H%M%S.csv")
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
        writer = csv.writer(response)
        writer.writerow([
            "履歴ID", "学籍番号", "氏名", "メールアドレス", "電話番号",
            "図書ID", "管理番号", "書籍名", "カテゴリ", "出版社", "処理", "実行日", "返却期限"
        ])
        for row in BookCtrl.get_current_history():
            writer.writerow([
                row["id"],
                row["username"],
                row["name"],
                row["email"],
                "tel:{}".format(row["phone"]),
                row["book_id"],
                row["control_number"],
                row["title"],
                row["category"],
                row["publisher"],
                row["process"],
                row["timestamp"],
                row["deadline"]
            ])
        return response
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def status_borrow_past(request):
    template = loader.get_template('library/status_borrow.html')
    context = {
        "results": BookCtrl.get_all_history(),
        "messages": [],
        "errors": []
    }
    if request.method == "POST":
        response = HttpResponse(content_type='text/csv; charset=Shift-JIS')
        filename = datetime.datetime.now().strftime("history_all_%Y%m%d_%H%M%S.csv")
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
        writer = csv.writer(response)
        writer.writerow([
            "履歴ID", "学籍番号", "氏名", "メールアドレス", "電話番号",
            "図書ID", "管理番号", "書籍名", "カテゴリ", "出版社", "処理", "実行日", "返却期限"
        ])
        for row in BookCtrl.get_all_history():
            writer.writerow([
                row["id"],
                row["username"],
                row["name"],
                row["email"],
                "tel:{}".format(row["phone"]),
                row["book_id"],
                row["control_number"],
                row["title"],
                row["category"],
                row["publisher"],
                row["process"],
                row["timestamp"],
                row["deadline"]
            ])
        return response
    return HttpResponse(template.render(context, request))