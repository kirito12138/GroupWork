# from django.test import TestCase
import json
import requests

domain_list = ['http://127.0.0.1:8000/', 'https://group.tttaaabbbccc.club/']
domain = domain_list[1]


def test_login_1():
    print('test_login_1:')
    url = domain + 'login/'
    case_new = {'account': 'admin', 'password': 'admin_admin'}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, json.loads(r.content))


def test_profile_1():
    print('test_profile_1:')
    url = domain + 'f/processing/'
    headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NTQ5MTI4NzEsImV4cCI6MTU1NzUwNDg3MX0.GQLFePp6jj1p8zw9RQtu5BJ_4oyWhrjGwoKj7KWyJTI'}
    r = requests.get(url, headers=headers)
    print(r, r.content)


def test_post_1():
    print('test_post_1:')
    url = domain + 'c/post/'
    headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NTQ5MTI4NzEsImV4cCI6MTU1NzUwNDg3MX0.GQLFePp6jj1p8zw9RQtu5BJ_4oyWhrjGwoKj7KWyJTI'}
    case_new = {'title': 'aadwdwwdwaa', 'postDetail': 'wddwqdqdwq', 'requestNum': 3, 'ddl': '2019-04-01'}
    r = requests.post(url, data=json.dumps(case_new), headers=headers)
    print(r, r.content)


def test_post_2():
    print('test_post_2:')
    url = domain + 'c/post/'
    headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NTQ5MTI4NzEsImV4cCI6MTU1NzUwNDg3MX0.GQLFePp6jj1p8zw9RQtu5BJ_4oyWhrjGwoKj7KWyJTI'}
    case_new = {'title': 'aaasdwdwa', 'postDetail': 'wdqdqdwq', 'requestNum': 3, 'ddl': '2019-04-01'}
    r = requests.post(url, data=json.dumps(case_new), headers=headers)
    print(r, r.content)


def test_get_post_detail_1():
    print('test_get_post_detail_1:')
    url = domain + 'p/2/'
    headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJpYXQiOjE1NTQ5MTI4NzEsImV4cCI6MTU1NzUwNDg3MX0.GQLFePp6jj1p8zw9RQtu5BJ_4oyWhrjGwoKj7KWyJTI'}
    r = requests.get(url, headers=headers)
    print(r, r.content)


if __name__ == "__main__":
    # test_register_1()
    # test_register_2()
    # test_register_3()
    test_post_1()
    test_post_2()
    test_profile_1()
    test_get_post_detail_1()
