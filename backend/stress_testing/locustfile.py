from locust import HttpLocust, TaskSet, task


class UserBehavior(TaskSet):

    def __init__(self, parent):
        super().__init__(parent)
        self.headers = {'Authorization': ''}
        self.user_id = '1'
        self.post_id = '39'

    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        self.logout()

    def login(self):
        data = {'account': 'admin111', 'password': 'admin999'}
        response = self.client.post("/login/", json=data)
        ret_data = response.json()
        assert ret_data['ret']
        self.headers['Authorization'] = ret_data['Token']
        self.user_id = ret_data['ID']

    def logout(self):
        pass

    @task(10)
    def get_unclosed_posts(self):
        data = {
            'history': '',
        }
        response = self.client.post("/f/processing/", json=data, headers=self.headers)
        ret_data = response.json()
        assert 'ret' not in ret_data

    @task(10)
    def get_user_posts(self):
        response = self.client.get("/my/" + self.user_id + "/post/", headers=self.headers)
        ret_data = response.json()
        assert 'ret' not in ret_data

    @task(10)
    def get_user_applies(self):
        response = self.client.get("/my/" + self.user_id + "/apply/", headers=self.headers)
        ret_data = response.json()
        assert 'ret' not in ret_data

    @task(10)
    def modify_post(self):
        data = {
            "ddl": "2019-12-31",
            "title": "test_test_test_test_",
            "postDetail": "test_test2",
            "requestNum": 5,
            "labels": "1&2&3&4",
        }
        response = self.client.post('/p/' + self.post_id + '/modify/', json=data, headers=self.headers)
        ret_data = response.json()
        # print(ret_data)
        assert ret_data['ret']

    @task(10)
    def get_post_detail(self):
        response = self.client.get("/p/" + self.post_id + "/", headers=self.headers)
        ret_data = response.json()
        assert ret_data['ret']

    @task(10)
    def get_my_profile(self):
        response = self.client.get('/my/profile/', headers=self.headers)
        ret_data = response.json()
        assert ret_data['ret']

    @task(10)
    def get_my_resume(self):
        response = self.client.get('/my/resume/', headers=self.headers)
        ret_data = response.json()
        assert ret_data['ret']

    @task(10)
    def modify_my_profile(self):
        data = {
            "account": "admin111",
            "name": "Admin",
            "age": 1,
            "studentID": "16060000",
            "sex": "male",
            "major": "CS",
            "grade": "one"
        }
        response = self.client.post('/my/profile/modify/', json=data, headers=self.headers)
        ret_data = response.json()
        assert ret_data['ret']

    @task(10)
    def modify_my_resume(self):
        data = {'name': 'Admin', 'sex': 'male', 'age': 10, 'degree': 'high school', 'phone': '13579',
                'email': '4521@126.com', 'city': 'beijing', 'edu_exp': 'abc', 'awards': 'null', 'english_skill': 'A',
                'project_exp': 'B',
                'self_review': 'not bad'}
        response = self.client.post('/my/resume/modify/', json=data, headers=self.headers)
        ret_data = response.json()
        assert ret_data['ret']


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 1000
    max_wait = 5000
