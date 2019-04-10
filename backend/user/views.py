import json
import re
from django.http import JsonResponse
import hashlib
from user import models
from user.jwt_token import create_token, verify_token
from backend.settings import SECRET_KEY

account_pattern = re.compile("^[a-zA-Z][a-zA-Z0-9]{0,13}$")
password_pattern = re.compile("^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]/\",'<>~\·`\?:;|]{8,14}$")
name_pattern = re.compile("^\d{0,20}$")
student_id_pattern = re.compile("^.{0,20}$")


def gen_md5(s, salt='9527'):  # 加盐
    s += salt
    md5 = hashlib.md5()
    md5.update(s.encode(encoding='utf-8'))  # update方法只接收bytes类型
    return md5.hexdigest()


def login(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    data = json.loads(request.body)
    try:
        account = data['account']
        password = data['password']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if not account_pattern.match(account) or not password_pattern.match(password):
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        user = models.User.objects.get(account=account)
    except models.User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 4})

    if user.password != gen_md5(password, SECRET_KEY):
        return JsonResponse({'ret': False, 'error_code': 5})
    token = create_token(account).decode()
    return JsonResponse({'ret': True, 'ID': str(user.id), 'Token': token})


def register(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    data = json.loads(request.body)
    try:
        account = data['account']
        password = data['password']
        name = data['name']
        age = data['age']
        student_id = data['studentID']
        sex = data['sex']
        major = data['major']
        grade = data['grade']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if not account_pattern.match(account) or \
            not password_pattern.match(password):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not student_id_pattern.match(student_id) or not name_pattern.match(name):
        return JsonResponse({'ret': False, 'error_code': 3})
    if type(age) != int or age < 0 or age > 200:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 注册用户名校验
    if models.User.objects.filter(account=account).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    new_user = models.User.objects.create()
    new_user.account = account
    new_user.password = gen_md5(password, SECRET_KEY)
    new_user.name = name
    new_user.age = age
    new_user.student_id = student_id
    new_user.sex = sex
    new_user.major = major
    new_user.grade = grade
    new_user.save()

    token = create_token(account).decode()
    return JsonResponse({'ret': True, 'ID': str(new_user.id), 'Token': token})


def get_profile(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    return JsonResponse(
        {'ret': True, 'account': user.account, 'name': user.name, 'age': user.age,
         'studentID': user.student_id, "sex": user.sex, "major": user.major, "grade": user.grade})


def modify_profile(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    data = json.loads(request.body)
    try:
        account = data['account']
        name = data['name']
        age = data['age']
        student_id = data['studentID']
        sex = data['sex']
        major = data['major']
        grade = data['grade']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if not account_pattern.match(account):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not student_id_pattern.match(student_id) or not name_pattern.match(name):
        return JsonResponse({'ret': False, 'error_code': 3})
    if type(age) != int or age < 0 or age > 200:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 注册用户名校验
    if account != user.account and models.User.objects.filter(account=account).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    user.account = account
    user.name = name
    user.age = age
    user.student_id = student_id
    user.sex = sex
    user.major = major
    user.grade = grade
    user.save()

    return JsonResponse({'ret': True})
