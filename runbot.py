import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drawingbot.settings')
# os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()


if __name__ == '__main__':
    from bot.handlers import bot
    bot.infinity_polling()
