from django.conf import settings
from flask import Flask
from flask_socketio import SocketIO, emit
# from flask_cors import CORS

import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'drawingbot.settings')
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()


from bot.handlers import bot
from bot.models import User

import json
import base64
from rich import print


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
# CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")



@socketio.on('connect')
def connection_handler():
    print("Connection established")
    # emit('message', {'data': 'Connected', 'user_count': str(User.objects.all().count())})


@socketio.on('message')
def connection_handler(message):
    print("Message: ", message)
    # emit('my response', {'data': 'Connected'})

@socketio.on('canvas_data')
def canvas_data_handler(data):
    print(data)
    user_id = data['user']['id']
    image_base64 = data['data_url']
    canvas_data = data['canvas_data']
    user = User.objects.get(user_id=user_id)
    user.drawing = image_base64
    user.canvas_data = canvas_data
    user.save()
    # image = base64.b64decode(image_base64.split(',')[1])
    # image = base64.b64decode(user.drawing.split(',')[1])
    # bot.send_photo(user.user_id, image, f"Hi, {user.first_name})")
    emit("canvas_load", data, broadcast=True)


if __name__ == '__main__':
    socketio.run(app, '0.0.0.0')
