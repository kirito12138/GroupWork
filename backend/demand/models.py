from django.db import models


def resume_file_path(instance, filename):
    # 文件上传到MEDIA_ROOT/resume/<filename>目录中
    return 'resume/{1}.{2}'.format(instance.id, filename.split('.')[-1])


class Post(models.Model):
    title = models.CharField(max_length=32)
    post_detail = models.TextField(default='')
    request_num = models.IntegerField(default=0)
    accept_num = models.IntegerField(default=0)
    deadline = models.DateField(auto_now_add=True)
    post_time = models.DateTimeField(auto_now_add=True)  # 发布时间，会自动添加
    if_end = models.BooleanField(default=False)
    poster = models.ForeignKey('user.User', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["post_time"]


class Apply(models.Model):
    resume = models.TextField(default='')
    status = models.CharField(max_length=32, default='pending')  # pending(待定) accepted(接受), closed(结束)
    post = models.ForeignKey('Post', on_delete=models.SET_NULL, null=True)
    applicant = models.ForeignKey('user.User', on_delete=models.SET_NULL, null=True)
    c_time = models.DateTimeField(auto_now_add=True)  # 申请时间，会自动添加

    class Meta:
        ordering = ["c_time"]
