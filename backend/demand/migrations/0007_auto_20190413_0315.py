# Generated by Django 2.2 on 2019-04-13 03:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demand', '0006_auto_20190412_1953'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apply',
            name='resume',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.Resume'),
        ),
    ]
