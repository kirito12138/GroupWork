import codecs
import csv

import json
from json import JSONDecodeError

from django.core.exceptions import ValidationError
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_protect

from user.jwt_token import verify_token
from user.models import User
from Team.models import Invitation, McmInfo, Team


def invite_user(request, user_id):
    if request.method != "GET":
        return JsonResponse({'ret': False, 'error_code': 1})

    inviter = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not inviter:
        return JsonResponse({'ret': False, 'error_code': 5})

    try:
        invitee = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({'ret': False, 'error_code': 3})

    if invitee.mcm_info:
        if invitee.mcm_info.team_id == inviter.mcm_info.team_id:
            return JsonResponse({'ret': False, 'error_code': 4})
    else:
        return JsonResponse({'ret': False, 'error_code': 3})

    try:
        old = Invitation.objects.get(inviter=inviter, invitee=invitee)
    except Invitation.DoesNotExist:
        Invitation.objects.create(inviter=inviter, invitee=invitee, state=0)
        return JsonResponse({'ret': True})
    old.state = 0
    old.save()
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
            'if_attend_training': invitation.inviter.mcm_info.if_attend_training,
            'goal': invitation.inviter.mcm_info.goal,
            'academy': invitation.inviter.mcm_info.academy,
            'enrollment_year': invitation.inviter.mcm_info.enrollment_year,
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
            'name': invitation.invitee.mcm_info.name,
            'avatar': invitation.invitee.avatar_url,
            'major': invitation.invitee.mcm_info.major,
            'undergraduate_major': invitation.invitee.mcm_info.undergraduate_major,
            'phone': invitation.invitee.mcm_info.phone,
            'email': invitation.invitee.mcm_info.email,
            'experience': invitation.invitee.mcm_info.experience,
            'skill': invitation.invitee.mcm_info.skill,
            'if_attend_training': invitation.inviter.mcm_info.if_attend_training,
            'goal': invitation.invitee.mcm_info.goal,
            'academy': invitation.invitee.mcm_info.academy,
            'enrollment_year': invitation.invitee.mcm_info.enrollment_year,
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

    sum_user_teammate = McmInfo.objects.filter(team=user.mcm_info.team).count()

    # 检查本用户是否为队伍
    if sum_user_teammate > 1:
        # 检查本用户是否为队长
        if user.mcm_info.is_captain:
            mcm_info = user.mcm_info.team.mcminfo_set.exclude(user=user).first()
            mcm_info.is_captain = True
            mcm_info.save()
    else:
        user.mcm_info.team.delete()

    user.mcm_info.team = invitation.inviter.mcm_info.team
    user.mcm_info.is_captain = False
    invitation.state = 1
    user.mcm_info.save()
    invitation.save()

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
    invitation.save()

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
        mcm_info.academy = data['academy']
        mcm_info.enrollment_year = data['enrollment_year']
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
    resume.email = mcm_info.email
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
        'academy': mcm_info.academy,
        'enrollment_year': mcm_info.enrollment_year,
    })


def search_user(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    name = request.GET.get('name')
    if not name:
        return JsonResponse({'ret': False, 'error_code': 2})

    mcm_info_set = McmInfo.objects.filter(name__contains=name, is_integrated=True).exclude(team=user.mcm_info.team)

    ret_data = []
    for mcm_info in mcm_info_set:
        if not mcm_info.user.invitations_received.filter(inviter=user, state=0).exists():
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
                'academy': mcm_info.academy,
                'enrollment_year': mcm_info.enrollment_year,
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

    mcm_info_set = user.mcm_info.team.mcminfo_set.exclude(user=user)
    if mcm_info_set.exists():
        if user.mcm_info.is_captain:  # 队长退队之后将队长职位传递给下一个成员
            mcm_info = mcm_info_set.first()
            mcm_info.is_captain = True
            mcm_info.save()
        user.mcm_info.team = Team.objects.create()
        user.mcm_info.is_captain = True
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

    mcm_info_set = McmInfo.objects.filter(is_integrated=True, score__gt=-1).exclude(team=user.mcm_info.team)

    ret_data = []
    for mcm_info in mcm_info_set:
        if not mcm_info.user.invitations_received.filter(inviter=user, state=0).exists():
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
                'academy': mcm_info.academy,
                'enrollment_year': mcm_info.enrollment_year,
                'weight': abs(mcm_info.score - user.mcm_info.score),
                'ifShow': False,
            })
    ret_data = sorted(ret_data, key=lambda info: info['weight'])[:15]
    return JsonResponse(ret_data, safe=False)


def export_team_info(request):
    if request.method != 'GET':
        return JsonResponse({'ret': False, 'error_code': 1})

    user = verify_token(request.META.get('HTTP_AUTHORIZATION'))
    if not user:
        return JsonResponse({'ret': False, 'error_code': 5})

    response = HttpResponse(content_type='text/csv')
    response.write(codecs.BOM_UTF8)
    response['Content-Disposition'] = 'attachment; filename="team_{}_info.csv"'.format(user.mcm_info.team.id)

    writer = csv.writer(response)
    writer.writerow(['姓名', '本科专业', '现就读专业', '现所属学院', '入学年份', '联系电话', '邮箱', '本人能力侧重', '参赛目标'])
    mcm_info_set = user.mcm_info.team.mcminfo_set.all().values_list('name', 'undergraduate_major', 'major', 'academy',
                                                                    'enrollment_year', 'phone', 'email', 'skill',
                                                                    'goal')
    for mcm_info in mcm_info_set:
        writer.writerow(mcm_info)

    return response


@csrf_protect
def download_team_info(request):
    if not request.session.get('is_login', None):
        # request.session['message'] = "您尚未登录！"
        return redirect("/login/")

    if request.method == "POST":
        response = HttpResponse(content_type='text/csv')
        response.write(codecs.BOM_UTF8)
        response['Content-Disposition'] = 'attachment; filename="all_team_info.csv"'

        writer = csv.writer(response)
        writer.writerow(['队伍编号', '姓名', '本科专业', '现就读专业', '现所属学院', '入学年份', '联系电话', '邮箱', '本人能力侧重', '参赛目标'])

        mcm_info_set = McmInfo.objects.all().order_by('team_id').values_list(
            'team_id', 'name', 'undergraduate_major', 'major', 'academy', 'enrollment_year', 'phone', 'email', 'skill',
            'goal')
        for mcm_info in mcm_info_set:
            writer.writerow(mcm_info)
        return response

    return render(request, 'team/download_team_info.html', locals())
