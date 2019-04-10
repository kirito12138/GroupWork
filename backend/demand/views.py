from django.http import JsonResponse
from django.shortcuts import render


def get_unclosed_posts(request):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})


