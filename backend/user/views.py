import base64
import hmac
import json
import random
import re
import string
import hashlib
from json import JSONDecodeError

from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.http import JsonResponse

from user.models import User, Resume
from user.api_wechat import get_openid
from user.jwt_token import create_token, verify_token
from backend.settings import SECRET_KEY, UPYUN_OPERATOR_MD5_PASSWORD

account_pattern = re.compile(r"^[a-zA-Z][a-zA-Z0-9]{0,13}$")
password_pattern = re.compile(r"^[a-z_A-Z0-9-.!@#$%\\^&*)(+={}\[\]/\",'<>~·`?:;|]{8,14}$")
name_pattern = re.compile(r"^.{0,20}$")
student_id_pattern = re.compile(r"^\d{0,20}$")


def gen_md5(s, salt='9527'):  # 加盐
    s += salt
    md5 = hashlib.md5()
    md5.update(s.encode(encoding='utf-8'))  # update方法只接收bytes类型
    return md5.hexdigest()


# def gen_password(length):
#     chars = string.ascii_letters + string.digits
#     return ''.join([random.choice(chars) for _ in range(length)])  # 得出的结果中字符会有重复的


def login(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        account = data['account']
        password = data['password']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if not account_pattern.match(account) or not password_pattern.match(password):
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        user = User.objects.get(account=account)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 4})

    if user.password != gen_md5(password, SECRET_KEY):
        return JsonResponse({'ret': False, 'error_code': 5})
    token = create_token(user.id).decode()
    return JsonResponse({'ret': True, 'ID': str(user.id), 'Token': token})


def wechat_login(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        code = data['code']
        name = data['name']
        avatar_url = data['avatar_url']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    open_id = get_openid(code)
    if not open_id:
        return JsonResponse({'ret': False, 'error_code': 4})

    try:
        user = User.objects.get(open_id=open_id)
        if user.name == '':
            user.name = name
    except User.DoesNotExist:
        user = User.objects.create(account=open_id, open_id=open_id, name=name)
    user.avatar_url = avatar_url
    user.save()
    token = create_token(user.id).decode()
    return JsonResponse({'ret': True, 'ID': str(user.id), 'Token': token})


def register(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

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
    # if models.User.objects.filter(account=account).exists():
    #     return JsonResponse({'ret': False, 'error_code': 4})

    try:
        new_user = User.objects.create(account=account, password=gen_md5(password, SECRET_KEY), name=name,
                                       age=age, student_id=student_id, sex=sex, major=major, grade=grade)
    except IntegrityError:  # 用户名已存在
        return JsonResponse({'ret': False, 'error_code': 4})

    token = create_token(new_user.id).decode()
    return JsonResponse({'ret': True, 'ID': str(new_user.id), 'Token': token})


def get_my_profile(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    return JsonResponse(
        {'ret': True, 'account': user.account, 'name': user.name, 'age': user.age,
         'studentID': user.student_id, "sex": user.sex, "major": user.major, "grade": user.grade,
         "avatar_url": user.avatar_url})


def get_user_profile(request, user_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    return JsonResponse(
        {'ret': True, 'account': user.account, 'name': user.name, 'age': user.age,
         'studentID': user.student_id, "sex": user.sex, "major": user.major, "grade": user.grade,
         "avatar_url": user.avatar_url})


def modify_my_profile(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

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
    # if account != user.account and models.User.objects.filter(account=account).exists():
    #     return JsonResponse({'ret': False, 'error_code': 4})

    user.account = account
    user.name = name
    user.age = age
    user.student_id = student_id
    user.sex = sex
    user.major = major
    user.grade = grade

    try:
        user.save()
    except IntegrityError:  # 用户名已存在
        return JsonResponse({'ret': False, 'error_code': 4})

    if not user.resume:
        user.resume = Resume.objects.create()
        user.save()
    resume = user.resume
    resume.name = user.name
    resume.age = user.age
    resume.sex = user.sex
    resume.save()

    return JsonResponse({'ret': True})


def get_login_status(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 2})

    return JsonResponse({'ret': True})


def change_password(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        password = data['password']
        new_password = data['new_password']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if not password_pattern.match(password) or not password_pattern.match(new_password):
        return JsonResponse({'ret': False, 'error_code': 3})

    if user.password != gen_md5(password, SECRET_KEY):
        return JsonResponse({'ret': False, 'error_code': 4})

    user.password = gen_md5(new_password, SECRET_KEY)
    user.save()

    return JsonResponse({'ret': True})


def modify_my_resume(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if not user.resume:
        user.resume = Resume.objects.create()
        user.save()
    resume = user.resume

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        resume.name = data['name']
        resume.sex = data['sex']
        resume.age = data['age']
        resume.degree = data['degree']
        resume.phone = data['phone']
        resume.email = data['email']
        resume.city = data['city']
        resume.edu_exp = data['edu_exp']
        resume.awards = data['awards']
        resume.english_skill = data['english_skill']
        resume.project_exp = data['project_exp']
        resume.self_review = data['self_review']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        resume.full_clean()  # 检查格式
        resume.save()
    except ValidationError:
        return JsonResponse({'ret': False, 'error_code': 3})

    user.name = resume.name
    user.age = resume.age
    user.sex = resume.sex
    user.save()

    return JsonResponse({'ret': True})


def get_my_resume(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if not user.resume:
        user.resume = Resume.objects.create()
        user.save()
    resume = user.resume
    return JsonResponse({
        "ret": True,
        "name": resume.name,
        "age": resume.age,
        "sex": resume.sex,
        "degree": resume.degree,
        "phone": resume.phone,
        "email": resume.email,
        "city": resume.city,
        "edu_exp": resume.edu_exp,
        "awards": resume.awards,
        "english_skill": resume.english_skill,
        "project_exp": resume.project_exp,
        "self_review": resume.self_review,
    })


def get_upyun_signature(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    data = request.GET.get('data')
    if not data:
        return JsonResponse({'ret': False, 'error_code': 2})

    signature = base64.b64encode(
        hmac.new(UPYUN_OPERATOR_MD5_PASSWORD.encode(), data.encode(), digestmod=hashlib.sha1).digest()).decode()

    return JsonResponse({'ret': True, 'signature': signature})
