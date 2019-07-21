"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

import user.views
import demand.views
import Team.views

urlpatterns = [
    path('admin/', admin.site.urls),

    # path('login/', user.views.login),
    path('login/wechat/', user.views.wechat_login),
    # path('register/', user.views.register),
    path('GetLoginStatus/', user.views.get_login_status),
    # path('my/change_password/', user.views.change_password),

    path('my/profile/', user.views.get_my_profile),
    path('my/profile/modify/', user.views.modify_my_profile),
    path('my/resume/', user.views.get_my_resume),

    path('my/resume/modify/', user.views.modify_my_resume),
    path('my/<int:user_id>/detail/', user.views.get_user_profile),
    path('my/<int:user_id>/post/', demand.views.get_user_posts),
    path('my/<int:user_id>/apply/', demand.views.get_user_applies),

    path('f/processing/', demand.views.get_unclosed_posts),
    path('f/processing/search/', demand.views.get_unclosed_posts_by_key),
    path('f/processing/<str:label>/', demand.views.get_unclosed_posts_by_label),
    path('c/post/', demand.views.create_post),
    path('p/<int:post_id>/upload_image/', demand.views.upload_post_image),

    path('p/<int:post_id>/', demand.views.get_post_detail),
    path('p/<int:post_id>/modify/', demand.views.modify_post_detail),
    path('p/<int:post_id>/delete/', demand.views.delete_post),
    path('p/<int:post_id>/apply/', demand.views.get_post_applies),

    path('c/apply/', demand.views.create_apply),
    path('apply/<int:apply_id>/', demand.views.get_apply_detail),
    path('apply/<int:apply_id>/accept/', demand.views.accept_apply),
    path('apply/<int:apply_id>/reject/', demand.views.reject_apply),

    path('mcm/modify/info/', Team.views.modify_mcm_info),
    path('mcm/get/info/', Team.views.get_mcm_info),
    path('mcm/search/user/', Team.views.search_user),
    path('mcm/team/', Team.views.get_team_users),
    path('mcm/team/export/', Team.views.export_team_info),
    path('mcm/quit/', Team.views.quit_team),
    path('mcm/match/', Team.views.get_matched_users),
    path('mcm/score/', Team.views.submit_score),

    path('mcm/invite/<int:user_id>/', Team.views.invite_user),
    path('mcm/invitations/send/', Team.views.inviter_get_invitation),
    path('mcm/invitations/received/', Team.views.invitee_get_invitation),
    path('mcm/refuse/<int:invitation_id>/', Team.views.refuse_invitation),
    path('mcm/accept/<int:invitation_id>/', Team.views.accept_invitation),

    path('signature/upyun/', user.views.get_upyun_signature),
] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

