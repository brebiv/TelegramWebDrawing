# Generated by Django 4.0.4 on 2022-04-29 09:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bot', '0003_alter_user_drawing'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='drawing_save_data',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]