// pages/postDetail/postDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

      tagsDict: ['衣着整洁','准时送达','餐品完善','服务专业','微笑服务','穿着专业','文字评价'],


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
    }
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
    this.data.info=JSON.parse(options.info);
    
    this.setData({
      title: this.data.info.title,
      postDetail: this.data.info.postDetail,
      requestNum: this.data.info.requestNum,
      acceptedNum: this.data.info.acceptedNum,
      ddl: this.data.info.ddl,
      sp:this.data.info.sp,
      postImg:this.data.info.image_url,
      
      postID: this.data.info.postID,
      posterID: this.data.info.posterID
    })
    wx.request({
      url: 'https://group.tttaaabbbccc.club/my/'+that.data.posterID+'/detail/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        console.log(res)
        if (res.data['ret']) {
          that.setData({
            name: res.data['name']
          })
        }
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

  },
  
  applyFor: function(e){
    //TODO:完成申请按钮功能
    var para = JSON.stringify(this.data.postID);
    wx.navigateTo({
      url: '../applyThis/applyThis?info=' + para,
    })
  }
})