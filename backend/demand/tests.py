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


# ===============================lqh========================================================

class GetUserAppliesTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        user2 = User.objects.create(account='admin2', password=gen_md5('admin_admin2', SECRET_KEY))  # 数据库中插入用户
        post = Post.objects.create(title="test", post_detail="test_test", request_num=2, accept_num=1, if_end=True,
                                   poster=user2)
        apply = Apply.objects.create(resume=user.resume, post=post, applicant=user)
        self.token = create_token(user.id).decode()
        self.url = '/my/' + str(user.id) + '/apply/'

    def test_get_user_applies_successful(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_get_user_applies_filed_1(self):
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_get_user_applies_filed_2(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION="self.token")
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)

    def test_get_user_applies_filed_3(self):
        url_wrong = '/my/' + str(123) + 'apply/'
        response = self.client.get(url_wrong, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

class GetUnclosedPostsTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        post = Post.objects.create(title="test", post_detail="test_test", request_num=2, accept_num=1, if_end=False,
                                   poster=user)
        self.token = create_token(user.id).decode()
        self.url = '/f/processing/'

    def test_get_unclosed_posts_successful(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_get_unclosed_posts_filed_1(self):
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_get_unclosed_posts_filed_2(self):
        response = self.client.get(self.url, HTTP_AUTHORIZATION="self.token")
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)

class CreatPostTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='admin', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        post2 = Post.objects.create(title="test", post_detail="test_test2", request_num=5, accept_num=1,
                                    deadline="2019-5-20", if_end=False, poster=user)
        self.token = create_token(user.id).decode()
        self.url = '/c/post/'

    def test_creat_post_successful(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl" : "2019-5-20",
        }
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token, data=data, content_type='application/json')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])

    def test_creat_post_filed_1(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019-5-20",
        }
        response = self.client.get(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)

    def test_creat_post_filed_2(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)

    def test_creat_post_filed_3(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 0,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_4(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 101,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_5(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 1.2,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_6(self):
        data = {
            "title": "test222222222222222222222222222222222222222222222222222222222222",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_7(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_8(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019-5-32",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_post_filed_8(self):
        data = {
            "title": "test",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 4)

    def test_creat_post_filed_9(self):
        data = {
            "title": "test2",
            "postDetail": "test_test2",
            "requestNum": 5,
            "ddl": "2019-5-20",
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION="self.token")
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)

#====================================================================bsh=============================================

class CreatApplyTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='bsh_test', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        self.post2 = Post.objects.create(title="test_a", post_detail="test_test2", request_num=4, accept_num=1,
                                    deadline="2019-5-20", if_end=False, poster=user)
        self.post3 = Post.objects.create(title="test_b", post_detail="test_test2", request_num=4, accept_num=1,
                                    deadline="2019-4-20", if_end=False, poster=user)
        self.post4 = Post.objects.create(title="test_c", post_detail="test_test2", request_num=1, accept_num=1,
                                    deadline="2019-5-20", if_end=False, poster=user)
        self.token = create_token(user.id).decode()
        self.url = '/c/apply/'
        self.post_ID = post2.id


    def test_creat_apply(self):
        '''
            正确创建
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"123",
            "email":"1@2",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        #self.assertEqual(ret_data['error_code'], 1)

    def test_creat_apply_err1(self):
        '''
            方法不为 post
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.get(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)
    def test_creat_apply_err2(self):
        '''
            用户登陆已过期
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION='')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)

    def test_creat_apply_err3(self):
        '''
            数据格式不正确
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = '', HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)

    def test_creat_apply_err4(self):
        '''
            缺少信息
        '''
        data = {
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)

    def test_creat_apply_err5(self):
        '''
            该发布不存在
        '''
        data = {
            "post_id": '',
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 4)
    def test_creat_apply_err6(self):
        '''
            guo l ddl
        '''
        data = {
            "post_id": self.post3.id,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 8)

    def test_creat_apply_err7(self):
        '''
            人数已满
        '''
        data = {
            "post_id": self.post4.id,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 7)

    def test_creat_apply_err8(self):
        '''
            重复申请
        '''
        test_creat_apply()
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "email":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 6)

    def test_creat_apply_err9(self):
        '''
            缺少必要信息
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nan",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)


    def test_creat_apply_err9(self):
        '''
            简历错误
        '''
        data = {
            "post_id": self.post_ID,
            "name": "nan",
            "sex": "nassssssssssssssssssssssssssssssssssssssssssssssssn",
            "age": 10,
            "degree":"nan",
            "phone":"nan",
            "city":"nan",
            "edu_exp":"nan",
            "awards":"nan",
            "english_skill":"nan",
            "project_exp":"nan",
            "self_review":"nan"
        }
        response = self.client.post(self.url, data = data, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)
class GetApplyTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='bsh_test', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        self.post2 = Post.objects.create(title="test_apply", post_detail="test_test2", request_num=4, accept_num=1,
                                    deadline="2019-5-20", if_end=False, poster=user)
        resume = Resume.objects.create(name='asd',sex = 's', age = 10, degree = 'dasd', phone = '1234', email = '1@2',city = '32', edu_exp = 'bei', awards = 'das', english_skill = 'dasd', project_exp = 'dasda',self_review = 'dasd')

        self.apply_exp = Apply.objects.create(resume = resume, post = self.post2, applicant =user)
        self.token = create_token(user.id).decode()
        self.url = '/apply/'+ str(self.apply_exp.id)+'//'
        self.post_ID = post2.id
    def getapply():
        '''
        成功获取
        '''
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        #self.assertEqual(ret_data['error_code'], 3) 
    def getapply_err1():
        '''
        不是 get 方法
        '''
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1)         
        
    def getapply_err2():
        '''
        用户登陆已过期
        '''
        response = self.client.get(self.url, HTTP_AUTHORIZATION='')
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5)     

    def getapply_err3():
        '''
        该申请不存在
        '''
        uuu = 'apply/666/'
        response = self.client.get(uuu, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2)     

    def getapply_err4():
        '''
        当前登陆的用户 既不是申请者 也不是发布者
        '''
        user_a = User.objects.create(account='bsh_adsad', password=gen_md5('admin_admin', SECRET_KEY))
        tt = create_token(user_a.id).decode()
        response = self.client.get(self.url, HTTP_AUTHORIZATION=tt)
        ret_data = response.json()
        self.assertFalse(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3)     

class AcceptApplyTest(TestCase):
    url = 'a'

    def setUp(self):  # 测试所用数据库为空，需手动插入数据
        user = User.objects.create(account='bsh_abcd', password=gen_md5('admin_admin', SECRET_KEY))  # 数据库中插入用户
        self.post2 = Post.objects.create(title="test_apply", post_detail="test_test2", request_num=4, accept_num=1,
                                    deadline="2019-5-20", if_end=False, poster=user)
        self.resume = Resume.objects.create(name='asd',sex = 's', age = 10, degree = 'dasd', phone = '1234', email = '1@2',city = '32', edu_exp = 'bei', awards = 'das', english_skill = 'dasd', project_exp = 'dasda',self_review = 'dasd')

        self.apply_exp = Apply.objects.create(resume = self.resume, post = self.post2, applicant =user)
        self.token = create_token(user.id).decode()
        self.url = '/apply/'+ str(self.apply_exp.id)+'/accept'
        self.post_ID = post2.id
    def acapplytest(self):
        '''
        成功获取
        '''
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        #self.assertEqual(ret_data['error_code'], 3) 
    def acapplytest_err1(self):
        '''
        bushi  post
        '''
        response = self.client.get(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 1) 

    def acapplytest_err2(self):
        '''
        用户已过期
        '''
        response = self.client.post(self.url, HTTP_AUTHORIZATION='')
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 5) 

    def acapplytest_err3(self):
        '''
        不存在
        '''
        uuu = '/apply/6666/accept'
        response = self.client.post(uuu, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 2) 
    def acapplytest_err4(self):
        '''
        不是发布者
        '''
        user_a = User.objects.create(account='fake', password=gen_md5('admin_admin', SECRET_KEY))
        tt = create_token(user_a.id).decode()
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 3) 
    def acapplytest_err5(self):
        '''
        bushi  post
        '''
        apply_acc = Apply.objects.create(resume = self.resume, post = self.post2, applicant =user, status = 'closed')
        self.url = '/apply/'+ str(apply_acc.id)+'/accept'
        response = self.client.post(self.url, HTTP_AUTHORIZATION=self.token)
        ret_data = response.json()
        self.assertTrue(ret_data['ret'])
        self.assertEqual(ret_data['error_code'], 6) 

