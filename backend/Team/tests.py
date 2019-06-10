from django.test import TestCase
from Team.models import Invitation, McmInfo, Team
from user.models import User, Resume
from backend.settings import SECRET_KEY
from user.views import gen_md5
from user.jwt_token import create_token


def create_team():
    return Team.objects.create(name='')


def create_mcm_info(name, score):
    return McmInfo.objects.create(
        name=name,
        major='',
        undergraduate_major='',
        phone='',
        email=name+'@mail.com',
        experience='',
        skill='',
        if_attend_training=True,
        goal='',
        is_integrated=True,
        team=create_team(),
        is_captain=True,
        score=score,
    )


def create_user(account, password, name, score):
    return User.objects.create(
        account=account,
        password=password,
        name=name,
        age=21,
        student_id='',
        sex='male',
        major='',
        grade='',
        resume=create_resume('name'),
        mcm_info=create_mcm_info(name, score)
    )


def create_resume(key):
    return Resume.objects.create(
        name=key,
        sex=key,
        age=21,
        degree=key,
        phone=key,
        email=key + '@mail.com',
        city=key,
        edu_exp="", awards = "hah",
        english_skill = "most", project_exp = "", self_review = ""
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

class InviteeGetInvitationTest(TestCase):
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

class InviterGetInvitationTest(TestCase):
    def setUp(self):
        self.inviter = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee_1 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.invitee_2 = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.invitee_3 = create_user('004', gen_md5('004', SECRET_KEY), '004', 3)
        self.invitation_1 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_1)
        self.invitation_2 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_2, state=1)
        self.invitation_3 = Invitation.objects.create(inviter=self.inviter, invitee=self.invitee_3, state=2)
        self.token = create_token(self.inviter.id)
        self.url = '/mcm/invitations/send/'

    def test_success(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 3)

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
            self.url,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

class AcceptInvitationTest(TestCase):
    def setUp(self):
        self.inviter_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.user_1 = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.user_2 = create_user('004', gen_md5('004', SECRET_KEY), '004', 4)
        self.invitation_1 = Invitation.objects.create(inviter=self.inviter_1, invitee=self.invitee)
        self.token = create_token(self.invitee.id)
        self.url = '/mcm/accept/'

    def test_success_1(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        new_invitee = User.objects.get(id=self.invitee.id)
        new_invitation = Invitation.objects.get(id=self.invitation_1.id)
        self.assertEqual(new_invitee.mcm_info.is_captain, False)
        self.assertEqual(new_invitee.mcm_info.team_id, self.inviter_1.mcm_info.team_id)
        self.assertEqual(new_invitation.state, 1)

    def test_success_2(self):
        self.user_1.mcm_info.team = self.invitee.mcm_info.team
        self.user_2.mcm_info.team = self.invitee.mcm_info.team
        self.invitee.mcm_info.is_captain = False
        self.user_2.mcm_info.is_captain = False
        self.invitee.mcm_info.save()
        self.user_1.mcm_info.save()
        self.user_2.mcm_info.save()
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        new_invitee = User.objects.get(id=self.invitee.id)
        new_invitation = Invitation.objects.get(id=self.invitation_1.id)
        self.assertEqual(new_invitee.mcm_info.is_captain, False)
        self.assertEqual(new_invitee.mcm_info.team_id, self.inviter_1.mcm_info.team_id)
        self.assertEqual(new_invitation.state, 1)

    def test_fail_1(self):
        response = self.client.post(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id + 10) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_2(self):
        self.user_1.mcm_info.team = self.inviter_1.mcm_info.team
        self.user_2.mcm_info.team = self.inviter_1.mcm_info.team
        self.user_1.mcm_info.is_captain = False
        self.user_2.mcm_info.is_captain = False
        self.user_1.mcm_info.save()
        self.user_2.mcm_info.save()
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

    def test_fail_4(self):
        self.user_1.mcm_info.team = self.invitee.mcm_info.team
        self.user_2.mcm_info.team = self.invitee.mcm_info.team
        self.user_1.mcm_info.is_captain = False
        self.user_2.mcm_info.is_captain = False
        self.user_1.mcm_info.save()
        self.user_2.mcm_info.save()
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 4)

