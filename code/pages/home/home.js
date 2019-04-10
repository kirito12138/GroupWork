// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    f_posts:[
      // {
      //   "title": "string",
      //   "postDetail": "string",
      //   "requestNum": "int",
      //   "acceptedNum": "int", //目前已经接收的人数
      //   "ddl": "datetime", //YYYY-MM-DD
      //   "postID": "1",
      //   "posterID": "string",
      // },
      // {
      //   "title": "string",
      //   "postDetail": "string",
      //   "requestNum": "int",
      //   "acceptedNum": "int", //目前已经接收的人数
      //   "ddl": "datetime", //YYYY-MM-DD
      //   "postID": "2",
      //   "posterID": "string",
      // },
    ]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      const _jwt = wx.getStorageSync('jwt');
      if (_jwt) {
        const jwt = JSON.parse(_jwt);
        console.log(this.data.jwt.token);
      }
      else{
        console.log("no token");
      }
    }
    catch (e) {
      console.log("no token");
    }
    wx.request({
      url: 'https://group.tttaaabbbccc.club/f/processing/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",

        'Authorization': `Bearer ${ this.data.jwt.token }`
      },
      success(res) {
        this.setData({
          f_posts: res
        }); 
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