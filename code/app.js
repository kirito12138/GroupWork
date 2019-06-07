//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var userInfo;
    var nickname;
    var acatorUrl;
    var code;
    // 登录
    var that = this

    //第一种底部  
    



    wx.login({
      success: function (res) {
        //code 获取用户信息的凭证
        code = res.code;
        console.log('1111',code)
        
        if (res.code) {
          //请求获取用户详细信息
          that.globalData.code = res.code
        }
        else
        {
          wx.showToast({ title: "请求超时~" })
          return;
        }
      }
    }),
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              nickname = res.userInfo.nickName;
              acatorUrl = res.userInfo.avatarUrl;
              console.log(acatorUrl)
              console.log('222222',code)
              wx.request({
                url: 'https://group.tttaaabbbccc.club/login/wechat/',
                header: {
                  'Content-type': 'application/json'
                },
                method: "POST",
                data: {
                  code: code,
                  name: nickname,
                  avatar_url: acatorUrl,
                },


                success: function (res) {
                  console.log(res)
                  //保存openid 
                  if (res.data.ret) {
                    that.globalData.openId = res.data.ID;
                    var token = res.data['Token'];
                    const _token = JSON.stringify(token);
                    wx.setStorageSync('jwt', _token);

                    var id = res.data['ID'];
                    const _id = JSON.stringify(id);
                    wx.setStorageSync('userid', _id);

                    var _history = wx.getStorageSync('history');
                    wx.getStorage({
                      key: 'history',
                      success(res) {
                        
                      },
                      fail(res)
                      {
                        const _history = JSON.stringify();
                        wx.setStorageSync('history', _history);
                      }
                    })
                    

                    

                  }
                  else {
                    wx.showToast({ title: "登录失败" })
                  }

                }
              });

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }




      }
    });



  },

  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  globalData: {

    userInfo: null,
    openId: "",
    code: "",
    //第一种底部导航栏显示
    tabBar: {
      "list": [
        {
          "pagePath": "pages/home/home",
          "text": "首页",
          "iconPath": "image/main1.png",
          "selectedIconPath": "image/main2.png"
        },
        {
          "pagePath": "pages/myPost/myPost",
          "text": "我邀请的",
          "iconPath": "image/post1.png",
          "selectedIconPath": "image/post2.png"
        },
        {
          "pagePath": "pages/myApply/myApply",
          "text": "被谁邀请",
          "iconPath": "image/apply1.png",
          "selectedIconPath": "image/apply2.png"
        },
        {
          "pagePath": "pages/MCM/MCM",
          "text": "美赛",
          "iconPath": "image/user1.png",
          "selectedIconPath": "image/user2.png"
        },
        {
          "pagePath": "pages/personCenter/personCenter",
          "text": "个人中心",
          "iconPath": "image/user1.png",
          "selectedIconPath": "image/user2.png"
        }
      ]
    },
    //第二种底部导航栏显示
    tabBar1: {
      "list": [
        {
          "pagePath": "pages/home/home",
          "text": "首页",
          "iconPath": "image/main1.png",
          "selectedIconPath": "image/main2.png"
        },
        {
          "pagePath": "pages/myPost/myPost",
          "text": "我的发布",
          "iconPath": "image/post1.png",
          "selectedIconPath": "image/post2.png"
        },
        {
          "pagePath": "pages/myApply/myApply",
          "text": "我的申请",
          "iconPath": "image/apply1.png",
          "selectedIconPath": "image/apply2.png"
        },
        {
          "pagePath": "pages/MCM/MCM",
          "text": "美赛",
          "iconPath": "image/user1.png",
          "selectedIconPath": "image/user2.png"
        },
        {
          "pagePath": "pages/personCenter/personCenter",
          "text": "个人中心",
          "iconPath": "image/user1.png",
          "selectedIconPath": "image/user2.png"
        }
      ]
    },
  }


})