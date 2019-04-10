// pages/login/login.js

const { $Message } = require('../../vant-weapp/dist/base/index');


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  regist:function()
  {
    wx.navigateTo({
      url: '../register/register',
    })
  },

  loginBtnClick: function () 
  {
    console.log("用户名：" + this.data.account + " 密码：" + this.data.password);
    if (this.data.account == null)
    {
      console.log("ERROR:::用户名：" + this.data.account + " 密码：" + this.data.password);
      $Message({
        content: '用户名为空',
        type: 'error'
      });
    }
    else if (this.data.password == null)
    {
      console.log("ERROR:::用户名：" + this.data.account + " 密码：" + this.data.password);
      $Message({
        content: '密码为空',
        type: 'error'
      });
    }
    else
    {
      wx.request({
        url: 'https://group.tttaaabbbccc.club/login/',
        data: {
          account: this.data.account,
          password: this.data.password
        },
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },

        success(res) {
          if (res.data['ret']) 
          {
            console.log("login_sucess");
            var token = res.data['Token'];
            const _token = JSON.stringify(token);
            wx.setStorageSync('jwt', _token);
            wx.redirectTo({
              url: '../home/home',
            });
          }
          else
          {
            console.log("login_fail");
            //TODO 错误提示
            $Message({
              content: '该用户名未注册',
              type: 'error'
            });
          }
        }
      })
    }
    
  },

  userNameInput:function(e)
  {
    this.setData({
      account: e.detail.detail.value
    })
  },

  passWdInput: function (e) {
    this.setData({
      password: e.detail.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断Token是否存在
    try
    {
      const _jwt = wx.getStorageSync('jwt');
      if (_jwt) {
        const jwt = JSON.parse(_jwt);
        console.log(this.data.jwt.token);
      }
    }
    catch(e)
    {
      console.log("no token");
    }
    
    


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})