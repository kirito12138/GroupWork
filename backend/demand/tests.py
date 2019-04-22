from django.test import TestCase
from demand.models import Post
from user.models import User
from user.jwt_token import create_token
from user.views import gen_md5
from backend.settings import SECRET_KEY
from demand.models import Apply
#===============================ycd========================================================

class GetPostITest(TestCase):
    url = 'a'
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        post = Post.objects.create(title="test",post_detail="test_test",request_num=2,accept_num=1,if_end=True,poster=user)
        self.token = create_token(user.id).decode()
        self.url = '/p/'+str(post.id)+'/'
    
    def test_get_post_detail_successful(self):
        response = self.client.get(self.url,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
    
    def test_get_post_detail_filed_1(self):
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],1)
    
    def test_get_post_detail_filed_2(self):
        response = self.client.get(self.url,HTTP_AUTHORIZATION="self.token")
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],5)

    def test_get_post_detail_filed_3(self):
        url_wrong = '/p/'+str(123)+'/'
        response = self.client.get(url_wrong,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],3)
    
class ModifyPostITest(TestCase):
    url = 'a'
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        user2 =  User.objects.create(account='admin2', password=gen_md5('admin_admin2', SECRET_KEY))  # 数据库中插入用户
        post = Post.objects.create(title="test",post_detail="test_test",request_num=2,accept_num=1,if_end=True,poster=user)
        self.token = create_token(user.id).decode()
        self.token2 = create_token(user2.id).decode()
        self.url = '/p/'+str(post.id)+'/modify/'
    
    def test_modify_post_detail_successful_1(self):
        data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token, data=data, content_type='application/json')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_modify_post_detail_success_2(self):
                data = {
            "title":"a",
            "postDetail":"test_test2",
            "requestNum":1,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
    


    
    def test_modify_post_detail_filed_1(self):
        data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        response = self.client.get(self.url,HTTP_AUTHORIZATION=self.token ,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],1)
    
    def test_modify_post_detail_filed_2(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION="self.token" ,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],5)

    def test_modify_post_detail_filed_3(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        url_wrong = '/p/'+str(123)+'/modify/'
        response = self.client.post(url_wrong,HTTP_AUTHORIZATION=self.token  ,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],4)

    def test_modify_post_detail_filed_4(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token2,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],6)
    
    def test_modify_post_detail_filed_5(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":5,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token,data=data)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],3)

    def test_modify_post_detail_filed_6(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":None,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],2)

    def test_modify_post_detail_filed_7(self):
                data = {
            "title":"test2",
            "postDetail":"test_test2",
            "requestNum":101,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],3)

    
    def test_modify_post_detail_filed_8(self):
                data = {
            "title":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "postDetail":"test_test2",
            "requestNum":10,
        }
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token,data=data, content_type='application/json')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],3)

class GetPostIAppliesTest(TestCase):
    url = 'a'
    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        user2 =  User.objects.create(account='admin2', password=gen_md5('admin_admin2', SECRET_KEY))  # 数据库中插入用户
        post = Post.objects.create(title="test",post_detail="test_test",request_num=2,accept_num=1,if_end=True,poster=user)
        apply = Apply.objects.create(resume=user.resume,post=post,applicant=user2)
        self.token = create_token(user.id).decode()
        self.url = '/p/'+str(post.id)+'/apply/'
    
    def test_get_post_applies_success(self):
        response = self.client.get(self.url,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertEqual(ret_data[0]["applicantID"],uesr2.id)

    def test_get_post_applies_filed_1(self):
        response = self.client.post(self.url,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],1)

    def test_get_post_applies_filed_2(self):
        response = self.client.get(self.url,HTTP_AUTHORIZATION="self.token")
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],5)

    
    def test_get_post_applies_filed_3(self):
        url_wrong = '/p/'+str(123)+'/apply/'
        response = self.client.get(url_wrong,HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'],3)
    
#--------------------------------------------------------------------------------

            
