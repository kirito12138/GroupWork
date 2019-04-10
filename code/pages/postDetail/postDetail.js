// pages/postDetail/postDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num1:1,
      num2:2,
      date:"19/05/01"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      postDetail: options.postDetail,
      requestNum: options.requestNum,
      acceptedNum: options.acceptedNum,
      ddl: options.ddl,
      ifEnd: options.ifEnd,
      postID: options.postID,
      posterID: options.posterID
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

  },
  
  applyFor: function(e){
    //TODO:完成申请按钮功能
  }
})