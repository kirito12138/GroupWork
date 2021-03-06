## Gamma阶段接口设计

### mcm/modify/info/（已实现）

- 类型：POST
- 说明：修改美赛相关个人信息
- 参数：所有参数都不能为空

```
{
        "name": "string",  # 姓名，不超过20个字符
        "major":"string",  # 现就读专业,不超过64个字符
        "undergraduate_major": "string",  # 本科专业,不超过64个字符
        "phone": "string",  # 电话，不超过20个字符
        "email": "string",  # 邮箱，不超过254个字符，需符合邮箱格式
        "experience": "string",  # 与数学建模及相关方面的培训参赛经历及获奖情况说明,
        "skill": "string",  # 技能（本人能力侧重：建模，编程，写作)，不超过32个字符
        "if_attend_training": "bool",  # 能否全程参加暑假培训
        "goal": "string",  # 参赛目标，不超过128个字符
        "academy": "string",  # 现就读学院,不超过64个字符
        "enrollment_year": "string"  # 入学年份,不超过4个数字
}
```

- 返回：

```
{
    "ret":"bool", # 是否修改成功
    "error_code": "int", # 修改失败时返回
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少必要信息                                         |
| 3          | 信息格式错误                                         |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/get/info/（已实现）

* 类型：GET
* 说明：获取美赛个人信息
* 参数：无
* 返回：美赛个人信息

```
{
        "ret":"bool", # 是否获取成功
        "error_code": "int", # 获取失败时返回
        "name": "string",  # 姓名，不超过20个字符
        "major":"string",  # 现就读专业,不超过64个字符
        "undergraduate_major": "string",  # 本科专业,不超过64个字符
        "phone": "string",  # 电话，不超过20个字符
        "email": "string",  # 邮箱，不超过254个字符，需符合邮箱格式
        "experience": "string",  # 与数学建模及相关方面的培训参赛经历及获奖情况说明,
        "skill": "string",  # 技能（本人能力侧重：建模，编程，写作)，不超过32个字符
        "if_attend_training": "bool",  # 能否全程参加暑假培训
        "goal": "string",  # 参赛目标，不超过128个字符
        "academy": "string",  # 现就读学院,不超过64个字符
        "enrollment_year": "string"  # 入学年份,不超过4个数字
}
```
| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                         |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/search/user/（已实现）

* 类型：GET
* 说明：根据用户姓名搜索用户
* 参数：用户姓名

```
{
    "name":"string",  # 姓名，不超过20个字符
}
```

* 返回：成功时返回搜索结果（美赛信息完整且用户名中包含name的用户list，包含美赛个人信息）

```
[
    {
        "user_id": "string",  # 用户ID,
        "avatar_url": "string",  # 用户头像url
        "name": "string",  # 姓名，不超过20个字符
        "major":"string",  # 现就读专业,不超过64个字符
        "undergraduate_major": "string",  # 本科专业,不超过64个字符
        "phone": "string",  # 电话，不超过20个字符
        "email": "string",  # 邮箱，不超过254个字符，需符合邮箱格式
        "experience": "string",  # 与数学建模及相关方面的培训参赛经历及获奖情况说明,
        "skill": "string",  # 技能（本人能力侧重：建模，编程，写作)，不超过32个字符
        "if_attend_training": "bool",  # 能否全程参加暑假培训
        "goal": "string"  # 参赛目标，不超过128个字符
        "academy": "string",  # 现就读学院,不超过64个字符
        "enrollment_year": "string"  # 入学年份,不超过4个数字
    },
    ......
]
```

失败时返回

```
{
    "ret":false,
    "error_code": "int", # 修改失败时返回
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 2          | 缺少必要参数                                         |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/team/（已实现）

* 类型：GET

  说明：获取用户的队伍信息

* 参数：无

* 返回：美赛信息是否完整，成功时返回该用户的队伍（用户list）

```
[
    {
        "user_id": "string",  # 用户ID,
        "avatar_url": "string",  # 用户头像url
        "name": "string",  # 姓名，不超过20个字符
        "skill": "string",  # 技能，职位（本人能力侧重：建模，编程，写作)，不超过32个字符
        "is_captain": "bool",  # 是否是队长 
        "is_self": "bool"  # 是否是当前用户 
    },
    ......
]
```

失败时返回

```
{
    "ret":false,
    "error_code": "int", # 修改失败时返回
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 2          | 美赛信息不完整                                       |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/quit/（已实现）

* 类型：POST
* 说明：退出当前队伍
* 参数：无
* 返回：

```
{
    "ret":"bool", # 是否退出成功
    "error_code": "int", # 退出失败时返回
}
```
| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 美赛信息不完整                                       |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/match/（已实现）

* 类型：GET
* 说明：返回与当前用户分数最近的15个用户，该用户必须需首先填写问卷
* 参数：无
* 返回：成功时返回与当前用户分数最近的15个用户

```
[
    {
        "user_id": "string",  # 用户ID,
        "avatar_url": "string",  # 用户头像url
        "name": "string",  # 姓名，不超过20个字符
        "major":"string",  # 现就读专业,不超过64个字符
        "undergraduate_major": "string",  # 本科专业,不超过64个字符
        "phone": "string",  # 电话，不超过20个字符
        "email": "string",  # 邮箱，不超过254个字符，需符合邮箱格式
        "experience": "string",  # 与数学建模及相关方面的培训参赛经历及获奖情况说明,
        "skill": "string",  # 技能（本人能力侧重：建模，编程，写作)，不超过32个字符
        "if_attend_training": "bool",  # 能否全程参加暑假培训
        "goal": "string",  # 参赛目标，不超过128个字符
        "academy": "string",  # 现就读学院,不超过64个字符
        "enrollment_year": "string",  # 入学年份,不超过4个数字
        "ifShow": false
    },
    ......
]
```

失败时返回

```
{
    "ret":false,
    "error_code": "int", # 修改失败时返回
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 2          | 美赛信息不完整                                       |
| 3          | 没填问卷，没有分数                                   |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/score/（已实现）

* 类型：POST
* 说明：提交问卷的分数
* 参数：分数

```
{
    "score": "int" # 整数类型，大于等于0
}
```

* 返回：无


| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少参数                                             |
| 3          | 参数格式不为json                                     |
| 4          | score不为整数或小于0                                 |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### mcm/invite/<user_id>/（已实现）

* 类型：GET
* 说明：邀请指定id的用户组队
* 参数：无
* 返回：
  * True：邀请成功
  * False：邀请失败

|错误码|说明|
|:-|:-|
|1|不为GET请求|
|3|被邀请者信息错误|
|4|不能邀请队友|
|5|用户未登录|

### mcm/invitations/send/（已实现）
* 类型：GET
* 说明：获取本用户发出的所有邀请
* 参数：无
* 返回：
  * True：该用户的所有邀请（时间有近至远排序）
  ```
  {
      {
          'id': 邀请ID,
          'name': 被邀请者姓名,
          'avatar': 被邀请者头像链接,
          'major': 被邀请者专业,
          'undergraduate_major': 被邀请者本科专业,
          'phone': 被邀请者电话,
          'email': 被邀请者邮箱,
          'experience': 被邀请者经历,
          'skill': 被邀请者技能,
          'goal': 被邀请者获奖情况,
          "academy": "string",  # 现就读学院,不超过64个字符
          "enrollment_year": "string",  # 入学年份,不超过4个数字
          'team_id': 被邀请者所在队伍ID,
          'state':邀请状态 0-未反馈；1-接收；2-拒绝
          'isShow'：false,
      },
      ......
  }
  ```
  * False：

|错误码|说明|
|:-|:-|
|1|不为GET请求|
|3|本用户未登记美赛信息|
|5|用户未登录|

### mcm/invitations/received/ （已实现）
* 类型：GET
* 说明：获取本用户收到的所有邀请，过滤已处理的邀请，**附带本用户组队的状态**
* 参数：无
* 返回：
  * True：邀请列表，本用户是否已组队
  ```
  {
      {
          'team_id': 本用户队伍ID,
      },
      {
          'id': 邀请ID,
          'name': 邀请者姓名,
          'avatar': 邀请者头像链接,
          'major': 邀请者专业,
          'undergraduate_major': 邀请者本科专业,
          'phone': 邀请者电话,
          'email': 邀请者邮箱,
          'experience': 邀请者经历,
          'skill': 邀请者技能,
          'goal': 邀请者获奖情况,
          "academy": "string",  # 现就读学院,不超过64个字符
          "enrollment_year": "string",  # 入学年份,不超过4个数字
          'team_id': 邀请者所在队伍ID,
          'isShow'：false,
      },
      ......
  }
  ```
  * False：

|错误码|说明|
|:-|:-|
|1|不为GET请求|
|5|用户未登录|

### mcm/refuse/<invitation_id>/（已实现）
* 类型：GET
* 说明：拒绝某邀请
* 参数：无
* 返回：
  * True：成功拒绝邀请
  * False：

|错误码|说明|
|:-|:-|
|1|不为GET请求|
|3|邀请信息缺失|
|5|用户未登录|

### mcm/accept/<invitation_id>/（已实现）
* 说明：接收某邀请，进行组队
* 参数：无
* 返回：
  * True：接收邀请，成功加入队伍
  * False：
  
|错误码|说明|
|:-|:-|
|1|不为GET请求|
|2|将加入的队伍已满员|
|3|邀请信息缺失|
|5|用户未登录|


### mcm/team/export/（已实现）

* 类型：GET

  说明：导出用户的队伍信息

* 参数：无

* 返回：成功时返回一个csv文件，命名为team_id_info.csv

失败时返回

```
{
    "ret":false,
    "error_code": "int", # 修改失败时返回
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
