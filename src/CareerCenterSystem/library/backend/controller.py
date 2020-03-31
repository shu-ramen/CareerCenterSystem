import json
import datetime
from .. import models
from ..email import email_borrow, email_reminder

class BookController(object):
    CARTIN_MODE_ID = 0
    CARTIN_MODE_CTRL_NUM = 1

    @staticmethod
    def search(control_number="", title="", category=None, publisher="", active_only=True):
        """図書の検索
        
        Args:
            control_number (str, optional): 管理番号. Defaults to "".
            title (str, optional): 図書のタイトル. Defaults to "".
            category (models.Category, optional): 図書のカテゴリー. Defaults to None.
            publisher (str, optional): 出版社名. Defaults to "".
        
        Returns:
            list[models.Book], str: 検索条件に一致する図書, 応答メッセージ
        """
        books = None
        message = None
        # 検索条件が空の場合を許可しない
        if ((control_number == "") and (title == "") and (category is None) and (publisher == "")):
            message = "少なくとも１つの検索条件を指定してください"
        else:
            if category is not None:
                # カテゴリーの指定がある場合
                if active_only:
                    books = models.Book.objects.filter(control_number__icontains=control_number, title__icontains=title, category=category, publisher__icontains=publisher, is_active=True)
                else:
                    books = models.Book.objects.filter(control_number__icontains=control_number, title__icontains=title, category=category, publisher__icontains=publisher)
            else:
                # カテゴリーの指定がある場合
                if active_only:
                    books = models.Book.objects.filter(control_number__icontains=control_number, title__icontains=title, publisher__icontains=publisher, is_active=True)
                else:
                    books = models.Book.objects.filter(control_number__icontains=control_number, title__icontains=title, publisher__icontains=publisher)
            # 検索条件に一致するものがあるかチェック
            if books.count() > 0:
                message = "検索が完了しました"
            else:
                message = "検索条件に一致するものは存在しません"
        return books, message
    
    @staticmethod
    def is_exist(book_id):
        """図書の存在をチェック
        
        Args:
            book_id (int): 図書ID
        
        Returns:
            bool: True: 存在する, False: 存在しない
        """
        if (models.Book.objects.filter(id=book_id).count() == 1):
            # 図書が存在する場合
            book = models.Book.objects.get(id=book_id)
            if book.is_active:
                # 図書が有効の場合
                return True
            else:
                # 図書が無効の場合
                return False
        else:
            # 図書が存在しない場合
            return False
    
    @staticmethod
    def get_latest_history(book):
        """最新の履歴を取得
        
        Args:
            book (models.Book): 図書モデル
        
        Returns:
            models.History or None: 最新の履歴（なければNoneを返す）
        """
        histories = models.History.objects.filter(book=book)
        if (histories.count() > 0):
            # 履歴が一件以上ある場合，新しい順に並べて一件目を返却
            return histories.order_by('-timestamp')[0]
        else:
            # 履歴がない場合
            return None

    @staticmethod
    def is_borrowable(book_id):
        """貸出可否をチェック
        
        Args:
            book_id (int): 図書ID
        
        Returns:
            bool or None: True: 貸出可, False: 貸出不可, None: 図書が存在しない
        """
        # 図書の存在をチェック
        if BookController.is_exist(book_id):
            # 図書を取得
            book = models.Book.objects.get(id=book_id)
            # 最新の履歴を取得
            latest = BookController.get_latest_history(book)
            if latest is not None:
                # 履歴がある場合
                if latest.action == "0":
                    # 最新履歴が貸出の場合
                    return False
                else:
                    # 最新履歴が返却の場合
                    return True
            else:
                # 履歴がない場合
                return True
        else:
            # 図書が存在しない場合
            return None
    
    @staticmethod
    def cart_in(filter_condition, mode):
        """貸出したい本を追加するカートイン処理
        
        Args:
            filter_condition (int or str): book_id or control_number
            mode (int): CARTIN_MODE_ID or CARTIN_MODE_CTRL_NUM
        
        Returns:
            models.Book, str: 図書モデル, 応答メッセージ
        """
        book = None
        message = None
        if mode == BookController.CARTIN_MODE_ID:
            # 図書IDモード
            # 貸出可否をチェック
            borrowable = BookController.is_borrowable(filter_condition)
            if borrowable:
                book = models.Book.objects.get(id=filter_condition)
            elif borrowable is None:
                # 図書が存在しない場合
                message = "IDの一致する図書が存在しません"
            else:
                # すでに貸し出されている場合
                message = "その本はすでに貸し出されています"
        elif mode == BookController.CARTIN_MODE_CTRL_NUM :
            # 管理番号モード
            # 図書の存在をチェック（１件の場合のみを許可する）
            if models.Book.objects.filter(control_number=filter_condition).count() == 1:
                # 図書を取得
                book = models.Book.objects.get(control_number=filter_condition)
                print(book.is_active)
                if book.is_active:
                    # 図書が有効の場合
                    # 最新履歴を取得
                    latest = BookController.get_latest_history(book)
                    if latest is not None:
                        if latest.action == "0":
                            # 最新履歴が貸し出しの場合
                            book = None
                            message = "その本はすでに貸し出されています"
                else:
                    book = None
                    message = "管理番号の一致する図書が存在しません"
            else:
                # 単一の存在チェックが失敗した場合
                message = "管理番号の一致する図書が存在しないか，条件に一致する図書が複数存在します"
        return book, message
    
    @staticmethod
    def borrow(book_ids, user):
        """図書の貸出
        
        Args:
            book_ids (list[int]): 図書IDのリスト
            user (accounts.models.CustomUser): ユーザー
        
        Returns:
            str, bool: 応答メッセージ, 成功したかどうか
        """
        message = None
        success = True
        for book_id in book_ids:
            # 貸出可否をチェック
            borrowable = BookController.is_borrowable(book_id)
            if borrowable is None:
                # 図書が存在しない場合
                message = "IDの一致する図書が存在しません"
                success = False
                break
            if borrowable == False:
                # すでに貸し出されている場合
                message = "その本はすでに貸し出されています"
                success = False
                break
        if success:
            # すべての図書が貸出条件を満たしていた場合
            for book_id in book_ids:
                # 図書を取得
                book = models.Book.objects.get(id=book_id)
                # 貸出の履歴を作成
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
        """図書の返却
        
        Args:
            book_id (int): 図書ID
            user (accounts.models.CuntomUser): ユーザー
        
        Returns:
            str: 応答メッセージ
        """
        message = None
        # 図書の存在チェック
        if BookController.is_exist(book_id):
            # 図書の取得
            book = models.Book.objects.get(id=book_id)
            # 最新の貸出履歴を取得
            latest = BookController.get_latest_history(book)
            if latest is not None:
                if latest.action == "1":
                    # 最新の履歴が返却の場合
                    message = "その本は貸し出されていません"
                else:
                    # 貸し出したユーザーと同一かをチェック
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
                # 貸出履歴がない場合
                message = "その本は貸し出されていません"
        else:
            # 図書が存在しない場合
            message = "IDの一致する図書が存在しません"
        return message
    
    @staticmethod
    def get_borrowed_books(user):
        """特定ユーザーの貸出中図書を取得（古い順）
        
        Args:
            user (accounts.models.CustomUser): ユーザー
        
        Returns:
            list[models.History]: 貸出中の図書の履歴
        """
        idList = []
        borrowList = []
        # 特定ユーザーの履歴をすべて取得
        histories = models.History.objects.filter(user=user)
        if (histories.count() > 0):
            # 新しい順に並べる
            histories = histories.order_by("-timestamp")
            for history in histories:
                # 図書の重複を禁止する
                if history.book.id not in idList:
                    idList.append(history.book.id)
                    # 貸出状態のみを取得する
                    if history.action == "0":
                        borrowList.append(history)
        # 古い順に並び替える
        borrowList = borrowList[::-1]
        return borrowList
    
    @staticmethod
    def get_current_history():
        """全ユーザーの貸出中図書を取得（古い順）
        
        Returns:
            list[models.History]: 貸出中の図書の履歴
        """
        idList = []
        borrowList = []
        # 過去の履歴をすべて取得
        histories = models.History.objects.all()
        if (histories.count() > 0):
            # 新しい順に並べる
            histories = histories.order_by("-timestamp")
            for history in histories:
                # 図書の重複を禁止する
                if history.book.id not in idList:
                    idList.append(history.book.id)
                    # 貸出状態のみを取得する
                    if history.action == "0":
                        borrowList.append(BookController.history_to_dict(history))
        # 古い順に並び替える
        borrowList = borrowList[::-1]
        return borrowList
    
    @staticmethod
    def get_all_history():
        """全ユーザーの履歴をすべて取得（新しい順）
        
        Returns:
            list[models.History]: 貸出中の図書の履歴
        """
        historyList = []
        histories = models.History.objects.all()
        if (histories.count() > 0):
            # 履歴が存在すれば新しい順に並べて返す
            histories = histories.order_by("-timestamp")
            for history in histories:
                historyList.append(BookController.history_to_dict(history))
            return historyList
        else:
            return None
    
    @staticmethod
    def history_to_dict(history):
        date = history.timestamp + datetime.timedelta(hours=9) # タイムゾーン反映
        deadline = date + datetime.timedelta(weeks=2)
        data = {
            "id": history.id,
            "username": history.user.username,
            "name": "{0} {1}".format(history.user.last_name, history.user.first_name),
            "email": history.user.email,
            "phone": history.user.phone_number,
            "book_id": history.book.id,
            "control_number": history.book.control_number,
            "title": history.book.title,
            "category": history.book.category.name,
            "publisher": history.book.publisher,
            "process": ("貸出", "返却")[int(history.action)],
            "timestamp": date.strftime("%Y/%m/%d"),
            "deadline": (deadline.strftime("%Y/%m/%d"), "-")[int(history.action)]
        }
        return data
    
    @staticmethod
    def deactivate(book_id):
        """図書の廃棄（無効化）
        
        Args:
            book_id (int): 図書ID
        
        Returns:
            str, bool: 応答メッセージ, 成功したかどうか
        """
        message = None
        success = None
        if (models.Book.objects.filter(id=book_id).count() == 1):
            book = models.Book.objects.get(id=book_id)
            book.is_active = False
            book.save()
            message = "図書の廃棄処理を行いました"
            success = True
        else:
            message = "IDの一致する図書が存在しません"
            success = False
        return message, success
    
    @staticmethod
    def activate(book_id):
        """図書の復元（有効化）
        
        Args:
            book_id (int): 図書ID
        
        Returns:
            str, bool: 応答メッセージ, 成功したかどうか
        """
        message = None
        success = None
        if (models.Book.objects.filter(id=book_id).count() == 1):
            book = models.Book.objects.get(id=book_id)
            book.is_active = True
            book.save()
            message = "図書の廃棄処理を行いました"
            success = True
        else:
            message = "IDの一致する図書が存在しません"
            success = False
        return message, success
    
    @staticmethod
    def book_ids_to_str(book_ids):
        books = []
        for book_id in book_ids:
            books.append(models.Book.objects.get(id=book_id))
        books_str = ""
        for book in books:
            books_str += "[{0}] {1} ({2})\n".format(book.control_number, book.title, book.publisher)
        return books_str

