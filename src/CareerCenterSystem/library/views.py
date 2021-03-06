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
from accounts.models import CustomUser as User
from .backend.controller import BookController as BookCtrl
from .backend.controller import CommController as CommCtrl
from .backend.controller import EmailController as EmailCtrl
from .backend.controller import NoticeController as NoticeCtrl

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
                context["tab"] = "register"
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
            elif data["process"] == "export_book_file":
                context["tab"] = "export_file"
                response = HttpResponse(content_type='text/csv; charset=utf-32')
                filename = datetime.datetime.now().strftime("books_%Y%m%d_%H%M%S.csv")
                response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
                writer = csv.writer(response, delimiter='\t')
                writer.writerow([
                    "管理番号".encode("utf-32").decode("utf-32"),
                    "書籍名".encode("utf-32").decode("utf-32"),
                    "カテゴリ".encode("utf-32").decode("utf-32"),
                    "出版社".encode("utf-32").decode("utf-32"),
                    "アクティブ".encode("utf-32").decode("utf-32")
                ])
                print([
                    "管理番号".encode("utf-32").decode("utf-32"),
                    "書籍名".encode("utf-32").decode("utf-32"),
                    "カテゴリ".encode("utf-32").decode("utf-32"),
                    "出版社".encode("utf-32").decode("utf-32"),
                    "アクティブ".encode("utf-32").decode("utf-32")
                ])
                for book in models.Book.objects.all():
                    if book.category:
                        writer.writerow([
                            str(book.control_number).encode("utf-32").decode("utf-32"),
                            str(book.title).encode("utf-32").decode("utf-32"),
                            str(book.category.name).encode("utf-32").decode("utf-32"),
                            str(book.publisher).encode("utf-32").decode("utf-32"),
                            str(book.is_active).encode("utf-32").decode("utf-32")
                        ])
                    else:
                        writer.writerow([
                            str(book.control_number).encode("utf-32").decode("utf-32"),
                            str(book.title).encode("utf-32").decode("utf-32"),
                            "削除済".encode("utf-32").decode("utf-32"),
                            str(book.publisher).encode("utf-32").decode("utf-32"),
                            str(book.is_active).encode("utf-32").decode("utf-32")
                        ])
                return response
            elif data["process"] == "register_book_file":
                context["tab"] = "import_file"
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
                                    if control_number=="" or title == "" or category == "" or publisher == "":
                                        context["errors"].append("【失敗】{}件目のデータが不正です．空白のデータは許容されません．以降のデータはすべて登録されていません．".format(idx))
                                        break
                                    if models.Category.objects.filter(name=category).count() != 1:
                                        new_category = models.Category(name=category)
                                        new_category.save()
                                        context["messages"].append("カテゴリ【{}】を新たに追加しました".format(category))
                                    if BookCtrl.search(control_number=control_number)[0].count() != 0:
                                        # 既存のデータと重複している場合，内容を更新する
                                        book = BookCtrl.search(control_number=control_number)[0][0]
                                        book.title = title.replace(" ", "　")
                                        book.publisher = publisher.replace(" ", "　")
                                        book.category = models.Category.objects.get(name=category)
                                        book.save()
                                    else:
                                        # 新規データの場合
                                        book = models.Book(
                                            control_number=control_number,
                                            title=title.replace(" ", "　"),
                                            publisher=publisher.replace(" ", "　"),
                                            category=models.Category.objects.get(name=category)
                                        )
                                        book.save()
                                else:
                                    context["errors"].append("【失敗】{}件目のデータが不正です．データ形式を確認してください．以降のデータはすべて登録されていません．".format(idx))
                                    break
                            last_message = "【完了】{}件のデータを登録しました．".format(idx)
                        context["messages"].append(last_message)
                    else:
                        context["errors"].append("【失敗】CSVファイルをアップロードしてください．")
            elif data["process"] == "change_search":
                context["tab"] = "change"
                control_number = data["control_number"]
                books = BookCtrl.search(control_number=control_number)[0]
                if books.count() == 0:
                    context["errors"].append("【失敗】該当する管理番号の書籍は登録されていません．")
                elif books.count() > 1:
                    context["errors"].append("【失敗】管理番号は正しく入力してください．")
                else:
                    book = books[0]
                    context["change_book"] = True
                    context["control_number"] = book.control_number
                    context["title"] = book.title
                    context["category_name"] = book.category.name
                    context["publisher"] = book.publisher
                    context["messages"].append("該当する書籍が見つかりました")
            elif data["process"] == "change":
                context["tab"] = "change"
                control_number = data["control_number"]
                title = data["title"]
                category = data["category"]
                publisher = data["publisher"]
                books = BookCtrl.search(control_number=control_number)[0]
                if books.count() == 0:
                    context["errors"].append("【失敗】該当する管理番号の書籍は登録されていません．")
                elif books.count() > 1:
                    context["errors"].append("【失敗】管理番号は正しく入力してください．")
                else:
                    book = books[0]
                    if title != "":
                        book.title = title
                    if category != "":
                        book.category = models.Category.objects.get(name=category)
                    if publisher != "":
                        book.publisher = publisher
                    book.save()
                    context["messages"].append("書籍の情報を更新しました．")
        except Exception as e:
            print(e)
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
                books, message = BookCtrl.search(control_number, title, category, publisher, active_only=False)
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
                            "borrowable": BookCtrl.is_borrowable(book.id),
                            "is_active": book.is_active
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
            elif process == "register_book_request":
                book_id = int(data["book_id"])
                message, success = BookCtrl.activate(book_id)
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
        "errors": [],
        "target": "recent"
    }
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "downlaod":
                response = HttpResponse(content_type='text/csv; charset=Utf-32')
                filename = datetime.datetime.now().strftime("history_recent_%Y%m%d_%H%M%S.csv")
                response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
                writer = csv.writer(response, delimiter='\t')
                writer.writerow([
                    "履歴ID".encode("utf-32").decode("utf-32"),
                    "学籍番号".encode("utf-32").decode("utf-32"),
                    "氏名".encode("utf-32").decode("utf-32"),
                    "メールアドレス".encode("utf-32").decode("utf-32"),
                    "電話番号".encode("utf-32").decode("utf-32"),
                    "図書ID".encode("utf-32").decode("utf-32"),
                    "管理番号".encode("utf-32").decode("utf-32"),
                    "書籍名".encode("utf-32").decode("utf-32"),
                    "カテゴリ".encode("utf-32").decode("utf-32"),
                    "出版社".encode("utf-32").decode("utf-32"),
                    "処理".encode("utf-32").decode("utf-32"),
                    "実行日".encode("utf-32").decode("utf-32"),
                    "返却期限".encode("utf-32").decode("utf-32")
                ])
                for row in BookCtrl.get_current_history():
                    writer.writerow([
                        str(row["id"]).encode("utf-32").decode("utf-32"),
                        str(row["username"]).encode("utf-32").decode("utf-32"),
                        str(row["name"]).encode("utf-32").decode("utf-32"),
                        str(row["email"]).encode("utf-32").decode("utf-32"),
                        "tel:{}".format(row["phone"]).encode("utf-32").decode("utf-32"),
                        str(row["book_id"]).encode("utf-32").decode("utf-32"),
                        str(row["control_number"]).encode("utf-32").decode("utf-32"),
                        str(row["title"]).encode("utf-32").decode("utf-32"),
                        str(row["category"]).encode("utf-32").decode("utf-32"),
                        str(row["publisher"]).encode("utf-32").decode("utf-32"),
                        str(row["process"]).encode("utf-32").decode("utf-32"),
                        str(row["timestamp"]).encode("utf-32").decode("utf-32"),
                        str(row["deadline"]).encode("utf-32").decode("utf-32")
                    ])
                return response
            elif process == "giveback_book":
                user = User.objects.get(username=data["username"])
                message = BookCtrl.giveback(int(data["book_id"]), user)
                response = {
                    "message": message,
                    "success": True if message == "返却が完了しました" else False
                }
                return JsonResponse(response)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def status_borrow_past(request):
    template = loader.get_template('library/status_borrow.html')
    context = {
        "results": BookCtrl.get_all_history(),
        "messages": [],
        "errors": [],
        "target": "past"
    }
    if request.method == "POST":
        response = HttpResponse(content_type='text/csv; charset=Utf-32')
        filename = datetime.datetime.now().strftime("history_all_%Y%m%d_%H%M%S.csv")
        response['Content-Disposition'] = 'attachment; filename={}'.format(filename)
        writer = csv.writer(response, delimiter='\t')
        writer.writerow([
            "履歴ID".encode("utf-32").decode("utf-32"),
            "学籍番号".encode("utf-32").decode("utf-32"),
            "氏名".encode("utf-32").decode("utf-32"),
            "メールアドレス".encode("utf-32").decode("utf-32"),
            "電話番号".encode("utf-32").decode("utf-32"),
            "図書ID".encode("utf-32").decode("utf-32"),
            "管理番号".encode("utf-32").decode("utf-32"),
            "書籍名".encode("utf-32").decode("utf-32"),
            "カテゴリ".encode("utf-32").decode("utf-32"),
            "出版社".encode("utf-32").decode("utf-32"),
            "処理".encode("utf-32").decode("utf-32"),
            "実行日".encode("utf-32").decode("utf-32"),
            "返却期限".encode("utf-32").decode("utf-32")
        ])
        for row in BookCtrl.get_all_history():
            writer.writerow([
                str(row["id"]).encode("utf-32").decode("utf-32"),
                str(row["username"]).encode("utf-32").decode("utf-32"),
                str(row["name"]).encode("utf-32").decode("utf-32"),
                str(row["email"]).encode("utf-32").decode("utf-32"),
                "tel:{}".format(row["phone"]).encode("utf-32").decode("utf-32"),
                str(row["book_id"]).encode("utf-32").decode("utf-32"),
                str(row["control_number"]).encode("utf-32").decode("utf-32"),
                str(row["title"]).encode("utf-32").decode("utf-32"),
                str(row["category"]).encode("utf-32").decode("utf-32"),
                str(row["publisher"]).encode("utf-32").decode("utf-32"),
                str(row["process"]).encode("utf-32").decode("utf-32"),
                str(row["timestamp"]).encode("utf-32").decode("utf-32"),
                str(row["deadline"]).encode("utf-32").decode("utf-32")
            ])
        return response
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def remind(request):
    template = loader.get_template('library/remind.html')
    context = { }
    if request.method == "POST":
        EmailCtrl.remind()
    if EmailCtrl.getLatestReminderTimestamp is not None:
        context["timestamp"] = EmailCtrl.getLatestReminderTimestamp
    return HttpResponse(template.render(context, request))

@staff_member_required(login_url="/accounts/login/")
def notice(request):
    template = loader.get_template('library/notice.html')
    context = {
        "notices": NoticeCtrl.get_all_notices(),
        "tab": "add",
        "messages": [],
        "errors": []
    }
    if request.method == "POST":
        try:
            data = CommCtrl.get_posted_data(request)
            process = data["process"]
            if process == "add":
                content = data["content"]
                is_important = True if data["is_important"] == "重要" else False
                notice = models.Notice(
                    content=content,
                    is_important=is_important
                )
                notice.save()
                context["messages"].append("お知らせを追加しました")
                context["tab"] = "add"
            if process == "delete":
                response = {
                    "message": NoticeCtrl.delete_notice(int(data["notice_id"])),
                    "success": True
                }
                return JsonResponse(response)
        except Exception as e:
            context["errors"].append("失敗しました：{}".format(e))
    return HttpResponse(template.render(context, request))