from django.db import models


class Invitation(models.Model):
    inviter = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='invitations_sent')
    invitee = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='invitations_received')
    state = models.SmallIntegerField(default=0)

    def __str__(self):
        if self.state == 1:
            return str(self.inviter_id) + '->' + str(self.invitee_id) + ':accepted'
        elif self.state == 2:
            return str(self.inviter_id) + '->' + str(self.invitee_id) + ':refused'
        return str(self.inviter_id) + '->' + str(self.invitee_id) + ':unhandled'


class Team(models.Model):
    name = models.CharField(max_length=40, blank=True)  # 队名


class McmInfo(models.Model):
    name = models.CharField(max_length=20)
    major = models.CharField(max_length=64)
    undergraduate_major = models.CharField(max_length=64)
    phone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254)
    experience = models.TextField()
    skill = models.CharField(max_length=32)  # 本人能力侧重(建模，编程，写作)
    if_attend_training = models.BooleanField(default=False)
    goal = models.CharField(max_length=128)

    score = models.IntegerField(default=-1)  # -1代表没填问卷，没有分数
    team = models.ForeignKey('Team', on_delete=models.SET_NULL, null=True, blank=True)  # 初始状态每个人都指定一个队，这人也是该队队长
    is_captain = models.BooleanField(default=True)
