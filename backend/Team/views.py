from django.shortcuts import render
import json
from json import JSONDecodeError

from django.core.exceptions import ValidationError
from django.http import JsonResponse
from user.jwt_token import verify_token
from user.models import User
from Team.models import Invitation


def invite_user(request, user_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    inviter = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not inviter:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        invitee = User.objects.get(user_id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        old = Invitation.objects.get(inviter=inviter, invitee=invitee)
    except Invitation.DoesNotExist:
        Invitation.objects.create(inviter=inviter, invitee=invitee, state=0)
        return JsonResponse({'ret': True})
    old.state = 0
    return JsonResponse({'ret': True})