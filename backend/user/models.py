from django.db import models


class User(models.Model):
    account = models.CharField(max_length=32, unique=True)
    password = models.CharField(max_length=64)
    name = models.CharField(max_length=32)
    age = models.IntegerField(default=0)
    student_id = models.CharField(max_length=32)
    sex = models.CharField(max_length=32)
    major = models.CharField(max_length=64)
    grade = models.CharField(max_length=32)
    c_time = models.DateTimeField(auto_now_add=True)  # 保存用户创建时间

    def __str__(self):
        return self.account

    class Meta:
        ordering = ["c_time"]
