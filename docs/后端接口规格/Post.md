## post 请求

##### /c/post/  发布帖子 [已实现]

- header

  ```
  {
      "Authorization": "Token值"
  }
  ```

- parameter

  ```
    {
        "title":"string", //标题  : 20字符之内 （可以根据前端需求调整）
        "postDetail":"string",//内容 : text类型，无字数限制
        "requestNum":"int", //所需人数 : >0
        "ddl":"datetime", //结束时间 ：以 YYYY-MM-DD 的形式传递
    }
  ```

- return

  ```
  {
      "ret":"bool", //是否发布成功 True，False
      "postID":"string", // 帖子ID
      "error_code":"int",//发布失败时返回
  }
  ```

  | error_code | 含义                                                         |
  | ---------- | ------------------------------------------------------------ |
  | 1          | 不是POST请求                                                 |
  | 2          | 缺少必要信息                                                 |
  | 3          | 信息格式错误                                                 |
  | 4          | 帖子已存在，判断title，postDetail，requestNum，ddl，posterID都一样时为已存在 |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期）         |



##### /p/<post_id>/modify/   修改一个帖子的的信息，该帖子的发布者必须是当前登陆的用户 [已实现]

- parameter

  ```
    {
        "title":"string",
        "postDetail":"string",
        "requestNum":"int",
        "ddl":"datetime", //YYYY-MM-DD
    }
  ```

- return 

  ```
  "ret":"bool", //是否修改成功
  "error_code": "int" 
  ```

  | error_code | 含义                                                 |
  | ---------- | ---------------------------------------------------- |
  | 1          | 不是POST请求                                         |
  | 2          | 缺少必要信息                                         |
  | 3          | 信息格式错误                                         |
  | 4          | post_id不存在                                        |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
  | 6          | post不属于当前用户                                   |

## get请求

##### /f/processing/ 获取所有未结束请求，按时间先后顺序，时间最近的在第一条 [已实现]

- return

  ```
  [
      {
          "title":"string",
          "postDetail":"string",
          "requestNum":"int",
          "acceptedNum":"int", //目前已经接收的人数
          "ddl":"datetime", //YYYY-MM-DD
          "postID":"string",
          "posterID":"string",
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
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |



##### /p/<post_id>/ 获取该帖子的详情 [已实现]

- return

  ```
    {
        "ret":"bool",//是否获取成功
        "error_code":"int",//获取失败时返回
        "title":"string",
        "postDetail":"string",
        "requestNum":"int",
        "acceptedNum":"int",
        "ddl":"datetime", //YYYY-MM-DD
        "ifEnd":"bool",
        "postID":"string",
        "posterID":"string",
  	}
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 3          | 贴子不存在                                           |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |



##### /my/\<ID\>/post/ 获取该ID的用户的全部发布[已实现]

- return

  ```
  [
      {
          "title":"string",
          "postDetail":"string",
          "requestNum":"int",
          "acceptedNum":"int",
          "ddl":"datetime", //YYYY-MM-DD
          "ifEnd":"bool",
          "postID":"string",
          "posterID":"string",
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