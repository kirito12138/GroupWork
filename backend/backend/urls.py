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
    path('my/profile/', user.views.get_my_profile),
    path('my/<int:user_id>/detail/', user.views.get_profile),
    path('my/profile/modify/', user.views.modify_profile),
    path('c/post/', demand.views.create_post),
    path('f/processing/', demand.views.get_unclosed_posts),
    path('p/<int:post_id>/', demand.views.get_post_detail),
    path('GetLoginStatus/', user.views.get_login_status),
]
