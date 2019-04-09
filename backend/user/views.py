import json
import re
from django.http import JsonResponse
import hashlib
from user import models
from user.jwt_token import create_token
from backend.settings import SECRET_KEY

account_pattern = re.compile("^[a-zA-Z][a-zA-Z0-9]{0,13}$")
password_pattern = re.compile("^[a-z_A-Z0-9-\.!@#\$%\\\^&\*\)\(\+=\{\}\[\]/\",'<>~\·`\?:;|]{8,14}$")
digits = re.compile("^\d{1,20}$")


def gen_md5(s, salt='9527'):  # 加盐
    s += salt
    md5 = hashlib.md5()
    md5.update(s.encode(encoding='utf-8'))  # update方法只接收bytes类型
    return md5.hexdigest()


def register(request):
    if request.method != "POST":
        return JsonResponse({'ret': False})

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
        return JsonResponse({'ret': False})

    if not account_pattern.match(account) or \
            not password_pattern.match(password):
        return JsonResponse({'ret': False})
    if not digits.match(student_id):
        return JsonResponse({'ret': False})
    if type(age) != int or age < 0 or age > 200:
        return JsonResponse({'ret': False})

    # 注册用户名校验
    if models.User.objects.filter(account=account).exists():
        return JsonResponse({'ret': False})

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
