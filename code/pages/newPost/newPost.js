// pages/newPost/newPost.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:"currentUser",
    requestNum:1,
    ddl:'',
    title:"",
    postDetail:"",
    stringNum:"1",
    lastDate: "2017-09-01",
    beginDate: "2015-09-01"
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    this.data.beginDate = year + seperator1 + month + seperator1 + strDate;
    this.data.ddl=this.data.beginDate;
    year = year+5;
    this.data.lastDate = year + seperator1 + month + seperator1 + strDate;
    console.log(this.data.beginDate);
    console.log(this.data.lastDate);
  },

  getTitle: function(e){
    
    this.setData({
      title:e.detail.value
    })
    console.log(this.data.title)
  },

  getDetail: function (e) {
    this.setData({
      postDetail: e.detail.value
    })
    console.log(this.data.postDetail)
  },

  

  getNum: function (e) {
    this.setData({
      stringNum: e.detail.value
    })
    if ( !(/^[0-9]+$/.test(this.data.stringNum))|| parseInt(this.data.stringNum) <= 0 || parseInt(this.data.stringNum)>100)
    {
      this.setData({
        stringNum: "1",
        requestNum:1
      })
      $Toast({
        content: '需求人数最小为1，最大100！',
        type: 'error'
      });
    }
    else
    {
      this.data.requestNum = parseInt(this.data.stringNum);
    }
    console.log(this.data.requestNum);
  },

  bindDateChange: function (e) {
    this.setData({
      ddl: e.detail.value
    })
    console.log(this.data.ddl);
  },

  genPost: function(e){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (this.data.title.length==0)
    {
      $Toast({
        content: '发布标题不能为空！',
        type: 'error'
      });
    }
    else if (this.data.postDetail.length==0)
    {
      $Toast({
        content: '详细需求不能为空！',
        type: 'error'
      });
    }
    else if (parseInt(this.data.ddl.slice(0, 4)) < year || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7))<month)
      || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7)) == month && parseInt(this.data.ddl.slice(8, 10)) <= strDate))
      {
      $Toast({
        content: '截止日期'+this.data.ddl+'已过！',
        type: 'error'
      });
      }
      else{
        console.log("legal ddl:"+this.data.ddl);
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