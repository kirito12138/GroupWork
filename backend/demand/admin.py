from django.contrib import admin
from demand import models

admin.site.register(models.Post)
admin.site.register(models.Apply)
admin.site.register(models.PostLabel)
admin.site.register(models.ApplyLabel)
