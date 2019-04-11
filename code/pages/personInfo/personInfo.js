// pages/personInfo/personInfo.js
const { $Message } = require('../../vant-weapp/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:"未填写",
    name:"未填写",
    sex: "未填写",
    age: "0",
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
  loginout:function()
  {
    var token ="";
    const _token = JSON.stringify(token);
    wx.setStorageSync('jwt', _token);
    wx.reLaunch({
      url: '../login/login',
    })
  },
  saveChanges:function()
  {
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    var student_id = this.data.studentID;
    if(student_id == "未填写")
      student_id = "";
    
    console.log(student_id);
    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }
    if (!(this.data.account.length > 0 && this.data.account.length<=20) )
    {
      $Message({
        content: '用户名长度在1~20之间',
        type: 'error'
      });
    }
    else if(!(this.data.name.length<=16))
    {
      $Message({
        content: '真实姓名不能超过16个字符',
        type: 'error'
      });
    }
    else if (!(this.data.sex.length <= 3)) {
      $Message({
        content: '性别长度在1~16之间',
        type: 'error'
      });
    }
    else if (this.data.age != "" && !(/^[0-9]+$/.test(this.data.age))) {
      $Message({
        content:"年龄均为数字",
        type: 'error'
      });
    }
    else if (student_id!="" && !(/^[0-9]+$/.test(student_id)) ) {
      $Message({
        content: '学号全由数字组成',
        type: 'error'
      });
    }
    else if (!(this.data.major.length <= 20)) {
      $Message({
        content: '专业不能超过20个字符',
        type: 'error'
      });
    }
    else if (!(this.data.grade.length <= 3)) {
      $Message({
        content: '年纪不能超过三个字符',
        type: 'error'
      });
    }
    else
    {
      var age = this.data.age;
      if(age == "") age = "0";
      wx.request({
        url: 'https://group.tttaaabbbccc.club//my/profile/modify/',
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          'Authorization': tk
        },
        data:
        {
          account: this.data.account,
          name: this.data.name,
          age: parseInt(age),
          studentID: student_id,
          sex: this.data.sex,
          major: this.data.major,
          grade: this.data.grade
        },
        success(res) {
          console.log(res.data)
          if(res.data.ret)
          {
            $Message({
              content: '修改成功',
              type: 'success'
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
   
    wx.request({
      url: 'https://group.tttaaabbbccc.club//my/profile/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        that.setData({
          account: res.data.account,
        });
        if(res.data.name!="")
        {
          that.setData({
            name: res.data.name,
          });
        }
        if (res.data.sex != "") {
          that.setData({
            sex: res.data.sex,
          });
        }
        if (res.data.age != -1) {
          that.setData({
            age: res.data.age,
          });
        }
        if (res.data.studentID != "") {
          that.setData({
            studentID: res.data.studentID,
          });
        }
        if (res.data.major != "") {
          that.setData({
            major: res.data.major,
          });
        }
        if (res.data.grade != "") {
          that.setData({
            grade: res.data.grade,
          });
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

  }
})