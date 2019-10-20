#!/usr/bin/env python3
# _*_ coding:utf-8 _*_
import hashlib
import sys

from backend.settings import SECRET_KEY


def gen_md5(s, salt='9527'):  # 加盐
    s += salt
    md5 = hashlib.md5()
    md5.update(s.encode(encoding='utf-8'))  # update方法只接收bytes类型
    return md5.hexdigest()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        for arg in sys.argv[1:]:
            print(gen_md5(arg, SECRET_KEY))
