"""
工具文件：存放辅助的工具方法或类
"""

# 项目标签编码
PostLabelList = range(99)

# 简历加分项
ApplyPrize = {
    "特等奖":  10,
    "一等奖":  8,
    "二等奖":  6,
}

# 申请标签编码 TODO 完善项目标签种类

ApplyLabelList = range(21)


# 检查项目标签合法性
def check_postLabel(_labelList):
    for label in _labelList:
        if 0 > int(label) or 99 < int(label):
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
def rank_post(_posts):
    ret = sorted(_posts, key=lambda post:post["weight"], reverse=True)
    return ret

# TODO:申请打分
def grade_apply(_apply):
    weight = 0
    awards = _apply.awards.split('\n')
    for award in awards:
        if 10 <= len(award):
            weight += 1
    for key in ApplyPrize:
        weight += _apply.awards.count(key) * ApplyPrize[key]
    return weight

# TODO:申请排序
def rank_apply(_applies):
    ret = sorted(_applies, key=lambda post:post["weight"], reverse=True)
    return ret