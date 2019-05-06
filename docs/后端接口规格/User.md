# 用户(User)相关接口

## POST请求

### /login/ 用户登录 [已实现]

- parameter  传入的参数，用post请求，前后端都要对传入的数据进行验证。

  ```
  {
      "account":"string", // 唯一,英文字母和数字，长度不超过14，以英文开头
      "password":"string"  // 数字大小写字母，标点符号，8~14个字符
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否登录成功
      "error_code": "int" //登录失败时返回
      "ID":"string", // 登录成功时返回，用户的唯一ID
      "Token":"string" //登录成功时返回，jwt
  }
  ```

  | error_code | 含义                 |
  | ---------- | -------------------- |
  | 1          | 不是POST请求         |
  | 2          | 缺少用户名或密码     |
  | 3          | 用户名或密码格式错误 |
  | 4          | 用户名不存在         |
  | 5          | 密码错误             |

一些关于token知识的网页<https://blog.leapoahead.com/2015/09/06/understanding-jwt/>

### /login/wechat/ 微信认证登录 ，新增了用户头像和昵称 [已实现]

- parameter 

  ```
  {
      "code":"string", //前端通过wx.login获得的用户登录凭证
      "name":"string", //微信昵称
      "avatar_url":"string", //微信头像url
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否登录成功
      "error_code": "int", //登录失败时返回
      "ID":"string", // 登录成功时返回，用户的唯一ID
      "Token":"string", //登录成功时返回，jwt
  }
  ```

  | error_code | 含义                       |
  | ---------- | -------------------------- |
  | 1          | 不是POST请求               |
  | 2          | 缺少数据                   |
  | 3          | 数据格式错误               |
  | 4          | openid（code验证）获取失败 |

### /register/ 用户注册 [已实现]

- parameter

  ```
  {
      "account":"string", // 唯一,英文字母和数字，长度不超过14，以英文开头
      "password":"string",  // 数字大小写字母，标点符号，8~14个字符
      "name":"string", //真实姓名，不超过20个字符
      "age":"int", //0~200
      "studentID":"string", //数字,不超过20个字符
      "sex":"string", // 男/女 下拉菜单或单选框
      "major":"string",// 下拉菜单选择系或专业
      "grade":"string" // 下拉菜单选择年级  //可以考虑输入学号后自动填入系和年级（可以加）
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否注册成功
      "error_code": "int", //注册失败时返回
      "ID":"string", //注册成功时返回，用户的唯一ID
      "Token":"string" //注册成功时返回，jwt
  }
  ```

| error_code | 含义             |
| ---------- | ---------------- |
| 1          | 不是POST请求     |
| 2          | 缺少注册信息     |
| 3          | 注册信息格式错误 |
| 4          | 账号已存在       |

### /my/profile/modify/  修改个人信息 [已实现]

- parameter

  ```
  {
      "account":"string", // 唯一,英文字母和数字，长度不超过14，以英文开头
      "name":"string", //真实姓名，不超过20个字符
      "age":"int", //0~200
      "studentID":"string", //数字,不超过20个字符
      "sex":"string", // 男/女 下拉菜单或单选框
      "major":"string",// 下拉菜单选择系或专业
      "grade":"string" // 下拉菜单选择年级  //可以考虑输入学号后自动填入系和年级（可以加）
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否修改成功
      "error_code": "int", //修改失败时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少个人信息                                         |
| 3          | 个人信息格式错误                                     |
| 4          | 账号（用户名）已存在                                 |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

### /my/change_password/  修改密码 [已实现]

- parameter

  ```
  {
      "password":"string",  // 数字大小写字母，标点符号，8~14个字符
      "new_password":"string",  // 数字大小写字母，标点符号，8~14个字符
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否修改成功
      "error_code": "int", //修改失败时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少必要信息                                         |
| 3          | 密码格式错误                                         |
| 4          | 旧密码错误                                           |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

### /my/resume/modify/  修改个人简历 [已实现]

- parameter

  ```
  {
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
      "self_review":"string"
  }
  ```

- return

  ```
  {
      "ret":"bool", //是否修改成功
      "error_code": "int", //修改失败时返回
  }
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少信息                                             |
| 3          | 信息格式错误                                         |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

## GET请求

### /GetLoginStatus/  获取登录状态，检查header中得token返回登陆状态是否已经登陆 [已实现]

- return

  ```
  {
      "ret":"bool", //是否已经登陆过
  }
  ```

### /my/profile/ 获取当前登录用户的全部个人信息 [已实现]

- return

  ```
  {
      "ret":"bool", //是否获取成功
      "error_code":"int", //获取失败时返回
      "account":"string", // 唯一,英文字母和数字，长度不超过14，以英文开头
      "name":"string", //真实姓名，不超过20个字符
      "age":"int", //0~200
      "studentID":"string", //数字,不超过20个字符
      "sex":"string", // 男/女 下拉菜单或单选框
      "major":"string",// 下拉菜单选择系或专业
      "grade":"string", // 下拉菜单选择年级  //可以考虑输入学号后自动填入系和年级（可以加）
      "avatar_url": "string" //头像
  }
  ```

  
  | error_code | 含义                                                 |
  | ---------- | ---------------------------------------------------- |
  | 1          | 不是GET请求                                          |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

### /my/\<user_id\>/detail/ 获取该user_id的用户的全部个人信息 [已实现]

- return

```
  {
      "ret":"bool", //是否获取成功
      "error_code":"int", //获取失败时返回
      "account":"string", // 唯一,英文字母和数字，长度不超过14，以英文开头
      "name":"string", //真实姓名，不超过20个字符
      "age":"int", //0~200
      "studentID":"string", //数字,不超过20个字符
      "sex":"string", // 男/女 下拉菜单或单选框
      "major":"string",// 下拉菜单选择系或专业
      "grade":"string" // 下拉菜单选择年级  //可以考虑输入学号后自动填入系和年级（可以加）
      "avatar_url": "string" //头像
  }
```

| error_code | 含义                                                     |
| ---------- | -------------------------------------------------------- |
| 1          | 不是GET请求                                              |
| 3          | 该 ID 对应的用户不存在                                   |
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |

### /my/resume/ 获取当前登录用户的个人简历 [已实现]

- return

```
  {
      "ret":"bool",//是否获取成功
      "error_code":"int", //获取失败时返回
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
  }
```


| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
