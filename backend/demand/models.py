import os

from django.db import models

from backend.settings import MEDIA_ROOT


def resume_file_path(instance, filename):
    # 文件上传到MEDIA_ROOT/resume/<filename>目录中
    return 'resume/{0}.{1}'.format(instance.id, filename.split('.')[-1])


def post_image_path(instance, filename):
    # 图片上传到MEDIA_ROOT/img/post/<filename>目录中
    return 'img/post/{0}.{1}'.format(instance.id, filename.split('.')[-1])


class Post(models.Model):
    title = models.CharField(max_length=32)
    post_detail = models.TextField(blank=True)
    request_num = models.IntegerField(default=0)
    accept_num = models.IntegerField(default=0)
    deadline = models.DateField(auto_now_add=True)
    post_time = models.DateTimeField(auto_now_add=True)  # 发布时间，会自动添加
    if_end = models.BooleanField(default=False)
    poster = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(max_length=256, upload_to=post_image_path,
                              default=os.sep.join([MEDIA_ROOT, 'img/post/example/1.jpg']))

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["post_time"]


class Apply(models.Model):
    resume = models.OneToOneField('user.Resume', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=32, default='waiting')  # waiting(待定) accepted(接受), closed(结束)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, null=True, blank=True)
    applicant = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
    c_time = models.DateTimeField(auto_now_add=True)  # 申请时间，会自动添加

    class Meta:
        ordering = ["c_time"]


class Label(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    label = models.IntegerField(default=0)

    def __str__(self):
        return '(' + str(self.post_id) + ',' + str(self.label) + ')'
