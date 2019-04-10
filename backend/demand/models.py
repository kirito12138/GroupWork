from django.db import models


class Post(models.Model):
    title = models.CharField(max_length=32)
    post_detail = models.TextField()
    request_num = models.IntegerField()
    accept_num = models.IntegerField(default=0)
    deadline = models.DateField()
    post_time = models.DateTimeField(auto_now_add=True)  # 发布时间，会自动添加
    if_end = models.BooleanField(default=False)
    poster = models.ForeignKey('user.User', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["post_time"]
