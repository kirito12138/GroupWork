import json
import re
import datetime
from random import randint
from json import JSONDecodeError

from django.core.exceptions import ValidationError
from django.http import JsonResponse
# from django.shortcuts import render

from user.jwt_token import verify_token
from user.models import User, Resume
from demand.models import Post
from demand.models import Apply
from demand.models import PostLabel
from demand.models import ApplyLabel
from demand.utils import decode_label, encode_label, check_postLabel, check_applyLabel, rank_post, grade_apply, \
    rank_apply

post_title_pattern = re.compile(r"^.{1,50}$")
deadline_pattern = re.compile(r"^\d\d\d\d-\d\d-\d\d$")


def create_post(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    # 检查用户身份
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

    # 处理获取的标签，进行标签正确性检查
    labelList = decode_label(labels)
    if not check_postLabel(labelList):
        return JsonResponse({'ret': False, 'error_code': 3})

    # 检查各字段合法性
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

    # 检查是否能够加入新项目
    if Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
                           poster=user).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    # 新建Post项目
    new_post = Post.objects.create(
        title=title,
        post_detail=post_detail,
        request_num=request_num,
        deadline=deadline,
        poster=user,
        image='img/post/example/' + str(randint(1, 4)) + '.jpg',  # 设置默认图片
        is_imported=False,
    )

    # 添加项目标签至数据库
    for i in labelList:
        new_post.postlabel_set.create(label=i)

    return JsonResponse({'ret': True, 'postID': str(new_post.id)})


def upload_post_image(request, post_id):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if request.content_type != 'multipart/form-data':
        return JsonResponse({'ret': False, 'error_code': 3})
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
        # post.if_end = False
        post.full_clean()  # 检查格式
        post.save()
    except ValidationError:
        return JsonResponse({'ret': False, 'error_code': 3})

    return JsonResponse({'ret': True, 'image_url': post.image.url})


def get_unclosed_posts(request):

    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    # 获取用户的历史纪录
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        history = data['history']
        history = decode_label(history)
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    label_weight = {}
    weight_base = 1
    # 分析历史纪录
    for post_id in history:
        post_label = PostLabel.objects.filter(post_id=post_id).all()
        for label in post_label:
            if label.label in label_weight:
                label_weight[label.label] += weight_base
            else:
                label_weight[label.label] = weight_base
        weight_base += 1

    unclosed_posts = Post.objects.filter(if_end=False, deadline__gte=datetime.date.today()).order_by('-post_time')
    ret_data = []
    for post in unclosed_posts:
        # 整理相应项目的标签
        post_weight = 0
        label_list = PostLabel.objects.filter(post=post).all()
        for label in label_list:
            if label.label in label_weight:
                post_weight += label_weight[label.label]
        labels = encode_label(label_list)

        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "poster_name": post.poster.name,
            "poster_avatar_url": post.poster.avatar_url,
            "image_url": post.image.url,
            "labels": labels,
            "is_imported": post.is_imported,
            "weight": post_weight,
        })

    # 根据推荐算法对返回的Post进行排序
    ret_data = rank_post(ret_data)

    return JsonResponse(ret_data, safe=False)


# 获取具有某标签的所有项目
def get_unclosed_posts_by_label(request, label):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})
    if not check_postLabel(label.split('&')):
        return JsonResponse({'ret': False, 'error_code': 3})

    unclosed_posts = Post.objects.filter(if_end=False, deadline__gte=datetime.date.today()).order_by('-post_time')
    ret_data = []
    for post in unclosed_posts:
        # 整理相应项目的标签
        label_list = PostLabel.objects.filter(post=post).all()
        if not label_list.filter(label=label).exists():
            continue
        labels = encode_label(label_list)

        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "poster_name": post.poster.name,
            "poster_avatar_url": post.poster.avatar_url,
            "image_url": post.image.url,
            "labels": labels,
            "is_imported": post.is_imported,
        })

    return JsonResponse(ret_data, safe=False)


