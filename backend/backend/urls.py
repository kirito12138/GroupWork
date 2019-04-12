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

import user.views
import demand.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', user.views.login),
    path('register/', user.views.register),
    path('GetLoginStatus/', user.views.get_login_status),
    path('my/profile/', user.views.get_my_profile),
    path('my/<int:user_id>/detail/', user.views.get_user_profile),
    path('my/profile/modify/', user.views.modify_profile),
    path('my/change_password/', user.views.change_password),

    path('my/<int:user_id>/post/', demand.views.get_user_posts),
    path('f/processing/', demand.views.get_unclosed_posts),
    path('c/post/', demand.views.create_post),
    path('p/<int:post_id>/', demand.views.get_post_detail),
    path('p/<int:post_id>/modify/', demand.views.modify_post_detail),
    path('p/<int:post_id>/apply/', demand.views.get_post_applies),
    path('my/<int:user_id>/apply/', demand.views.get_user_applies),

    path('resume/upload/', demand.views.upload_resume),
    path('resume/choose/', demand.views.choose_resume),
]
