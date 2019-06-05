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

def invitee_get_invitation(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    invitations = Invitation.objects.filter(invitee=user, state=0)
    ret_data = []

    # TODO 查找用户组队情况，添加至返回信息中

    for invitation in invitations:
        ret_data.append({
            'id': invitation.id,
            'name': invitation.inviter.name,
            'avatar': invitation.inviter.avatar_url,
        #     TODO 完善被邀请信息页面需要显示的邀请者信息
        })

    return JsonResponse(ret_data, safe=False)

def inviter_get_invitation(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    invitations = Invitation.objects.filter(inviter=user)
    ret_data = []
    for invitation in invitations:
        ret_data.append({
            'id': invitation.id,
            'name': invitation.inviter.name,
            'avatar': invitation.inviter.avatar_url,
            #     TODO 完善邀请信息页面需要显示的被邀请者信息
            'state': invitation.state,
        })

    return JsonResponse(ret_data, safe=False)

def accept_invitation(request, invitation_id):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        invitation = Invitation.objects.get(id=invitation_id)
    except Invitation.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    # TODO 退出已有队伍（如果有）
    # TODO 查找邀请者队伍，检查人数

    return  JsonResponse({'ret': True}) # TODO 返回加入情况

def refuse_invitation(request, invitation_id):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        invitation = Invitation.objects.get(id=invitation_id)
    except Invitation.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    invitation.state = 2

    return JsonResponse({'ret': True})
