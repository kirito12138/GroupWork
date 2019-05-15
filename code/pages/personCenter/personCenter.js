// pages/personCenter/personCenter.js
var app = getApp() // 获得全局变量
Page({

  /**
   * 
   * 页面的初始数据
   */
  data: {

  },
  goPersonInfo: function () {
    wx.navigateTo({
      url: '../personInfo/personInfo',
    })
  },
  goMyResume: function (e) {
    wx.navigateTo({
      url: '../myResume/myResume',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo !== null) {
      this.setData({
        userimg: app.globalData.userInfo.avatarUrl,
        username: app.globalData.userInfo.nickName,
        login: true
      })
      console.log(this.data.userimg)
    }
    else {
      this.setData({
        userimg: '',
        username: "未登录",
        login: false
      })
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