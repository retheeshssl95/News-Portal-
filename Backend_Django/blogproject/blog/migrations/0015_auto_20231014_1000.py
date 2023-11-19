# Generated by Django 2.2.28 on 2023-10-14 04:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0014_remove_comment_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='content',
            new_name='comment',
        ),
        migrations.AddField(
            model_name='comment',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
