# Generated by Django 2.2 on 2019-04-21 04:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=32)),
                ('post_detail', models.TextField(default='')),
                ('request_num', models.IntegerField(default=0)),
                ('accept_num', models.IntegerField(default=0)),
                ('deadline', models.DateField(auto_now_add=True)),
                ('post_time', models.DateTimeField(auto_now_add=True)),
                ('if_end', models.BooleanField(default=False)),
                ('poster', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.User')),
            ],
            options={
                'ordering': ['post_time'],
            },
        ),
        migrations.CreateModel(
            name='Apply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(default='waiting', max_length=32)),
                ('c_time', models.DateTimeField(auto_now_add=True)),
                ('applicant', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.User')),
                ('post', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='demand.Post')),
                ('resume', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='user.Resume')),
            ],
            options={
                'ordering': ['c_time'],
            },
        ),
    ]
