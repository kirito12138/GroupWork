// pages/personInfo/personInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"未填写",
    name:"未填写",
    sex: "未填写",
    age: -1,
    studentID: "未填写",
    major: "未填写",
    grade:"未填写"
  },
  input_usrname: function (e) {
    this.setData(
      {
        account: e.detail.detail.value
      }
    )
  },
  input_name: function (e) {
    this.setData(
      {
        name: e.detail.detail.value
      }
    )
  },
  input_sex: function (e) {
    this.setData(
      {
        sex: e.detail.detail.value
      }

    )
  },
  input_age: function (e) {
    this.setData(
      {
        age: e.detail.detail.value
      }
    )
  },
  input_ID: function (e) {
    this.setData(
      {
        studentID: e.detail.detail.value
      }
    )
  },
  input_major: function (e) {
    this.setData(
      {
        major: e.detail.detail.value
      }
    )
  },
  input_grade: function (e) {
    this.setData(
      {
        grade: e.detail.detail.value
      }
    )
  },
  saveChanges:function()
  {
    console.log(this.data.account);
    console.log(this.data.name);
    console.log(this.data.age);
    console.log(this.data.studentID);
    console.log(this.data.sex);
    console.log(this.data.major);
    console.log(this.data.grade);
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