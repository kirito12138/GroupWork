// pages/sendInvation/sendInvation.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    visible: false,

  },
  changeShow: function (e) {
    var i = e.currentTarget.dataset.index;

    let string = "f_posts[" + i + "].isShow";
    this.setData({
      [string]: !this.data.f_posts[i].isShow
    })
    console.log(this.data.f_posts[i].isShow)
  },
  cancelAccept: function (e) {
    console.log("取消")
    if (e.detail.index == 0) {
      this.setData({
        visible: false
      })
    }
    else {
      this.setData({
        visible: false
      })
      this.accept()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {

      return;
    }
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });

    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/invitations/send/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        that.setData({
          f_posts: res.data
        });
        console.log('dasdas', res)

      },
      fail(res) {
        $Toast.hide();
      }
    })



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