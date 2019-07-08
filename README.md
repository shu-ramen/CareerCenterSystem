# CareerCenterSystem
キャリア支援センター用システム

# Required Environments
## Python
* Python 3.6
* Django 2.1.7
* numpy  1.16.2
* [TODO] pip install schedule
* [TODO] https://github.com/Lalcs/jpholiday
## Anaconda
* Latest Version (https://www.anaconda.com/)
## npm
* npm    6.9.0   (https://nodejs.org/ja/)

## How to create anaconda environment
```
conda update -n base conda
conda create -n webdev python=3.6 anaconda
conda activate webdev
conda install django
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
conda activate [your environment]
python manage.py migrate
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
