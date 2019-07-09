from apscheduler.schedulers.background import BackgroundScheduler
from library.backend.controller import EmailController as EmailCtrl

def start():
    bgScheduler = BackgroundScheduler()
    bgScheduler.add_job(
        EmailCtrl.scheduled_check, 
        "cron",
        hour=15,
        minute=49)
    bgScheduler.start()