class RefuseInvitationTest(TestCase):
    def setUp(self):
        self.inviter_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.invitee = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.invitation_1 = Invitation.objects.create(inviter=self.inviter_1, invitee=self.invitee)
        self.token = create_token(self.invitee.id)
        self.url = '/mcm/refuse/'

    def test_success(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        new_invitation = Invitation.objects.get(id=self.invitation_1.id)
        self.assertEqual(ret_data['ret'], True)
        self.assertEqual(new_invitation.state, 2)

    def test_fail_1(self):
        response = self.client.post(
            self.url + str(self.invitation_1.id) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id) + '/'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3(self):
        response = self.client.get(
            self.url + str(self.invitation_1.id + 10) + '/',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

class ModifyMcmInfoTest(TestCase):
    data_correct = {
        'name': '002',
        'major': '002',
        'undergraduate_major': '002',
        'phone': '002',
        'email': '001@mail.com',
        'experience': '002',
        'skill': 'skill',
        'if_attend_training': True,
        'goal': '002',
    }
    data_wrong_1 = {
        'name': '002',
        'major': '002',
        'undergraduate_major': '002',
        'phone': '002',
        'email': '002@mail.com',
        'experience': '002',
        'skill': 'skill',
        'goal': '002',
    }
    data_wrong_2 = {
        'name': '002',
        'major': '002',
        'undergraduate_major': '002',
        'phone': '002',
        'email': '001',
        'experience': '002',
        'skill': 'skill',
        'if_attend_training': True,
        'goal': '002',
    }

    def setUp(self):
        self.user = create_user('001', gen_md5('001', SECRET_KEY), '001', 3)
        self.token = create_token(self.user.id)
        self.url = '/mcm/modify/info/'

    def test_success(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_correct,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        new_user_info = User.objects.get(id=self.user.id)
        self.assertEqual(new_user_info.resume.name, self.data_correct['name'])
        self.assertEqual(new_user_info.mcm_info.name, self.data_correct['name'])

    def test_fail_1(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.post(
            self.url,
            data=self.data_correct,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3_1(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_3_2(self):
        self.user.resume.delete()
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_wrong_2,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_2(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_wrong_1,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

class GetMcmInfoTest(TestCase):
    def setUp(self):
        self.user_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.user_2 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.token = create_token(self.user_1.id)
        self.url = '/mcm/get/info/'

    def test_success(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        self.assertEqual(ret_data['name'], self.user_1.name)

    def test_fail_1(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_2(self):
        response = self.client.get(
            self.url,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

class SearchUserTest(TestCase):
    def setUp(self):
        self.users = []
        for i in range(50):
            self.users.append(create_user(str(i+1), gen_md5(str(i+1), SECRET_KEY), str(i+1), (i+1) * 2))
        self.token = create_token(self.users[0].id)
        self.url = '/mcm/search/user/'

    def test_success_1(self):
        response = self.client.get(
            self.url + '?name=' + self.users[10].name,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data[0]['name'], self.users[10].name)
        self.assertEqual(ret_data[0]['user_id'], str(self.users[10].id))

    def test_success_2(self):
        Invitation.objects.create(inviter=self.users[0], invitee=self.users[10])
        response = self.client.get(
            self.url + '?name=1',
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 12)

    def test_fail_1(self):
        response = self.client.post(
            self.url + '?name=' + self.users[10].name,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.get(
            self.url + '?name=' + self.users[10].name,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_2(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

class GetTeamUsersTest(TestCase):
    def setUp(self):
        self.user_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.user_2 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.user_3 = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.user_2.mcm_info.team = self.user_1.mcm_info.team
        self.user_3.mcm_info.team = self.user_1.mcm_info.team
        self.user_2.mcm_info.is_captain = False
        self.user_3.mcm_info.is_captain = False
        self.user_2.mcm_info.save()
        self.user_3.mcm_info.save()
        self.token = create_token(self.user_1.id)
        self.url = '/mcm/team/'

    def test_success(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 3)

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

    def test_fail_2(self):
        self.user_1.mcm_info.is_integrated = False
        self.user_1.mcm_info.save()
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

class QuitTeamTest(TestCase):
    def setUp(self):
        self.user_1 = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.user_2 = create_user('002', gen_md5('002', SECRET_KEY), '002', 2)
        self.user_3 = create_user('003', gen_md5('003', SECRET_KEY), '003', 3)
        self.user_2.mcm_info.team = self.user_1.mcm_info.team
        self.user_3.mcm_info.team = self.user_1.mcm_info.team
        self.user_2.mcm_info.is_captain = False
        self.user_3.mcm_info.is_captain = False
        self.user_2.mcm_info.save()
        self.user_3.mcm_info.save()
        self.token_1 = create_token(self.user_1.id)
        self.token_2 = create_token(self.user_2.id)
        self.url = '/mcm/quit/'

    def test_success(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token_2
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)

    def test_fail_1(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token_2
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.post(
            self.url
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_2(self):
        self.user_2.mcm_info.is_integrated = False
        self.user_2.mcm_info.save()
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token_2
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

    def test_fail_3(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token_1
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

class SubmitScoreTest(TestCase):
    data_correct = {
        'score': 10,
    }
    data_wrong_1 = {
        'score': -10,
    }
    data_wrong_2 = {
        'score': '10',
    }

    def setUp(self):
        self.user = create_user('001', gen_md5('001', SECRET_KEY), '001', 1)
        self.token = create_token(self.user.id)
        self.url = '/mcm/score/'

    def test_success(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_correct,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], True)
        new_user_info = User.objects.get(id=self.user.id)
        self.assertEqual(new_user_info.mcm_info.score, self.data_correct['score'])

    def test_fail_1(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 1)

    def test_fail_5(self):
        response = self.client.post(
            self.url,
            data=self.data_correct,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 5)

    def test_fail_3(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)

    def test_fail_2(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data={},
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

    def test_fail_4_1(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_wrong_1,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 4)

    def test_fail_4_2(self):
        response = self.client.post(
            self.url,
            HTTP_AUTHORIZATION=self.token,
            data=self.data_wrong_2,
            content_type='application/json'
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 4)

class MatchUsersTest(TestCase):
    def setUp(self):
        self.users = []
        for i in range(50):
            self.users.append(create_user(str(i+1), gen_md5(str(i+1), SECRET_KEY), str(i+1), (i+1) * 2))
        self.token = create_token(self.users[20].id)
        self.token_2 = create_token(self.users[0].id)
        self.url = '/mcm/match/'

    def test_success_1(self):
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 15)

    def test_success_2(self):
        Invitation.objects.create(inviter=self.users[0],invitee=self.users[1])
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token_2
        )
        ret_data = response.json()
        self.assertEqual(len(ret_data), 15)
        self.assertEqual(ret_data[0]['user_id'], str(self.users[2].id))

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

    def test_fail_2(self):
        self.users[20].mcm_info.is_integrated = False
        self.users[20].mcm_info.save()
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 2)

    def test_fail_3(self):
        self.users[20].mcm_info.score = -1
        self.users[20].mcm_info.save()
        response = self.client.get(
            self.url,
            HTTP_AUTHORIZATION=self.token
        )
        ret_data = response.json()
        self.assertEqual(ret_data['ret'], False)
        self.assertEqual(ret_data['error_code'], 3)











