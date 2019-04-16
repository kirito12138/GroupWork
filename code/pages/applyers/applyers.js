// pages/applyers/applyers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    f_posts: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */


  clickCard: function (e) {
    //TODO  jie kou
    //console.log(e.currentTarget.dataset.index);
    var i = e.currentTarget.dataset.index;
    var fp = this.data.f_posts[i];
    
    fp.edu_exp = fp.edu_exp.replace(/&/g, "!");

    console.log(fp.edu_exp)
    var para = JSON.stringify(fp);

    console.log("111111111" + para);

    wx.navigateTo({
      url: '../agree/agree?info=' + para,
    })


  },
  onLoad: function (options) {
    var that = this;
    this.data.info = JSON.parse(options.info);
    this.setData({
      title: this.data.info.title,
      postDetail: this.data.info.postDetail,
      requestNum: this.data.info.requestNum,
      acceptedNum: this.data.info.acceptedNum,
      ddl: this.data.info.ddl,

      postID: this.data.info.postID,
      posterID: this.data.info.posterID
    })
    
    console.log("postid" + that.data.postID);
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
    console.log("kkkkkkkkkk");
    wx.request({
      
      url: 'https://group.tttaaabbbccc.club/p/' + that.data.postID + '/apply',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        console.log(res)
        that.setData({
          f_posts: res.data
        });
        console.log(res.data)
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