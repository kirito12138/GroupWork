// pages/changePwd/changePwd.js

const { $Message } = require('../../vant-weapp/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: "",
    old_password: "",
    check_psw: ""

  },

  input_psw: function (e) {
    this.setData(
      {
        password: e.detail.detail.value
      }

    )
  },

  input_old_pwd: function (e) {
    this.setData(
      {
        old_password: e.detail.detail.value
      }
    )
  },

  input_checkpsw: function (e) {
    this.setData(
      {
        check_psw: e.detail.detail.value
      }
    )
  },

  change_pwd: function(e)
  {
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    console.log(_jwt)
    if (_jwt) {
      tk = JSON.parse(_jwt);
      console.log(tk);
    }
    else {
      console.log("no token");
      return;
    }


    var can = true;
    console.log(this.data.password);
    if (this.data.password != this.data.check_psw) 
    {
      can = false;
      $Message({
        content: '两次密码不一致',
        type: 'error'
      });
    }
    else if (this.data.password.length == 0) 
    {
      can = false;
      $Message({
        content: '新密码不能为空',
        type: 'error'
      });

    }
    else if (!(this.data.password.length >= 8 && this.data.password.length <= 16)) 
    {
      can = false;
      $Message({
        content: '密码字符在8~16之间',
        type: 'error'
      });
    }
    else if(this.data.old_password.length == 0)
    {
      can = false;
      $Message({
        content: '旧密码不能为空',
        type: 'error'
      });
    }

    if(can)
    {
      wx.request({
        //TODO: 修改链接
        url: 'https://group.tttaaabbbccc.club//my/change_password/',

        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          'Authorization': tk
        },
        
        //TODO: 修改data
        data:
        {
          "password": this.data.old_password,  // 数字大小写字母，标点符号，8~14个字符
          "new_password": this.data.password,  // 数字大小写字母，标点符号，8~14个字符
        },
        success: function (res) 
        {
          if (res.data['ret']) {
            wx.showToast({
              title: '修改成功',
            })
           
          }
          else {
            console.log("login_fail");
            //TODO 错误提示
            if (res.data['error_code'] == 1) {
              $Message({
                content: '不是POST请求',
                type: 'error'
              });
            }
            else if (res.data['error_code'] == 2) {
              $Message({
                content: '缺少必要信息',
                type: 'error'
              });
            }
            else if (res.data['error_code'] == 3) {
              $Message({
                content: '密码格式错误',
                type: 'error'
              });
            }
            else if (res.data['error_code'] == 4) {
              $Message({
                content: '旧密码错误',
                type: 'error'
              });
            }
            else if (res.data['error_code'] == 5) {
              $Message({
                content: '请重新登录',
                type: 'error'
              });
            }
          }
        }
      })
    }

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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