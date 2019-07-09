# CareerCenterSystem
キャリア支援センター用システム

# Required Environments
## Download URL
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

## How to install applications

### Anaconda
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/1.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/2.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/3.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/4.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/5.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/6.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/7.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/8.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Anaconda/9.png" width="480px" />

### VSCode
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/1.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/2.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/3.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/4.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/5.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/6.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/VSCode/7.png" width="480px" />

### Git
警告が出る <br />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/1.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/2.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/3.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/4.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/5.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/6.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/7.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/8.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/9.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/10.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/11.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/12.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/Git/13.png" width="480px" />

### npm(NodeJS)
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/1.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/2.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/3.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/4.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/5.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/6.png" width="480px" />
<img src="https://github.com/shu-ramen/CareerCenterSystem/blob/master/howto/NodeJS/7.png" width="480px" />

## How to create anaconda environment
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

## How to run
```
cd home\of\git\local\
git clone https://github.com/shu-ramen/CareerCenterSystem.git
cd CareerCenterSystem
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
python magage.py runserver react
```

## src/CareerCenterSystem/CareerCenterSystem/emailsettings.py
```
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'your_account@gmail.com'
EMAIL_HOST_PASSWORD = 'your_password'
EMAIL_PORT = 587
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
```
