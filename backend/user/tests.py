from django.test import TestCase

from jwt_token import create_token
from user.models import User
from user.views import gen_md5
from backend.settings import SECRET_KEY


class LoginViewTests(TestCase):
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))

    def test_login_successful(self):
        data = {'account': 'admin', 'password': 'admin_admin'}
        response = self.client.post('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['ID'], '1')
        self.assertTrue('Token' in ret_data)

    def test_login_failed_1(self):
        data = {'account': 'admin', 'password': 'admin_admin'}
        response = self.client.get('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_login_failed_2(self):
        data = {'account': 'admin'}
        response = self.client.post('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)

    def test_login_failed_3_1(self):
        data = {'account': 'admin', 'password': 'admin_admin'}
        response = self.client.post('/login/', data=data)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_login_failed_3_2(self):
        data = {'account': '1admin', 'password': 'admin_admin'}
        response = self.client.post('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_login_failed_4(self):
        data = {'account': 'admin2', 'password': 'admin_admin'}
        response = self.client.post('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 4)

    def test_login_failed_5(self):
        data = {'account': 'admin', 'password': 'admin123456'}
        response = self.client.post('/login/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)


class RegisterViewTests(TestCase):
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        User.objects.create(account='admin1', password=gen_md5('admin_admin', SECRET_KEY))

    def test_register_successful(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['ID'], '2')
        self.assertTrue('Token' in ret_data)

    def test_register_failed_1(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.get('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_register_failed_2(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)

    def test_register_failed_3_1(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_register_failed_3_2(self):
        data = {'account': 'admin', 'password': 'admin admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_register_failed_3_3(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "abc", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_register_failed_3_4(self):
        data = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": -1,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_register_failed_4(self):
        data = {'account': 'admin1', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
        response = self.client.post('/register/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 4)


class GetLoginStatusViewTests(TestCase):
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))
        self.token = create_token(user.id).decode()

    def test_get_login_status_successful(self):
        response = self.client.get('/GetLoginStatus/', HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_get_login_status_failed_1(self):
        response = self.client.post('/GetLoginStatus/', HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_get_login_status_failed_2(self):
        response = self.client.get('/GetLoginStatus/')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)


class ChangePasswordViewTests(TestCase):
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))
        self.token = create_token(user.id).decode()

    def test_change_password_successful(self):
        data = {'password': 'admin_admin', 'new_password': 'admin_new'}
        response = self.client.post('/my/change_password/', data=data, content_type='application/json',
                                    HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_change_password_failed_1(self):
        data = {'password': 'admin_admin', 'new_password': 'admin_new'}
        response = self.client.get('/my/change_password/', data=data, content_type='application/json',
                                   HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_change_password_failed_2(self):
        data = {'new_password': 'admin_admin_new'}
        response = self.client.post('/my/change_password/', data=data, content_type='application/json',
                                    HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)

    def test_change_password_failed_3_1(self):
        data = {'password': 'admin_admin', 'new_password': 'admin_new'}
        response = self.client.post('/my/change_password/', data=data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_change_password_failed_3_2(self):
        data = {'password': 'admin_admin', 'new_password': 'admin_new_1234567890'}
        response = self.client.post('/my/change_password/', data=data, content_type='application/json',
                                    HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_change_password_failed_4(self):
        data = {'password': 'admin_old', 'new_password': 'admin_new'}
        response = self.client.post('/my/change_password/', data=data, content_type='application/json',
                                    HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 4)

    def test_change_password_failed_5(self):
        data = {'password': 'admin_admin', 'new_password': 'admin_new'}
        response = self.client.post('/my/change_password/', data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)
