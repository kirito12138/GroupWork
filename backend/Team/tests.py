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

class GetInvitation1(TestCase):
    def setUp(self):
        self.inviter_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.inviter_2 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.invitee = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.invitation_1 = Invitation.objects.create(inviter=self.inviter_1, invitee=self.invitee)
        self.invitation_2 = Invitation.objects.create(inviter=self.inviter_2, invitee=self.invitee, state=1)
        self.token = create_token(self.invitee.id)
        self.url = '/mcm/invitations/received/'

    def test_success(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 2)
        self.assertEqual(ret_data[0]['team_id'], self.invitee.mcm_info.team_id)
        self.assertEqual(ret_data[1]['id'], self.inviter_1.id)
        self.assertEqual(ret_data[1]['name'], self.inviter_1.name)

    def test_fail_1(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.get(
            self.url
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3(self):
        self.invitee.mcm_info.delete()
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

class GetInvitation2(TestCase):
    def setUp(self):
        self.inviter = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee_1 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.invitee_2 = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.invitee_3 = create_user('004', gen_md5('004', SECRET_KEY), '004', 3)
        self.invitation_1 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_1)
        self.invitation_2 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_2, state=1)
        self.invitation_2 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_3, state=2)
        self.token = create_token(self.inviter.id)
        self.url = '/mcm/invitations/send/'

    def test_success(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()







