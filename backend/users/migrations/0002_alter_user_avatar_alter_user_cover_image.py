# Generated by Django 4.2.5 on 2023-10-03 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='user1.png', upload_to=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='cover_image',
            field=models.ImageField(default='cover1.png', upload_to=''),
        ),
    ]
