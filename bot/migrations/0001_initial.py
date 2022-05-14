# Generated by Django 4.0.4 on 2022-04-25 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user_id', models.BigIntegerField(unique=True)),
                ('username', models.CharField(blank=True, max_length=256, null=True)),
                ('first_name', models.CharField(blank=True, max_length=256, null=True)),
                ('last_name', models.CharField(blank=True, max_length=256, null=True)),
                ('language', models.CharField(blank=True, max_length=16, null=True)),
                ('lang_code', models.CharField(blank=True, max_length=8, null=True)),
                ('ban', models.BooleanField(default=False)),
            ],
        ),
    ]