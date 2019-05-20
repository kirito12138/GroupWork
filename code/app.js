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

    wx.login({
      success: function (res) {
        //code 获取用户信息的凭证
        code = res.code;
        console.log('1111',code)
        
        if (res.code) {
          //请求获取用户详细信息

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

                      const _history = JSON.stringify();
                      wx.setStorageSync('history', _history);

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
  globalData: {
    userInfo: null,
    openId: ""
  }
})