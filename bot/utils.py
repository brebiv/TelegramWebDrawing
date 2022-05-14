from telebot.types import CallbackQuery, Message


from . import models
from .models import User


def user_handler(function):
    def wrapper(message):
        if isinstance(message, Message):
            try:
                user = models.User.objects.get(user_id=message.from_user.id)
                if user.ban:
                    return
                # if user.user_id = ''
            except models.User.DoesNotExist:
                user = models.User(
                    user_id=message.from_user.id,
                    username=message.from_user.username,
                    first_name=message.from_user.first_name,
                    last_name=message.from_user.last_name,
                    language=message.from_user.language_code or '?'
                )
            else:
                user.username = message.from_user.username
                user.first_name = message.from_user.first_name
                user.last_name = message.from_user.last_name
                user.language = message.from_user.language_code
            finally:
                user.save()
            return function(message, user)
        elif isinstance(message, CallbackQuery):
            call: CallbackQuery = message
            try:
                user = models.User.objects.get(user_id=call.from_user.id)
                if user.ban:
                    return
            except models.User.DoesNotExist:
                user = models.User(
                    user_id=call.from_user.id,
                    username=call.from_user.username,
                    first_name=call.from_user.first_name,
                    last_name=call.from_user.last_name,
                    language=call.from_user.language_code or '?'
                )
            else:
                user.username = call.from_user.username
                user.first_name = call.from_user.first_name
                user.last_name = call.from_user.last_name
                user.language = call.from_user.language_code
            finally:
                user.save()
            return function(call, user)
    return wrapper


# def event_block_handler(bot: TeleBot):
#     def decorator(function):
#         def wrapper(message, user: User):
#             try:
#                 game: Game = user.games.get(finished=None)
#                 text = texts.Text.get_text(user.lang_code)
#                 unresolved_event = game.active_event()
#                 if unresolved_event:
#                     bot.send_message(user.user_id, text.RESOLVE_EVENT)
#                     event = get_event_by_type(unresolved_event.type)
#                     event(unresolved_event.pk).send(user, bot, game)
#                     return
#             except Game.DoesNotExist:
#                 pass
#             return function(message, user)
#         return wrapper
#     return decorator


# def generate_progress_bar(value: int, max=10, foreground="🟩", background="⬜️", color_steps=True) -> str:
#     progress_bar = ""
#     for i in range(max):
#         if i < value:
#             if color_steps:
#                 if value < 3:
#                     foreground = "🟥"
#                 elif 3 <= value < 5:
#                     foreground = "🟧"

#             progress_bar += foreground
#         else:
#             progress_bar += background
#     return progress_bar


# def get_year_variant(x: int) -> str:
#     if x % 10 == 1 and x!=11 and x%100!=11:
#         return "год"
#     elif 1 < x % 10 <= 4 and x!=12 and x!=13 and x!=14:
#         return "года"
#     else:
#         return "лет"
