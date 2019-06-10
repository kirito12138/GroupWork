from django.test import TestCase
from Team.models import Invitation, McmInfo, Team
from user.models import User
from backend.settings import SECRET_KEY
from user.views import gen_md5
from user.jwt_token import create_token

def create_team():
    return Team.objects.create()

def create_mcm_info(name, score):
    return McmInfo.objects.create(
        name=name,
        team=create_team(),
        is_captain=True,
        score=score
    )

def create_user(account, password, name, score):
    return User.objects.create(
        account=account,
        password=password,
        name=name,
        mcm_info=create_mcm_info(name, score)
    )

class InviteUserTest(TestCase):
    def setUp(self):
        self.inviter = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.teammate = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.teammate.mcm_info.team = self.inviter.mcm_info.team
        self.teammate.mcm_info.is_captain = False
        self.teammate.mcm_info.save()
        self.token = create_token(self.inviter.id)
        self.url = '/mcm/invite/'

    def test_success(self):
        response = self.client.get(
            self.url + str(self.invitee.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        self.assertEqual(Invitation.objects.filter(inviter=self.inviter, invitee=self.invitee).count(), 1)
        response = self.client.get(
            self.url + str(self.invitee.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        self.assertEqual(Invitation.objects.filter(inviter=self.inviter, invitee=self.invitee).count(), 1)


    def test_fail_1(self):
        response = self.client.post(
            self.url + str(self.invitee.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.get(
            self.url + str(self.invitee.id) + '/'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3_3_invitee_not_exist(self):
        response = self.client.get(
            self.url + str(self.invitee.id + 10) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_3_2(self):
        self.invitee.mcm_info.delete()
        response = self.client.get(
            self.url + str(self.invitee.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_4_invitee_is_teammate(self):
        response = self.client.get(
            self.url + str(self.teammate) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 4)




