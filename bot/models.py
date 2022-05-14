from django.db import models
import base64


class User(models.Model):


    RU = 'RU'
    EN = 'EN'

    created = models.DateTimeField(auto_now_add=True)

    # Telegram info
    user_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=256, blank=True, null=True)
    first_name = models.CharField(max_length=256, blank=True, null=True)
    last_name = models.CharField(max_length=256, blank=True, null=True)
    language = models.CharField(max_length=16, blank=True, null=True)
    
    lang_code = models.CharField(max_length=8, blank=True, null=True)

    # drawing = models.ImageField(null=True, blank=True)
    drawing = models.TextField()
    canvas_data = models.TextField()

    ban = models.BooleanField(default=False)

    def decode_image(self):
        return base64.b64decode(self.drawing.split(',')[1])

    def __str__(self):
        return f"{self.user_id} | @{self.username}"


class Player(models.Model):

    ARTIST = "ARTIST"
    GUESSER = "GUESSER"

    ROLES = (
        (ARTIST, "Artist"),
        (GUESSER, "Guesser"),
    )

    user = models.ForeignKey(to='bot.User', related_name='players', on_delete=models.CASCADE)
    role = models.CharField(choices=ROLES, max_length=255, default=GUESSER)
    game = models.ForeignKey(to='bot.Game', related_name='players', on_delete=models.CASCADE)
    # picked_word = models.CharField(max_length=64, null=True, blank=True)
    # target_word = models.CharField(max_length=64, null=True, blank=True)
    drawing = models.ImageField(null=True, blank=True)
    guess = models.CharField(max_length=64, null=True, blank=True)
    guess_score = models.PositiveIntegerField()
    draw_score = models.PositiveIntegerField()

    # kicked = models.BooleanField(default=False)

    # pick_message_id = models.BigIntegerField(null=True, blank=True)
    # guess_message_id = models.BigIntegerField(null=True, blank=True)


class Game(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    started = models.DateTimeField(null=True, blank=True)
    finished = models.DateTimeField(null=True, blank=True)


