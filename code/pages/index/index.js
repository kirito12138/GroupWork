//index.js
//获取应用实例
const app = getApp()
const { $Message } = require('../../vant-weapp/dist/base/index');


Page({
  data: {
    motto: '欢迎使用',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../postDetail/postDetail'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  goToHome: function () {
    if (this.data.hasUserInfo)
    {
      
            wx.reLaunch({
              url: "../home/home",
            })
    }
      
    else {
      wx.showToast({
        title: '请先获取头像昵称', icon: 'none'
      })
    }
  },
  getUserInfo: function (e) {
    console.log("xxxxx")
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
    wx.reLaunch({
      url: '../home/home',
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)

    if (app.globalData.userInfo != null)
    {
      wx.reLaunch({
        url: '../home/home',
      })
      return 
    }

    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      var nickname = e.detail.userInfo.nickName
      var acatorUrl = e.detail.userInfo.avatarUrl
      var code = app.globalData.code
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
            app.globalData.openId = res.data.ID;
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
              fail(res) {
                const _history = JSON.stringify();
                wx.setStorageSync('history', _history);
              }
            })


            wx.reLaunch({
              url: '../home/home',
            })



          }
          else {
            wx.showToast({ title: "登录失败" })
          }

        }
      });
    } else {
      //用户按了拒绝按钮
    }
  }

})
