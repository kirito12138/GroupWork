# Generated by Django 2.2 on 2019-04-10 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('demand', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='request_num',
            field=models.IntegerField(default=0),
        ),
    ]
