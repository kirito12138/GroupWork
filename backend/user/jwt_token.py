import jwt
from datetime import datetime, timedelta
from backend.settings import SECRET_KEY
from user.models import User


def create_token(user_id):
    payload = {
        'user_id': user_id,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(days=30),
    }
    # secret自己设定，加密字符串，放在服务器
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token


def verify_token(token):
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except:
        return None
    if 'user_id' not in payload:
        return None
    try:
        user = User.objects.get(pk=payload['user_id'])
    except User.DoesNotExist:
        return None

    return user