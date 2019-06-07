from django.shortcuts import render
import json
from json import JSONDecodeError

from django.core.exceptions import ValidationError
from django.http import JsonResponse
from user.jwt_token import verify_token
from user.models import User, Resume
from Team.models import Invitation, McmInfo, Team


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

    # 检查本用户是否有美赛信息
    mcm_info = user.mcm_info
    if not mcm_info:
        return JsonResponse({'ret': False, 'error_code': 3})

    ret_data = [{'team_id': user.mcm_info.team_id}]
    for invitation in invitations:
        ret_data.append({
            'id': invitation.id,
            'name': invitation.inviter.mcm_info.name,
            'avatar': invitation.inviter.avatar_url,
            'major': invitation.inviter.mcm_info.major,
            'undergraduate_major': invitation.inviter.mcm_info.undergraduate_major,
            'phone': invitation.inviter.mcm_info.phone,
            'email': invitation.inviter.mcm_info.email,
            'experience': invitation.inviter.mcm_info.experience,
            'skill': invitation.inviter.mcm_info.skill,
            # 'if_attend_training': invitation.inviter.mcm_info.if_attend_training,
            'goal': invitation.inviter.mcm_info.goal,
            'team_id': invitation.inviter.mcm_info.team_id,
            'isShow': False,
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
            'name': invitation.inviter.mcm_info.name,
            'avatar': invitation.inviter.avatar_url,
            'major': invitation.inviter.mcm_info.major,
            'undergraduate_major': invitation.inviter.mcm_info.undergraduate_major,
            'phone': invitation.inviter.mcm_info.phone,
            'email': invitation.inviter.mcm_info.email,
            'experience': invitation.inviter.mcm_info.experience,
            'skill': invitation.inviter.mcm_info.skill,
            # 'if_attend_training': invitation.inviter.mcm_info.if_attend_training,
            'goal': invitation.inviter.mcm_info.goal,
            'state': invitation.state,
            'isShow': False,
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

    # 查找邀请者队伍，检查人数
    if McmInfo.objects.filter(team=invitation.inviter.mcm_info.team).count() >= 3:
        return JsonResponse({'ret': False, 'error_code': 2})

    # 检查本用户是否为队伍
    if McmInfo.objects.filter(team=user.mcm_info.team).count() > 1:
        # 检查本用户是否为队长
        if user.mcm_info.is_captain:
            return JsonResponse({'ret': False, 'error_code': 4})

    user.mcm_info.team = invitation.inviter.mcm_info.team
    user.mcm_info.is_captain = False

    return JsonResponse({'ret': True})


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


def modify_mcm_info(request):
    if request.method != 'POST':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    mcm_info = user.mcm_info
    try:
        mcm_info.name = data['name']
        mcm_info.major = data['major']
        mcm_info.undergraduate_major = data['undergraduate_major']
        mcm_info.phone = data['phone']
        mcm_info.email = data['email']
        mcm_info.experience = data['experience']
        mcm_info.skill = data['skill']
        mcm_info.if_attend_training = data['if_attend_training']
        mcm_info.goal = data['goal']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    try:
        mcm_info.full_clean()  # 检查格式
        mcm_info.save()
    except ValidationError:
        return JsonResponse({'ret': False, 'error_code': 3})

    mcm_info.is_integrated = True
    mcm_info.save()

    # 同步修改个人信息
    user.name = mcm_info.name
    user.save()
    resume = user.resume
    resume.name = user.name
    resume.phone = mcm_info.phone
    resume.email = mcm_info.phone
    resume.save()

    return JsonResponse({'ret': True})


def get_mcm_info(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    mcm_info = user.mcm_info
    return JsonResponse({
        'ret': True,
        'name': mcm_info.name,
        'major': mcm_info.major,
        'undergraduate_major': mcm_info.undergraduate_major,
        'phone': mcm_info.phone,
        'email': mcm_info.email,
        'experience': mcm_info.experience,
        'skill': mcm_info.skill,
        'if_attend_training': mcm_info.if_attend_training,
        'goal': mcm_info.goal,
    })


def search_user(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    # name = request.GET.get('name')
    # if not name:
    #     return JsonResponse({'ret': False, 'error_code': 2})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        name = data['name']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    mcm_info_set = McmInfo.objects.filter(name__contains=name, is_integrated=True)
    ret_data = []
    for mcm_info in mcm_info_set:
        ret_data.append({
            'user_id': str(mcm_info.user.id),
            'avatar_url': mcm_info.user.avatar_url,
            'name': mcm_info.name,
            'major': mcm_info.major,
            'undergraduate_major': mcm_info.undergraduate_major,
            'phone': mcm_info.phone,
            'email': mcm_info.email,
            'experience': mcm_info.experience,
            'skill': mcm_info.skill,
            'if_attend_training': mcm_info.if_attend_training,
            'goal': mcm_info.goal,
        })
    return JsonResponse(ret_data, safe=False)


def get_team_users(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if not user.mcm_info.is_integrated:  # 美赛信息不完整
        return JsonResponse({'ret': False, 'error_code': 2})

    mcm_info_set = user.mcm_info.team.mcminfo_set.all()
    ret_data = []
    for mcm_info in mcm_info_set:
        ret_data.append({
            'user_id': str(mcm_info.user.id),
            'name': mcm_info.name,
            'avatar_url': mcm_info.user.avatar_url,
            'skill': mcm_info.skill,
            'is_captain': mcm_info.is_captain,
            'is_self': mcm_info == user.mcm_info,
        })
    return JsonResponse(ret_data, safe=False)


def quit_team(request):
    if request.method != 'POST':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if not user.mcm_info.is_integrated:  # 美赛信息不完整
        return JsonResponse({'ret': False, 'error_code': 2})

    if user.mcm_info.is_captain:  # 队长不能退队
        return JsonResponse({'ret': False, 'error_code': 3})

    user.mcm_info.team = Team.objects.create()
    user.mcm_info.save()
    return JsonResponse({'ret': True})


def submit_score(request):
    if request.method != 'POST':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        data = json.loads(request.body)
    except JSONDecodeError:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        score = data['score']
    except KeyError:
        return JsonResponse({'ret': False, 'error_code': 2})

    if type(score) != int or score < 0:
        return JsonResponse({'ret': False, 'error_code': 4})

    user.mcm_info.score = score
    user.mcm_info.save()
    return JsonResponse({'ret': True})


def get_matched_users(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    if not user.mcm_info.is_integrated:  # 美赛信息不完整
        return JsonResponse({'ret': False, 'error_code': 2})

    if user.mcm_info.score == -1:  # 没填问卷，没有分数
        return JsonResponse({'ret': False, 'error_code': 3})

    mcm_info_set = McmInfo.objects.filter(is_integrated=True, score__gt=-1).exclude(user=user)
    ret_data = []
    for mcm_info in mcm_info_set:
        ret_data.append({
            'user_id': str(mcm_info.user.id),
            'avatar_url': mcm_info.user.avatar_url,
            'name': mcm_info.name,
            'major': mcm_info.major,
            'undergraduate_major': mcm_info.undergraduate_major,
            'phone': mcm_info.phone,
            'email': mcm_info.email,
            'experience': mcm_info.experience,
            'skill': mcm_info.skill,
            'if_attend_training': mcm_info.if_attend_training,
            'goal': mcm_info.goal,
            'weight': abs(mcm_info.score - user.mcm_info.score),
            'ifShow': False,
        })
    ret_data = sorted(ret_data, key=lambda info: info['weight'])[:15]
    return JsonResponse(ret_data, safe=False)
