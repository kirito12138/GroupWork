import json
import os
import re
import datetime

from random import randint
from json import JSONDecodeError
from django.core.exceptions import ValidationError
from django.http import JsonResponse
# from django.shortcuts import render

from backend.settings import MEDIA_ROOT
from user.jwt_token import verify_token
from user.models import User, Resume
from demand.models import Post
from demand.models import Apply

post_title_pattern = re.compile(r"^.{1,20}$")
deadline_pattern = re.compile(r"^\d\d\d\d-\d\d-\d\d$")


def create_post(request):
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
        title = data['title']
        post_detail = data['postDetail']
        request_num = data['requestNum']
        deadline = data['ddl']
        labels = data['labels']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    labelList = labels.split('&')
    for i in range(0, len(labelList)):
        labelList[i] = int(labelList[i])
        if labelList[i] <= 0 or labelList[i] > 20:
            return JsonResponse({'ret': False, 'error_code': 3})

    if type(request_num) != int or request_num < 1 or request_num > 100:
        return JsonResponse({'ret': False, 'error_code': 3})
    if not post_title_pattern.match(title):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not deadline_pattern.match(deadline):
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        deadline = datetime.datetime.strptime(deadline, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 新建发布校验
    if Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
                           poster=user).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    new_post = Post.objects.create()
    new_post.title = title
    new_post.post_detail = post_detail
    new_post.request_num = request_num
    new_post.deadline = deadline
    new_post.poster = user
    new_post.image = os.sep.join([MEDIA_ROOT, 'img/post/example/' + str(randint(1, 4)) + '.jpg'])  # 设置默认图片
    new_post.save()

    for i in labelList:
        new_post.label_set.create(label=i)


    return JsonResponse({'ret': True, 'postID': str(new_post.id)})


def upload_post_image(request, post_id):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    print(request.FILES)
    image = request.FILES.get('image')
    if not image:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 4})
    if post.poster != user:
        return JsonResponse({'ret': False, 'error_code': 6})

    try:
        post.image = image
        post.if_end = False
        post.full_clean()  # 检查格式
        post.save()
    except ValidationError:
        return JsonResponse({'ret': False, 'error_code': 3})

    print(post.image.url, post.image.path)
    return JsonResponse({'ret': True, 'image_url': post.image.url})


def get_unclosed_posts(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    unclosed_posts = Post.objects.filter(if_end=False, deadline__gte=datetime.date.today()).order_by('-post_time')
    ret_data = []
    for post in unclosed_posts:
        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "image_url": post.image.url,
        })
    return JsonResponse(ret_data, safe=False)


def get_post_detail(request, post_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    return JsonResponse(
        {'ret': True, 'title': post.title, 'postDetail': post.post_detail, 'requestNum': post.request_num,
         'acceptedNum': post.accept_num, 'ddl': post.deadline, 'ifEnd': post.if_end, 'postID': str(post.id),
         'posterID': str(post.poster.id), 'image_url': post.image.url})


def get_user_posts(request, user_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    posts = user.post_set.order_by('-post_time')
    ret_data = []
    for post in posts:
        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "ifEnd": post.if_end,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "image_url": post.image.url,
        })
    return JsonResponse(ret_data, safe=False)


