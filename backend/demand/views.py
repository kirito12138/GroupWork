import json
import re
from django.http import JsonResponse
from demand import models

length = re.compile("^.{1,19}$")
yyyy_mm_dd = re.compile("/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/")


def post(request):
    if request.method != "POST":
        return JsonResponse({'ret': False, 'error_code': 1})

    data = json.loads(request.body)
    try:
        title = data['title']
        post_detail = data['post_detail']
        request_num = data['request']
        accept_num = data['accept_num']
        deadline = data['deadline']
        if_end = data['if_end']
        poster = data['poster']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if type(request_num) != int or request_num <= 0:
        return JsonResponse({'ret': False, 'error_code': 3})
    if not length.match(title):
        return JsonResponse({'ret': False, 'error_code': 3})
    if not yyyy_mm_dd.match(deadline):
        return JsonResponse({'ret': False, 'error_code': 3})

    # 新建发布校验
    if (models.Post.objects.filter(title=title).exists() &
       models.Post.objects.filter(post_detail=post_detail).exists() &
       models.Post.objects.filter(request_num=request_num).exists() &
       models.Post.objects.filter(deadline=deadline).exists() &
       models.Post.objects.filter(poster=poster).exists()):
        return JsonResponse({'ret': False, 'error_code': 4})

    new_post = models.Post.objects.create()
    new_post.title = title
    new_post.post_detail = post_detail
    new_post.request_num = request_num
    new_post.accept_num = accept_num
    new_post.deadline = deadline
    new_post.if_end = if_end
    new_post.poster = poster
    new_post.save()

    return JsonResponse({'ret': True, 'ID': str(new_post.id)})
