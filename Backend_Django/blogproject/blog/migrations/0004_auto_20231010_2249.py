# Generated by Django 2.2.28 on 2023-10-10 17:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20231010_2116'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='Confirm_password',
            new_name='confirm_password',
        ),
    ]