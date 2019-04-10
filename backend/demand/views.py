import json
import re
from django.http import JsonResponse
from demand.models import Post
from user.jwt_token import verify_token
import datetime

post_title_pattern = re.compile("^.{1,20}$")
deadline_pattern = re.compile("^\d\d\d\d-\d\d-\d\d$")


def create_post(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
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
    new_post.save()

    return JsonResponse({'ret': True, 'postID': str(new_post.id)})


def get_unclosed_posts(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    unclosed_posts = Post.objects.filter(if_end=False).order_by('-post_time')
    ret_data = []
    for post in unclosed_posts:
        ret_data.append({
            "title": post.title,
            "postDetail": post.post_detail,
            "requestNum": post.request_num,
            "acceptedNum": post.accept_num,
            "ddl": post.deadline,
            "postID": post.id,
            "posterID": post.poster.id,
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
         'posterID': str(post.poster.id)})
