# from django.test import TestCase
import json
import requests

domain_list = ['http://127.0.0.1:8000/', 'https://group.tttaaabbbccc.club/']
domain = domain_list[1]
headers = {'Authorization': ''}


def test_register_1():
    print('test_register_1:')
    url = domain + 'register/'
    case_new = {'account': 'admin', 'password': 'admin_admin', "name": "", "age": 0,
                "studentID": "", "sex": "", "major": "", "grade": ""}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


def test_login_1():
    print('test_login_1:')
    url = domain + 'login/'
    data = {'account': 'admin999', 'password': 'admin_admin123'}
    r = requests.post(url, data=json.dumps(data))
    print(r, json.loads(r.content))
    try:
        headers['Authorization'] = json.loads(r.content)['Token']
    except KeyError:
        pass


def test_get_unclosed_posts_1():
    print('test_get_unclosed_posts_1:')
    url = domain + 'f/processing/'
    r = requests.get(url, headers=headers)
    print(r, r.content)


def test_post_1():
    print('test_post_1:')
    url = domain + 'c/post/'
    case_new = {'title': 'aadwwddwaa', 'postDetail': 'wddwqdqdwq', 'requestNum': 3, 'ddl': '2019-04-01'}
    r = requests.post(url, data=json.dumps(case_new), headers=headers)
    print(r, r.content)


def test_post_2():
    print('test_post_2:')
    url = domain + 'c/post/'
    case_new = {'title': 'aawawdwa', 'postDetail': 'wdqdqdwq', 'requestNum': 3, 'ddl': '2019-04-01'}
    r = requests.post(url, data=json.dumps(case_new), headers=headers)
    print(r, r.content)


def test_get_post_detail_1():
    print('test_get_post_detail_1:')
    url = domain + 'p/2/'
    r = requests.get(url, headers=headers)
    print(r, r.content)


def test_get_my_profile_1():
    print('test_get_my_profile_1:')
    url = domain + 'my/profile/'
    r = requests.get(url, headers=headers)
    print(r, r.content)


def test_get_profile_1():
    print('test_get_profile_1:')
    url = domain + 'my/1/detail/'
    r = requests.get(url, headers=headers)
    print(r, r.content)


def test_modify_profile_1():
    print('test_modify_profile_1:')
    url = domain + 'my/profile/modify/'
    data = {"account": "admin999",
            "name": "string",
            "age": 200,
            "studentID": "1234",
            "sex": "string",
            "major": "string",
            "grade": "string"}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r, r.content)


def test_modify_password_1():
    print('test_modify_password_1:')
    url = domain + 'my/change_password/'
    data = {'password': 'admin_admin',
            'new_password': 'admin_admin123'}
    r = requests.post(url, data=json.dumps(data), headers=headers)
    print(r, r.content)


def test_get_user_posts_1():
    print('test_get_user_posts_1:')
    url = domain + 'my/1/post/'
    r = requests.get(url, headers=headers)
    print(r, r.content)


if __name__ == "__main__":
    # test_register_1()
    test_login_1()
    # test_post_1()
    # test_post_2()
    # test_get_unclosed_posts_1()
    # test_get_post_detail_1()
    # test_modify_profile_1()
    # test_modify_password_1()
    # test_get_my_profile_1()
    # test_get_profile_1()
    test_get_user_posts_1()
