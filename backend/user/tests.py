# from django.test import TestCase
import time
import json
import requests


def test_login_1():
    print('test_login_1:')
    url = 'https://group.tttaaabbbccc.club/login/'
    case_new = {'account': 'admin', 'password': 'adminadmin'}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, json.loads(r.content)['ret'])


def test_login_2():
    print('test_login_2:')
    url = 'https://group.tttaaabbbccc.club/login/'
    case_new = {'account': 'admin_not', 'password': 'adminadmin'}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


def test_login_3():
    print('test_login_3:')
    url = 'https://group.tttaaabbbccc.club/login/'
    case_new = {'account': 'admin', 'password': 'adminadmin_not'}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


def test_register_1():
    print('test_register_1:')
    url = 'https://group.tttaaabbbccc.club/register/'
    case_new = {'account': 'a' + str(int(time.time())), 'password': 'admin_admin', "name": "string", "age": 1,
                "studentID": "11111111", "sex": "string", "major": "string", "grade": "string"}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


def test_register_2():
    print('test_register_2:')
    url = 'https://group.tttaaabbbccc.club/register/'
    case_new = {'account': 'admin', 'password': 'admin_admin', "name": "string", "age": 1,
                "studentID": "11111111", "sex": "string", "major": "string", "grade": "string"}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


def test_register_3():
    print('test_register_3:')
    url = 'https://group.tttaaabbbccc.club/register/'
    case_new = {'account': 'a' + str(int(time.time())), 'password': 'admin_admin', "name": "string", "age": 1,
                "studentID": "11111111", "sex": "string", "major": "string", "grade": "string"}
    r = requests.post(url, data=json.dumps(case_new))
    print(r, r.content)


if __name__ == "__main__":
    test_register_1()
    test_register_2()
    test_register_3()
    test_login_1()
    test_login_2()
    test_login_3()