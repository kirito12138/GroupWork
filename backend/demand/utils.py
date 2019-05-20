"""
工具文件：存放辅助的工具方法或类
"""

# 项目标签编码
PostLabelList = [
    '0101',
    '0201','0202','0203','0204',
    '0301','0302','0303','0304','0305','0306',
    '0401','0402',
    '0501','0502','0503',
    '0601',
    '0701','0702','0703','0704','0705','0706','0707','0708','0709','0710','0711','0712',
    '0801','0802L','0803','0804','0805','0806','0807','0808','0809','0810','0811','0812','0813','0814','0815','0816','0817','0818','0819','0820','0821','0822','0823','0824','0825','0826','0827','0828','0829','0830','0831',
    '0901','0902','0903','0904','0905','0906','0907',
    '1001','1002','1003','1004','1005','1006','1007','1008','1009','1010','1011',
    '1201','1202','1203','1204','1205','1206','1207','1208','1209',
    '1301','1302','1303','1304','1305',
    '9001','9002','9003','9004','9005','9006','9007',
]

# 申请标签编码 TODO 完善项目标签种类

ApplyLabelList = range(21)


# 检查项目标签合法性
def check_postLabel(_labelList):
    try:
        for label in _labelList:
            PostLabelList.index(label)
    except ValueError:
        return False
    return True

# 检查申请标签合法性 TODO 修改检测逻辑
def check_applyLabel(_labelList):
    for label in _labelList:
        if 0 > int(label) or 20 < int(label):
            return False
    return True

# 标签解析
def decode_label(_str):
    labelList = _str.split('&')
    return labelList

# 标签压缩
def encode_label(_QuerySet):
    labels = []
    for obj in _QuerySet:
        labels.append(obj.label)
    labels = '&'.join(labels)
    return labels

# TODO:项目排序
def rank_post(_posts, _history):
    return _posts

# TODO:申请打分
def grade_apply(_apply):
    pass

# TODO:申请排序
def rank_apply(_applies):
    return _applies