class CommController(object):
    @staticmethod
    def get_posted_data(request):
        """POSTで受信したデータをPython用に変換して返却
        
        Args:
            request (HttpRequest): HttpRequest．
        
        Returns:
            dict: 辞書型に変換したデータ
        """
        data = None
        if request.is_ajax():
            data = json.loads(request.body)
        else:
            data = request.POST
        return data

class EmailController(object):
    WEEKDAYS = ["月", "火", "水", "木", "金", "土", "日"]

    @staticmethod
    def send_email_borrow(book_ids, user):
        try:
            today = datetime.datetime.now()
            deadline = today + datetime.timedelta(weeks=2)
            user.email_user(
                subject=email_borrow.SUBJECT.format(
                    user.username,
                    "{0} {1}".format(user.last_name, user.first_name)
                ),
                message=email_borrow.MESSAGE.format(
                    user.username,
                    "{0} {1}".format(user.last_name, user.first_name),
                    BookController.book_ids_to_str(book_ids),
                    "{0} ({1})".format(today.strftime("%Y/%m/%d"), EmailController.WEEKDAYS[today.weekday()]),
                    "{0} ({1})".format(deadline.strftime("%Y/%m/%d"), EmailController.WEEKDAYS[deadline.weekday()])
                )
            )
        except Exception as e:
            print(e)
    
    @staticmethod
    def remind():
        borrowList = BookController.get_current_history()
        for borrow in borrowList:
            # 締め切りまでの期間を計算
            deadline = datetime.datetime.strptime(borrow["deadline"], "%Y/%m/%d")
            basedatetime = datetime.datetime.today()
            delta = deadline - basedatetime
            if delta.days < 0:
                # 返却期限を超過している場合
                delta_message = "返却期限を{}日超過しています．".format(-1 * delta.days)
            elif delta.days == 0:
                delta_message = "返却期限当日です．"
            elif delta.days <= 3:
                delta_message = "返却期限が{}日後に迫っています．".format(delta.days)
                # 返却期限が3日以内に迫っている場合
            else:
                # 返却リマインダの送信は不要
                break
            # リマインドメールの送信
            history = models.History.objects.get(id=borrow["id"])
            user = history.user
            book = history.book
            user.email_user(
                subject=email_reminder.SUBJECT.format(
                    user.username,
                    "{0} {1}".format(user.last_name, user.first_name)
                ),
                message=email_reminder.MESSAGE.format(
                    user.username,
                    "{0} {1}".format(user.last_name, user.first_name),
                    delta_message,
                    BookController.book_ids_to_str([book.id]),
                    borrow["timestamp"],
                    borrow["deadline"]
                )
            )
        # リマインダの送信記録
        reminderHistory = models.ReminderHistory()
        reminderHistory.save()
    
    @staticmethod
    def getLatestReminderTimestamp():
        latest = models.ReminderHistory.objects.order_by('-id')
        print(latest.count())
        if (latest.count() > 0):
            return (latest[0].timestamp + datetime.timedelta(hours=9)).strftime("%Y/%m/%d-%H:%M")
        else:
            return None

class NoticeController(object):
    @staticmethod
    def get_all_notices():
        notices = []
        noticeSet = models.Notice.objects.all()
        if noticeSet.count() > 0:
            for notice in noticeSet:
                notices.append({
                    "notice_id": notice.id,
                    "content": notice.content.replace("\r", "").replace("\n", "/"),
                    "is_important": ("重要" if notice.is_important else "通常")
                })
        return notices
    
    @staticmethod
    def delete_notice(notice_id):
        if (models.Notice.objects.filter(id=notice_id).count() == 1):
            notice = models.Notice.objects.get(id=notice_id)
            notice.delete()
            return "削除しました．"
        else:
            return "該当するお知らせはありません．"
    
    @staticmethod
    def get_notice_tags(importance):
        notices = []
        noticeSet = models.Notice.objects.all()
        print(noticeSet.count())
        if noticeSet.count() > 0:
            for notice in noticeSet:
                if notice.is_important == importance:
                    notices.append(notice.content.replace("\r", "").replace("\n", "_plus_"))
        return notices