def modify_post_detail(request, post_id):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 4})
    if post.poster != user:
        return JsonResponse({'ret': False, 'error_code': 6})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        title = data['title']
        post_detail = data['postDetail']
        request_num = data['requestNum']
        deadline = data['ddl']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if type(request_num) != int or request_num < 1 or request_num > 100:
        return JsonResponse({'ret': False, 'error_code': 3})
    if not post_title_pattern.match(title):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not deadline_pattern.match(deadline):
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        deadline = datetime.datetime.strptime(deadline, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 新建发布校验
    # if Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
    #                        poster=user).exists():
    #     return JsonResponse({'ret': False, 'error_code': 4})

    post.title = title
    post.post_detail = post_detail
    post.request_num = request_num
    post.deadline = deadline
    post.poster = user
    post.save()

    if post.accept_num >= post.request_num:
        post.apply_set.filter(status='waiting').update(status='closed')
        post.if_end = True
        post.save()
    else:
        post.apply_set.filter(status='closed').update(status='waiting')
        post.if_end = False
        post.save()

    return JsonResponse({'ret': True})


# def choose_resume(request):
#     if request.method != "GET":
#         return JsonResponse({'ret': False, 'error_code': 1})
#     jwt_token = request.META.get('HTTP_AUTHORIZATION')
#     user = verify_token(jwt_token)
#     if not user:
#         return JsonResponse({'ret': False, 'error_code': 5})
#     return render(request, 'upload_resume.html', locals())


# def upload_resume(request):
#     if request.method != "POST":
#         return JsonResponse({'ret': False, 'error_code': 1})
#
#     user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
#     if not user:
#         return JsonResponse({'ret': False, 'error_code': 5})
#
#     print(request.FILES.get('file'))
#     return JsonResponse({'ret': True})


def get_post_applies(request, post_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        post = Post.objects.get(id=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    applies = post.apply_set.order_by('-c_time')
    ret_data = []
    for apply in applies:
        ret_data.append({
            "applyID": str(apply.id),
            "applyStatus": apply.status,
            "applicantID": str(apply.applicant.id),
            "applicant_account": apply.applicant.account,
            "name": apply.resume.name,
            "sex": apply.resume.sex,
            "age": apply.resume.age,
            "degree": apply.resume.degree,
            "phone": apply.resume.phone,
            "email": apply.resume.email,
            "city": apply.resume.city,
            "edu_exp": apply.resume.edu_exp,
            "awards": apply.resume.awards,
            "english_skill": apply.resume.english_skill,
            "project_exp": apply.resume.project_exp,
            "self_review": apply.resume.self_review,
        })
    return JsonResponse(ret_data, safe=False)


def get_user_applies(request, user_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    applies = user.apply_set.order_by('-c_time')
    ret_data = []
    for apply in applies:
        ret_data.append({
            "applyID": str(apply.id),
            "applyStatus": apply.status,
            "postID": str(apply.post.id),
            "post_title": apply.post.title,
            "postDetail": apply.post.post_detail,
            "requestNum": apply.post.request_num,
            "acceptedNum": apply.post.accept_num,
            "ddl": apply.post.deadline,
            "ifEnd": apply.post.if_end,
            "posterID": str(apply.applicant.id),
            "image_url": apply.post.image.url,
        })
    return JsonResponse(ret_data, safe=False)


def create_apply(request):
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
        post_id = data['post_id']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        post_id = int(post_id)
        post = Post.objects.get(pk=post_id)
    except (ValueError, Post.DoesNotExist):
        return JsonResponse({'ret': False, 'error_code': 4})

    if post.if_end or post.accept_num >= post.request_num:
        return JsonResponse({'ret': False, 'error_code': 7})

    if post.deadline < datetime.date.today():
        return JsonResponse({'ret': False, 'error_code': 8})

    if user.apply_set.filter(post=post).exists():
        return JsonResponse({'ret': False, 'error_code': 6})

    resume = Resume.objects.create()
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
        resume.delete()
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        resume.full_clean()  # 检查格式
        resume.save()
    except ValidationError:
        resume.delete()
        return JsonResponse({'ret': False, 'error_code': 3})

    user.resume = resume
    user.save()
    resume.pk = None  # 复制一个新的resume
    resume.save()

    apply = Apply.objects.create(resume=resume, post=post, applicant=user)
    return JsonResponse({'ret': True, 'apply_id': str(apply.id)})


def get_apply_detail(request, apply_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        apply = Apply.objects.get(id=apply_id)
    except Apply.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 2})
    if apply.applicant != user and apply.post.poster != user:
        return JsonResponse({'ret': False, 'error_code': 3})

    return JsonResponse(
        {'ret': True, 'applyStatus': apply.status, 'name': apply.resume.name, 'sex': apply.resume.sex,
         'age': apply.resume.age, 'degree': apply.resume.degree, 'phone': apply.resume.phone,
         'email': apply.resume.email, 'city': apply.resume.city, 'edu_exp': apply.resume.edu_exp,
         'awards': apply.resume.awards, 'english_skill': apply.resume.english_skill,
         'project_exp': apply.resume.project_exp, 'self_review': apply.resume.self_review})


def accept_apply(request, apply_id):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        apply = Apply.objects.get(id=apply_id)
    except Apply.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 2})

    post = apply.post
    if post.poster != user:
        return JsonResponse({'ret': False, 'error_code': 3})

    if apply.status == 'accepted':
        return JsonResponse({'ret': False, 'error_code': 4})

    if post.if_end or post.accept_num >= post.request_num or apply.status == 'closed':
        return JsonResponse({'ret': False, 'error_code': 6})

    post.accept_num += 1
    post.save()
    if post.accept_num >= post.request_num:
        post.apply_set.filter(status='waiting').update(status='closed')
        post.if_end = True
        post.save()
    apply.status = 'accepted'
    apply.save()

    return JsonResponse({'ret': True})