def get_unclosed_posts_by_key(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    # 获取搜索关键词
    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        key = data['key']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    unclosed_posts = Post.objects.filter(if_end=False, deadline__gte=datetime.date.today(),
                                         title__contains=key).order_by('-post_time')

    ret_data = []
    for post in unclosed_posts:
        # 整理相应项目的标签
        label_list = PostLabel.objects.filter(post=post).all()
        labels = encode_label(label_list)

        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "poster_name": post.poster.name,
            "poster_avatar_url": post.poster.avatar_url,
            "image_url": post.image.url,
            "labels": labels,
            "is_imported": post.is_imported,
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

    # 整理标签
    labelList = PostLabel.objects.filter(post=post).all()
    labels = encode_label(labelList)

    return JsonResponse({
        'ret': True,
        'title': post.title,
        'postDetail': post.post_detail,
        'requestNum': post.request_num,
        'acceptedNum': post.accept_num,
        'ddl': post.deadline,
        'ifEnd': post.if_end,
        'postID': str(post.id),
        'posterID': str(post.poster.id),
        'poster_name': post.poster.name,
        'poster_avatar_url': post.poster.avatar_url,
        'image_url': post.image.url,
        'labels': labels,
        'is_imported': post.is_imported,
    })


# TODO 增加排序功能或重写具有排序功能的方法
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
        # 整理标签信息
        labelList = PostLabel.objects.filter(post=post).all()
        labels = encode_label(labelList)

        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "ifEnd": post.if_end,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "poster_name": post.poster.name,
            "poster_avatar_url": post.poster.avatar_url,
            "image_url": post.image.url,
            "labels": labels,
            "is_imported": post.is_imported,
            "num_not_review": post.apply_set.filter(status='waiting').count()
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
        labels = data['labels']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    # 处理获取的标签，进行标签正确性检查
    labelList = decode_label(labels)
    if not check_postLabel(labelList):
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
    # if Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
    #                        poster=user).exists():
    #     return JsonResponse({'ret': False, 'error_code': 4})

    post.title = title
    post.post_detail = post_detail
    post.request_num = request_num
    post.deadline = deadline
    post.poster = user
    post.save()

    labelListPast = PostLabel.objects.filter(post=post).all()
    for i in labelListPast:
        i.delete()

    for i in labelList:
        post.postlabel_set.create(label=i)

    if post.accept_num >= post.request_num:
        post.if_end = True
        post.save()
    else:
        post.if_end = False
        post.save()

    return JsonResponse({'ret': True})


# TODO 增加排序功能或重写具有排序功能的方法
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
        # 整理申请的标签
        labelList = ApplyLabel.objects.filter(apply=apply).all()
        labels = encode_label(labelList)
        weight = grade_apply(apply.resume)

        ret_data.append({
            "applyID": str(apply.id),
            "applyStatus": apply.status,
            "applicantID": str(apply.applicant.id),
            "applicant_account": apply.applicant.account,
            "applicant_name": apply.applicant.name,
            "applicant_avatar_url": apply.applicant.avatar_url,
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
            "labels": labels,
            "weight": weight,
        })

    ret_data = rank_apply(ret_data)

    return JsonResponse(ret_data, safe=False)


# TODO 增加排序功能或重写具有排序功能的方法
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
        # 整理申请的标签
        labelList = ApplyLabel.objects.filter(apply=apply).all()
        labels = encode_label(labelList)

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
            "posterID": str(apply.post.poster.id),
            "poster_name": apply.post.poster.name,
            "poster_avatar_url": apply.post.poster.avatar_url,
            "image_url": apply.post.image.url,
            "labels": labels,
            "is_imported": apply.post.is_imported,
        })

    return JsonResponse(ret_data, safe=False)


def create_apply(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    # 用户身份认证
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

    # 检查申请项目的有效性
    try:
        post_id = int(post_id)
        post = Post.objects.get(pk=post_id)
    except (ValueError, Post.DoesNotExist):
        return JsonResponse({'ret': False, 'error_code': 4})

    # 检查项目是否为可申请状态
    if post.is_imported:
        return JsonResponse({'ret': False, 'error_code': 9})

    if post.if_end or post.accept_num >= post.request_num:
        return JsonResponse({'ret': False, 'error_code': 7})

    if post.deadline < datetime.date.today():
        return JsonResponse({'ret': False, 'error_code': 8})

    if user.apply_set.filter(post=post).exists():
        return JsonResponse({'ret': False, 'error_code': 6})

    # 获取用户简历
    resume = user.resume
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
        labels = data['labels']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        resume.full_clean()  # 检查格式
        resume.save()
    except ValidationError:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 同步修改个人信息
    user.name = resume.name
    user.age = resume.age
    user.sex = resume.sex
    user.save()
    user.mcm_info.name = resume.name
    if resume.phone != '':
        user.mcm_info.phone = resume.phone
    if resume.email != '':
        user.mcm_info.email = resume.email

    resume.pk = None  # 复制一个新的resume
    resume.save()

    apply = Apply.objects.create(resume=resume, post=post, applicant=user)

    # 将申请的标签添加至数据库
    labelList = decode_label(labels)
    check_applyLabel(labelList)
    for label in labelList:
        apply.applylabel_set.create(label=label)

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

    # 整理申请的标签
    labelList = ApplyLabel.objects.filter(apply=apply).all()
    labels = encode_label(labelList)

    return JsonResponse(
        {'ret': True, 'applyStatus': apply.status, 'name': apply.resume.name, 'sex': apply.resume.sex,
         'age': apply.resume.age, 'degree': apply.resume.degree, 'phone': apply.resume.phone,
         'email': apply.resume.email, 'city': apply.resume.city, 'edu_exp': apply.resume.edu_exp,
         'awards': apply.resume.awards, 'english_skill': apply.resume.english_skill,
         'project_exp': apply.resume.project_exp, 'self_review': apply.resume.self_review,
         'labels': labels})


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

    if apply.status != 'waiting':
        return JsonResponse({'ret': False, 'error_code': 4})

    post.accept_num += 1
    post.save()
    if post.accept_num >= post.request_num:
        post.if_end = True
        post.save()
    apply.status = 'accepted'
    apply.save()

    return JsonResponse({'ret': True})


def reject_apply(request, apply_id):
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

    if apply.status != 'waiting':
        return JsonResponse({'ret': False, 'error_code': 4})

    apply.status = 'rejected'
    apply.save()

    return JsonResponse({'ret': True})


def delete_post(request, post_id):
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

    post.delete()

    posts = user.post_set.order_by('-post_time')
    ret_data = []
    for post in posts:
        # 整理标签信息
        label_list = PostLabel.objects.filter(post=post).all()
        labels = encode_label(label_list)

        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "ifEnd": post.if_end,
            "postID": str(post.id),
            "posterID": str(post.poster.id),
            "poster_name": post.poster.name,
            "poster_avatar_url": post.poster.avatar_url,
            "image_url": post.image.url,
            "labels": labels,
            "is_imported": post.is_imported,
        })
    return JsonResponse(ret_data, safe=False)
