import json
import re
from django.http import JsonResponse, HttpResponse
from demand.models import Post
from user.jwt_token import verify_token
import datetime
from django.core import serializers

length = re.compile("^.{1,20}$")
yyyy_mm_dd = re.compile("^\d\d\d\d-\d\d-\d\d$")


def post(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    account = verify_token(request.META.get('AUTHORIZATION'))
    if not account:
        return JsonResponse({'ret': False, 'error_code': 5})

    data = json.loads(request.body)
    try:
        title = data['title']
        post_detail = data['postDetail']
        request_num = data['requestNum']
        deadline = data['ddl']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if type(request_num) != int or request_num <= 0:
        return JsonResponse({'ret': False, 'error_code': 3})
    if not length.match(title):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not yyyy_mm_dd.match(deadline):
        return JsonResponse({'ret': False, 'error_code': 3})
    try:
        deadline = datetime.datetime.strptime(deadline, "%Y-%m-%d").date()
    except ValueError:
        return JsonResponse({'ret': False, 'error_code': 3})

    # 新建发布校验
    if Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
                           poster__account=account).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    new_post = Post.objects.create()
    new_post.title = title
    new_post.post_detail = post_detail
    new_post.request_num = request_num
    new_post.deadline = deadline
    new_post.poster = Post.objects.get(account=account)
    new_post.save()

    return JsonResponse({'ret': True, 'postID': str(new_post.id)})


def get_unclosed_posts(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    account = verify_token(request.META.get('AUTHORIZATION'))
    if not account:
        return JsonResponse({'ret': False, 'error_code': 5})

    unclosed_posts = Post.objects.filter(if_end=False).order_by('-post_time')
    ret_data = serializers.serialize('json', unclosed_posts, fields=(
        'title', 'post_detail', 'request_num', 'accept_num', 'deadline', 'id', 'poster'))
    return HttpResponse(json.dumps(ret_data), content_type="application/json")
