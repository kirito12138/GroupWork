import requests

from backend.settings import APP_ID, APP_SECRET, APP_ID_URL


def get_openid(js_code):
    url = APP_ID_URL + "?appid=" + APP_ID + "&secret=" + APP_SECRET \
          + "&js_code=" + js_code + "&grant_type=authorization_code"
    r = requests.get(url)
    data = r.json()
    if 'errcode' not in data or data['errcode'] == 0:
        return data['openid']
    return None
