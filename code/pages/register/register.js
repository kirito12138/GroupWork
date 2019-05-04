// pages/register/register.js
const { $Message } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"",
    password:"",
    check_psw:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  input_usrname:function(e)
  {
    this.setData(
      {
        account: e.detail.detail.value
      }

    )
  },
  input_psw: function (e) {
    this.setData(
      {
        password: e.detail.detail.value
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

  click_regis:function(e)
  {
    var can = true;

    if(this.data.account.length==0)
    {
      can = false;
      $Message({
        content: '用户名不能为空',
        type: 'error'
      });
    }
    else if (this.data.account.length > 14) {
      can = false;
      $Message({
        content: '用户名长度不能超过14',
        type: 'error'
      });
    }
    else if (!((this.data.account.charAt(0) >= 'a' && this.data.account.charAt(0) <= 'z') || (this.data.account.charAt(0) >= 'A' && this.data.account.charAt(0) <='Z')  )) {
      can = false;
      $Message({
        content: '用户名第一个字符为字母',
        type: 'error'
      });
    }
    else if(this.data.password != this.data.check_psw)
    {
      can = false;
      $Message({
        content: '两次密码不一致',
        type: 'error'
      });
    }
    else if(this.data.password.length==0)
    {
      can = false;
      $Message({
        content: '密码不能为空',
        type: 'error'
      });

    }
    else if ( !(this.data.password.length >= 8 && this.data.password.length<=16) ) {
      can = false;
      $Message({
        content: '密码字符在8~16之间',
        type: 'error'
      });

    }
    if(can)
    {
      wx.request({
        url: 'https://group.tttaaabbbccc.club/register/',
        header: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        method: "POST",
        data:
        {
          account: this.data.account,
          password: this.data.password,
          name:"",
          age:0,
          studentID:"",
          sex:"",
          major:"",
          grade:""
        },
        success: function (res) {

          //wx.navigateBack({

          //})
          
          if (res.data['ret']) {
            $Message({
              content: '注册成功',
              type: 'success'
            });
            var token = res.data['Token'];
            const _token = JSON.stringify(token);
            wx.setStorageSync('jwt', _token);
            var id = res.data['ID'];
            const _id = JSON.stringify(id);
            wx.setStorageSync('userid', _id);
            wx.reLaunch({
              url: '../home/home',
            });
          }
          else {
            console.log("login_fail");
            console.log(res.data.error_code)
            //TODO 错误提示
            $Message({
              content: '账号已经存在',
              type: 'error'
            });
          }
        }

      })
    }


  },
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