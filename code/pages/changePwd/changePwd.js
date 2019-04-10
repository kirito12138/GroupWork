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
        url: 'https://group.tttaaabbbccc.club/register/',

        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        
        //TODO: 修改data
        data:
        {
         
        },
        success: function (res) 
        {
          if (res.data['ret']) {
            wx.showToast({
              title: '修改成功',
            })
            //const _token = JSON.stringify(token);
            //wx.setStorageSync('jwt', _token);
            wx.navigateTo({
              url: '../test/test',
            });
          }
          else {
            console.log("login_fail");
            //TODO 错误提示
            $Message({
              content: '注册失败',
              type: 'error'
            });
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