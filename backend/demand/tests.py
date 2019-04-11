# from django.test import TestCase
import json
import requests

domain_list = ['http://127.0.0.1:8000/', 'https://group.tttaaabbbccc.club/']
domain = domain_list[1]
headers = {'Authorization': ''}


def test_login_1():
    print('test_login_1:')
    url = domain + 'login/'
    case_new = {'account': 'admin', 'password': 'admin_admin'}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, json.loads(r.content))
    headers['Authorization'] = json.loads(r.content)['Token']


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


if __name__ == "__main__":
    test_login_1()
    test_post_1()
    test_post_2()
    test_get_unclosed_posts_1()
    test_get_post_detail_1()
