# CareerCenterSystem
キャリア支援センター用システム

# 必要環境
## 環境構築用インストーラー
* https://drive.google.com/open?id=1MtGm2QAGHPBcG2pIJE4FJ-uWAD-p6Wm0
## Python
* Python 3.6
* Django 2.2.1
* numpy  1.16.2
* [TODO] https://github.com/Lalcs/jpholiday
## Anaconda
* Anaconda 2019.03 (https://www.anaconda.com/)
## npm (NodeJS)
* npm      6.9.0   (https://nodejs.org/ja/)
## Visual Studio Code
* VSCode   1.36.0  (https://code.visualstudio.com/)
## Git for Windows
* Git      2.22.0  (https://gitforwindows.org/)

## 環境構築
* ダウンロード用URLからインストーラーをすべてダウンロードする
### Anaconda
* Anacondaのインストーラーを起動する．
* Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/1.png" width="480px" />

* I Agreeをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/2.png" width="480px" />

* Just Meを選択した状態でNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/3.png" width="480px" />

* 初期設定のままNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/4.png" width="480px" />

* Add Anaconda to my PATH environment variableにチェックを入れ，Installをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/5.png" width="480px" />

* インストール完了まで待機する
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/6.png" width="480px" />

* インストール完了したらNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/7.png" width="480px" />

* Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/8.png" width="480px" />

* すべてのチェックを外してFinishをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/9.png" width="480px" />

### VSCode
* VSCodeのインストーラーを起動する
* 同意するを選択し，次へをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/1.png" width="480px" />

* 初期設定のまま，次へをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/2.png" width="480px" />

* 初期設定のまま，次へをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/3.png" width="480px" />

* デスクトップ上にアイコンを作成するをチェックし，次へをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/4.png" width="480px" />

* インストールをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/5.png" width="480px" />

* インストール完了まで待機する
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/6.png" width="480px" />

* チェックを外して完了をクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/7.png" width="480px" />

### Git（Gitを使わない場合は飛ばして良い）
* Gitのインストーラーを起動する
* 警告が出るが，はいをクリックして続行する
* Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/1.png" width="480px" />

* 初期設定のままNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/2.png" width="480px" />

* 画面と同じようにチェックを行い，Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/3.png" width="480px" />

* 初期設定のままNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/4.png" width="480px" />

* Use Visual Studio Code as Git's default editorを選択してNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/5.png" width="480px" />

* Git from the command line and also from 3rd-party softwareを選択してNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/6.png" width="480px" />

* Use the OpenSSL libraryを選択してNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/7.png" width="480px" />

* Checkout as-is, commit as-isを選択してNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/8.png" width="480px" />

* Use MinTTY(the default terminal of MSY2)を選択してNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/9.png" width="480px" />

* 画面と同じようにチェックを行い，Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/10.png" width="480px" />

* チェックはせずにInstallをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/11.png" width="480px" />

* インストール完了まで待機する
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/12.png" width="480px" />

* すべてのチェックを外してFinishをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/13.png" width="480px" />

### npm(NodeJS)
* NodeJSのインストーラーを起動する
* Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/1.png" width="480px" />

* I accept the terms in the License Agreementにチェックを入れてNextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/2.png" width="480px" />

* 初期設定のまま，Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/3.png" width="480px" />

* 初期設定のまま，Nextをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/4.png" width="480px" />

* Installをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/5.png" width="480px" />

* インストール完了まで待機する
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/6.png" width="480px" />

* Finishをクリックする
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/7.png" width="480px" />

### 再起動
* 以上のインストールが全て完了した段階で一度パソコンの再起動を行う

## Anaconda環境（プログラム実行環境）の作り方
* Visual Studio Codeを起動する
* Ctrl+@を押す（すると，Visual Studio Codeの下部に黒い画面が開く．）
* 以下のコマンドは上記操作で開いた黒い画面上で行う．
```
conda update -n base conda
# Proceed ([y]/n)? y
conda create -n webdev python=3.6 anaconda
# Proceed ([y]/n)? y
conda activate webdev
conda install django==2.2.1
# Proceed ([y]/n)? y
conda install -c anaconda sqlparse==0.3.0
# Proceed ([y]/n)? y
conda install -c conda-forge apscheduler
```

## ファイルの解凍（Gitを使う場合は飛ばして良い）
* CareerCenterSystem.zipを解凍する
* 解凍したファイルをVisualStudioCodeから開く（「ファイル」→「フォルダーを開く...」で解凍したファイルを選択する．）
* 開いた状態でCtrl+@をする．

## プログラムの初期設定
* cdとは：ディレクトリ（フォルダ）の移動．すなわち画面上でフォルダをダブルクリックしているのに等しい．
```
cd home\of\git\local（Gitを使わない場合はこの操作は行わない）
git clone https://github.com/shu-ramen/CareerCenterSystem.git（Gitを使わない場合はこの操作は行わず，解凍したZipファイルを使う．）
cd CareerCenterSystem（Gitを使わない場合はこの操作は行わない，ここが解凍したファイルの先頭と同じになる．ただし，一つ上の階層になっている場合は行う．）
cd src
cd CareerCenterSystem
cd resources
cd react_jsx
npm install
cd ..
cd ..
conda activate webdev
python manage.py migrate
python manage.py createsuperuser
# ユーザー名: ログインに使うユーザー名
# 名: 名前
# 姓: 苗字
# First name kana: 名前（かな）
# Last name kana: 苗字（かな）
# メールアドレス: メールアドレス
# Phone number: 電話番号
# Password: パスワード
# Password (again): パスワード（確認）
```

## 起動（2回目以降はこの操作のみ）
```
（必要であればcdコマンドでmanage.pyがある階層まで移動）
python magage.py runserver react
```

## src/CareerCenterSystem/CareerCenterSystem/emailsettings.py
* Gmailの場合
```
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'your_account@gmail.com'
DEFAULT_FROM_EMAIL = ''
EMAIL_HOST_PASSWORD = 'your_password'
EMAIL_PORT = 587
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```
* 独自サーバー（SMTP）の場合
```
EMAIL_USE_TLS = True or False
EMAIL_HOST = 'サーバーのホスト名'
EMAIL_HOST_USER = ''
DEFAULT_FROM_EMAIL = 'メールアドレス'
EMAIL_HOST_PASSWORD = ''
EMAIL_PORT = サーバーのポート番号
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```
