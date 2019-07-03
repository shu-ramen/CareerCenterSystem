import json
from .. import models

class BookController(object):
    @staticmethod
    def search(title="", category=None, publisher=""):
        books = None
        message = None
        if ((title == "") and (category is None) and (publisher == "")):
            message = "少なくとも１つの検索条件を指定してください"
        else:
            if category is not None:
                books = models.Book.objects.filter(title__icontains=title, category=category, publisher__icontains=publisher)
            else:
                books = models.Book.objects.filter(title__icontains=title, publisher__icontains=publisher)
            if books.count() > 0:
                message = "検索が完了しました"
            else:
                message = "検索条件に一致するものは存在しません"
        return books, message
    
    @staticmethod
    def is_exist(book_id):
        if (models.Book.objects.filter(id=book_id).count() == 1):
            return True
        else:
            return False
    
    @staticmethod
    def get_latest_history(book):
        histories = models.History.objects.filter(book=book)
        if (histories.count() > 0):
            return histories.order_by('-timestamp')[0]
        else:
            return None

    @staticmethod
    def is_borrowable(book_id):
        if BookController.is_exist(book_id):
            book = models.Book.objects.get(id=book_id)
            latest = BookController.get_latest_history(book)
            if latest is not None:
                if latest.action == "0":
                    return False
                else:
                    return True
            else:
                return True
        else:
            return None
    
    @staticmethod
    def cart_in(filter_condition, mode):
        book = None
        message = None
        if mode == "id":
            borrowable = BookController.is_borrowable(filter_condition)
            if borrowable:
                book = models.Book.objects.get(id=filter_condition)
            elif borrowable is None:
                message = "IDの一致する図書が存在しません"
            else:
                message = "その本はすでに貸し出されています"
        elif mode == "control_number":
            if models.Book.objects.filter(control_number=filter_condition).count() == 1:
                book = models.Book.objects.get(control_number=filter_condition)
                latest = BookController.get_latest_history(book)
                if latest is not None:
                    if latest.action == "1":
                        book = None
                        message = "その本はすでに貸し出されています"
            else:
                message = "IDの一致する図書が存在しないか，条件に一致する図書が複数存在します"
        return book, message
    
    @staticmethod
    def borrow(book_ids, user):
        message = None
        success = True
        for book_id in book_ids:
            borrowable = BookController.is_borrowable(book_id)
            if borrowable is None:
                message = "IDの一致する図書が存在しません"
                success = False
                break
            if borrowable == False:
                message = "その本はすでに貸し出されています"
                success = False
                break
        if success:
            for book_id in book_ids:
                book = models.Book.objects.get(id=book_id)
                history = models.History(
                    book = book,
                    user = user,
                    action = 0
                )
                history.save()
            message = "貸出が完了しました"
        return message, success
    
    @staticmethod
    def giveback(book_id, user):
        message = None
        if BookController.is_exist(book_id):
            book = models.Book.objects.get(id=book_id)
            latest = BookController.get_latest_history(book)
            if latest is not None:
                if latest.action == "1":
                    message = "その本は貸し出されていません"
                else:
                    if latest.user == user:
                        history = models.History(
                            user=user,
                            book=book,
                            action=1
                        )
                        history.save()
                        message = "返却が完了しました"
                    else:
                        message = "貸し出した本人が処理を行ってください"
            else:
                message = "その本は貸し出されていません"
        else:
            message = "IDの一致する図書が存在しません"
        return message
    
    @staticmethod
    def get_borrowed_books(user):
        borrowList = []
        histories = models.History.objects.filter(user=user)
        if (histories.count() > 0):
            histories = histories.order_by('-timestamp')
            idList = []
            borrowList = []
            for history in histories:
                if int(history.book.id) not in idList:
                    idList.append(int(history.book.id))
                    if history.action == "0":
                        borrowList.append(history)
        return borrowList

class CommController(object):
    @staticmethod
    def get_ajax_data(body):
        data = json.loads(body)
        return data