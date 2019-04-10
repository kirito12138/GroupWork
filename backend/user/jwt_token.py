import jwt
from datetime import datetime, timedelta

from backend.settings import SECRET_KEY


def create_token(account):
    payload = {
        'account': account,
        'iat': datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(days=30),
    }
    # secret自己设定，加密字符串，放在服务器
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token


def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except:
        return None

    if 'account' in payload:
        return payload['account']
    else:
        return None
