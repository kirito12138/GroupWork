# 帖子(Post)相关接口

## POST请求

### /c/post/  发布帖子 [已实现]

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
        "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
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

### p/\<post_id\>/upload_image/ 上传图片接口 [已实现]

通过wx.uploadFile接口上传， `content-type` 为 `multipart/form-data`，，header中需添加token，name参数为‘image’。

- return 

```
{
    "ret":"bool", //是否上传成功
    "error_code": "int" 
    "image_url": 文件上传的url，不含域名域名
}
```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是POST请求                                         |
| 2          | 缺少必要信息                                         |
| 3          | 信息格式错误                                         |
| 4          | post_id不存在                                        |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
| 6          | post不属于当前用户                                   |

### /p/\<post_id\>/modify/   修改一个帖子的的信息，该帖子的发布者必须是当前登陆的用户 [已实现]

- parameter

  ```
    {
        "title":"string",
        "postDetail":"string",
        "requestNum":"int",
        "ddl":"datetime", //YYYY-MM-DD
        "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
    }
  ```

- return 

  ```
  {
      "ret":"bool", //是否修改成功
      "error_code": "int"
  }
  ```
  
  | error_code | 含义                                                 |
  | ---------- | ---------------------------------------------------- |
  | 1          | 不是POST请求                                         |
  | 2          | 缺少必要信息                                         |
  | 3          | 信息格式错误                                         |
  | 4          | post_id不存在                                        |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
  | 6          | post不属于当前用户                                   |


### /p/\<post_id\>/delete/   删除一个帖子及其对应的申请，该帖子的发布者必须是当前登陆的用户，返回该用户发布的所有帖子 [已实现]

- parameter

  ```
    {
 
    }
  ```

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
          "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
          "poster_name": "string", //发布者用户名
          "poster_avatar_url": "string", //发布者头像url
          "image_url": "string", //帖子的图片url，没有加上域名
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
  
  | error_code | 含义                                                 |
  | ---------- | ---------------------------------------------------- |
  | 1          | 不是POST请求                                         |
  | 4          | post_id不存在                                        |
  | 5          | 用户未登录（未检测到token）或登录已过期（token过期） |
  | 6          | post的发布者不是当前用户                                   |


### /f/processing/  获取所有未结束的帖子，按时间先后顺序，时间最近的在第一条，**根据历史信息将相关项目提前** [已实现]

- parameter

  ```
    {
        "history":"string",   // 用户浏览的历史纪录，使用Post的ID值并用‘&’进行分隔，如：1&2&3&4
    }
  ```

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
          "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
          "poster_name": "string", //发布者用户名
          "poster_avatar_url": "string", //发布者头像url
          "image_url": "string", //帖子的图片url，没有加上域名
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
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |

## GET请求

### /f/processing/\<label\>/  获取某一标签所有未结束的帖子，按时间先后顺序，时间最近的在第一条，**根据历史信息将相关项目提前** [已实现]

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
          "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
          "poster_name": "string", //发布者用户名
          "poster_avatar_url": "string", //发布者头像url
          "image_url": "string", //帖子的图片url，没有加上域名
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
| 5          | 当前用户未登录（未检测到token）或登录已过期（token过期） |

### /p/\<post_id\>/ 获取该帖子的详情 [已实现]

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
        "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
        "poster_name": "string", //发布者用户名
        "poster_avatar_url": "string", //发布者头像url
        "image_url": "string", //帖子的图片url，没有加上域名
        "is_imported": "bool", # 该贴子是否为外部导入，外部导入则无法创建申请
  	}
  ```

| error_code | 含义                                                 |
| ---------- | ---------------------------------------------------- |
| 1          | 不是GET请求                                          |
| 3          | 贴子不存在                                           |
| 5          | 用户未登录（未检测到token）或登录已过期（token过期） |

### /my/\<user_id\>/post/ 获取该ID的用户发布的全部帖子[已实现]

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
          "labels":"string", //项目标签代码，以‘&’为分隔符拼接，如：0101&0201&0301，标签编码需满足项目[标签规范文件](../专业目录表.txt)的规定
          "poster_name": "string", //发布者用户名
          "poster_avatar_url": "string", //发布者头像url
          "image_url": "string", //帖子的图片url，没有加上域名
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

