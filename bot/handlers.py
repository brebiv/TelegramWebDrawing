from django.conf import settings
import requests

from telebot import TeleBot
from telebot.types import Message

from bot.models import User
from bot.utils import user_handler

from datetime import datetime


bot = TeleBot(settings.TOKEN, parse_mode='HTML')


@bot.message_handler(commands=['start'])
@user_handler
def start_handler(message: Message, user: User):
    chat_id = user.user_id
    chat_id = message.chat.id
    print(f'{datetime.now()} --- {chat_id} --- /start')
    reply_markup = '{"inline_keyboard":[[{"text":"🎨 Рисовать","web_app":{"url":"https://webapp.heytam.net/"}}]]}'
    # url = 
    message_text = "Рисование в Телеграм!"
    requests.get(f'https://api.telegram.org/bot{settings.TOKEN}/sendMessage?chat_id={chat_id}&text={message_text}&reply_markup={reply_markup}')


# @bot.message_handler(commands=['game'])
# @user_handler
# def game_handler(message: Message, user: User):
#     bot.send_message(user.user_id, "<i>Подбор игроков...</i>")


@bot.message_handler(commands=['get_my_image'])
@user_handler
def get_my_image_handler(message: Message, user: User):
    # bot.send_message(user.user_id, "<i>Подбор игроков...</i>")
    bot.send_photo(user.user_id, user.decode_image())

