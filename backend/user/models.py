from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db import models


class User(models.Model):
    account = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=64, blank=True)
    name = models.CharField(max_length=32, blank=True)
    age = models.IntegerField(default=0)
    student_id = models.CharField(max_length=32, blank=True)
    sex = models.CharField(max_length=32, blank=True)
    major = models.CharField(max_length=64, blank=True)
    grade = models.CharField(max_length=32, blank=True)
    resume = models.OneToOneField('Resume', on_delete=models.SET_NULL, null=True, blank=True)
    c_time = models.DateTimeField(auto_now_add=True)  # 保存用户创建时间
    open_id = models.CharField(max_length=256, default='', blank=True)
    avatar_url = models.CharField(max_length=256, default='img/avatar/default.jpg', blank=True)

    def __str__(self):
        return self.account

    class Meta:
        ordering = ["c_time"]


class Resume(models.Model):
    name = models.CharField(max_length=20, blank=True)
    sex = models.CharField(max_length=20, blank=True)
    age = models.IntegerField(default=0)  # 0-200
    degree = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    city = models.CharField(max_length=120, blank=True)
    awards = models.TextField(blank=True)
    english_skill = models.TextField(blank=True)
    edu_exp = models.TextField(blank=True)
    project_exp = models.TextField(blank=True)
    self_review = models.TextField(blank=True)

    def __str__(self):
        return self.name

    def clean(self):
        if type(self.age) != int or self.age < 0 or self.age > 200:
            raise ValidationError(_('age is not int or is out of range.'))
