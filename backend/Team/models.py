from django.db import models

class Invitation(models.Model):
    inviter = models.ForeignKey('user.User', on_delete=models.CASCADE)
    invitee = models.ForeignKey('user.User', on_delete=models.CASCADE)
    state = models.SmallIntegerField(default=0)

    def __str__(self):
        if self.state == 1:
            return str(self.inviter_id) + '->' + str(self.invitee_id) + ':accepted'
        elif self.state == 2:
            return str(self.inviter_id) + '->' + str(self.invitee_id) + ':refused'
        return str(self.inviter_id) + '->' + str(self.invitee_id) + ':unhandled'

