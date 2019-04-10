import json
import re
from django.http import JsonResponse
from demand import models

length = re.compile("^.{1,20}$")
yyyy_mm_dd = re.compile("^\d\d\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$")


def post(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    data = json.loads(request.body)
    try:
        title = data['title']
        post_detail = data['postDetail']
        request_num = data['requestNum']
        deadline = data['ddl']
        poster_id = data['posterID']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        poster_id = int(poster_id)
    except ValueError:
        return JsonResponse({'ret': False, 'error_code': 3})

    if type(request_num) != int or request_num <= 0:
        return JsonResponse({'ret': False, 'error_code': 3})
    if not length.match(title):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not yyyy_mm_dd.match(deadline):
        return JsonResponse({'ret': False, 'error_code': 3})

    # 新建发布校验
    if models.Post.objects.filter(title=title, post_detail=post_detail, request_num=request_num, deadline=deadline,
                                  poster_id=poster_id).exists():
        return JsonResponse({'ret': False, 'error_code': 4})

    new_post = models.Post.objects.create()
    new_post.title = title
    new_post.post_detail = post_detail
    new_post.request_num = request_num
    new_post.deadline = deadline
    new_post.poster = models.Post.objects.get(id=poster_id)
    new_post.save()

    return JsonResponse({'ret': True, 'ID': str(new_post.id)})


def get_unclosed_posts(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})
