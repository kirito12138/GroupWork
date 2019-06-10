from django.test import TestCase
from Team.models import Invitation, McmInfo, Team
from user.models import User
from backend.settings import SECRET_KEY
from user.views import gen_md5
from user.jwt_token import create_token

def create_team():
    return Team.objects.create()

def create_mcm_info(name):
    return McmInfo.objects.create(
        name=name,
        team=create_team(),
        is_captain=True
    )

def create_user(account, password, name, score):
    return User.objects.create(
        account=account,
        password=password,
        name=name,
        mcm_info=create_mcm_info(name),
        score=score
    )

class InviteUserTest(TestCase):
    def setUp(self):
        self.inviter = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.token = create_token(self.inviter.id).decode()
        self.url = 'mcm/invite/'

    def test_invite_success(self):
        response = self.client.get(
            self.url + self.invitee.id + '/',
            HTTP_AUTHORIZATION=self.token
        )

