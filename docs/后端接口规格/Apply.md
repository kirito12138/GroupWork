# 申请(Apply)相关接口

## POST请求

### /c/apply/ 提交申请，同时将简历的更改同步到个人简历中，当该帖子的已接收（同意）人数已经达到所需人数或已过截止日期时将无法提交申请 [已实现]

- parameter

  ```
  {
      "post_id":"string",  # 申请对应的帖子ID
      "name":"string",  # 不超过20个字符
      "sex":"string", # 不超过20个字符
      "age":"int", # 0~200
      "degree": "string", # 学历，不超过20个字符
      "phone":"string", # 不超过20个字符
      "email":"string", # 不超过254个字符，需符合邮箱格式
      "city":"string", # 不超过120个字符
      "edu_exp":"string", # 经历内部以&分割，经历之间以|分割
      "awards":"string", 
      "english_skill":"string",
      "project_exp":"string",
      "self_review":"string",
      "labels":"string", # 建立标签代码，以‘&’为分隔符拼接，如：1&2&3，由于未对标签格式进行规定，暂时用0-20的数字代替
       }
  ```

- return

  ```
  {
      "ret":"bool", //是否申请成功
      "error_code": "int" //申请失败时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少信息                                             |
| 3          | 信息格式错误                                         |
| 4          | 该post_id对应的帖子不存在                            |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
| 6          | 已经向该帖子发送过申请                               |
| 7          | 该帖子的已接收（同意）人数已经达到所需人数           |
| 8          | 该帖子已过截止日期                                   |
| 9          | 该帖子为外部导入，无法申请                           |

### /apply/\<apply_id\>/accept/ 同意申请，当前登录用户必须是该申请对应帖子的发布者 [已实现]

- parameter

  ```
  {
  }
  
  ```

- return

  ```
  {
      "ret":"bool", //是否同意成功
      "error_code": "int" //未成功时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 该apply_id对应的申请不存在                           |
| 3          | 当前登录用户不是是该申请的接收者                     |
| 4          | 该申请已经同意或拒绝                                  |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



### /apply/\<apply_id\>/reject/ 拒绝申请，当前登录用户必须是该申请对应帖子的发布者 [已实现]

- parameter

  ```
  {
  }
  
  ```

- return

  ```
  {
      "ret":"bool", //是否拒绝成功
      "error_code": "int" //未成功时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 该apply_id对应的申请不存在                           |
| 3          | 当前登录用户不是是该申请的接收者                     |
| 4          | 该申请已经同意或拒绝                                  |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |


## GET请求

### /p/\<post_id\>/apply/ 获取该帖子收到的所有申请及对应简历信息 [已实现]

- return 

  ```
   [
       {
        "applyID":"string",
        "applyStatus":"string", //接受（accepted），待定（waiting），结束（closed）
        "applicantID":"string",
        "applicant_account":"string",
        "name":"string",  # 不超过20个字符
        "sex":"string", # 不超过20个字符
        "age":"int", # 0~200
        "degree": "string", # 学历，不超过20个字符
        "phone":"string", # 不超过20个字符
        "email":"string", # 不超过254个字符，需符合邮箱格式
        "city":"string", # 不超过120个字符
        "edu_exp":"string", # 经历内部以&分割，经历之间以|分割
        "awards":"string", 
        "english_skill":"string",
        "project_exp":"string",
        "self_review":"string",
        "labels":"string", # 建立标签代码，以‘&’为分隔符拼接，如：1&2&3，由于未对标签格式进行规定，暂时用0-20的数字代替
  	},
       ...
   ]
  ```

 请求失败时返回

```
    {
        "ret": false,
        "error_code":"int",//获取失败时返回
  	}
```

| error_code | 含义                                                     |
| ---------- | -------------------------------------------------------- |
| 1          | 不是GET请求                                              |
| 3          | 贴子不存在                                               |
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |

### /my/\<user_id\>/apply/ 获取该ID的用户的全部申请（不返回简历信息） [已实现]

- return

  ```
   [
       {
        "applyID":"string",
        "applyStatus":"string", //接受（accepted），待定（waiting），结束（closed）
        "postID":"string",
        "post_title":"string",
        "postDetail":"string",
        "requestNum":"int",
        "acceptedNum":"int",
        "ddl":"datetime", //YYYY-MM-DD
        "ifEnd":"bool",
        "posterID":"string",
        "poster_name": "string", //帖子发布者用户名
        "poster_avatar_url": "string", //帖子发布者头像url
        "image_url": "string", //帖子的图片url，没有加上域名
        "labels":"string", # 建立标签代码，以‘&’为分隔符拼接，如：1&2&3，由于未对标签格式进行规定，暂时用0-20的数字代替
        "is_imported": "bool", # 该贴子是否为外部导入，外部导入则无法创建申请
  	},
       ...
   ]
  ```

 请求失败时返回

```
    {
        "ret": false,
        "error_code":"int",//获取失败时返回
  	}
```

| error_code | 含义                                                     |
| ---------- | -------------------------------------------------------- |
| 1          | 不是GET请求                                              |
| 3          | 该 ID 对应的用户不存在                                   |
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |

### /apply/\<apply_id\>/ 获取一个申请的状态及简历信息，当前登录用户必须是该申请的发布者或接收者 [已实现]

- return

  ```
  {
      "ret":"bool",//是否获取成功
      "applyStatus":"string", //接受（accepted），待定（waiting），结束（closed）
      
      "name":"string",  # 不超过20个字符
      "sex":"string", # 不超过20个字符
      "age":"int", # 0~200
      "degree": "string", # 学历，不超过20个字符
      "phone":"string", # 不超过20个字符
      "email":"string", # 不超过254个字符，需符合邮箱格式
      "city":"string", # 不超过120个字符
      "edu_exp":"string", # 经历内部以&分割，经历之间以|分割
      "awards":"string", 
      "english_skill":"string",
      "project_exp":"string",
      "self_review":"string",
      "labels":"string", # 建立标签代码，以‘&’为分隔符拼接，如：1&2&3，由于未对标签格式进行规定，暂时用0-20的数字代替
  }
  ```

  | error_code | 含义                                                 |
  | ---------- | ---------------------------------------------------- |
  | 1          | 不是GET请求                                          |
  | 2          | 该apply_id对应的申请不存在                           |
  | 3          | 当前登录用户不是该申请的发布者或接收者               |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

