# Generated by Django 2.2.28 on 2023-10-11 02:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_auto_20231011_0737'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='password1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='password2',
        ),
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]