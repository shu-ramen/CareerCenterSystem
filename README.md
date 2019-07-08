# CareerCenterSystem
キャリア支援センター用システム

# Required Environments
## Python
* Python 3.6
* Django 2.2.1
* numpy  1.16.2
* [TODO] pip install schedule
* [TODO] https://github.com/Lalcs/jpholiday
## Anaconda
* Anaconda 2019.03 (https://www.anaconda.com/)
## npm (NodeJS)
* npm      6.9.0   (https://nodejs.org/ja/)
## Visual Studio Code
* VSCode   1.36.0  (https://code.visualstudio.com/)
## Git for Windows
* Git      2.22.0  (https://gitforwindows.org/)

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
