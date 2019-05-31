// pages/personInfo/personInfo.js
const { $Message } = require('../../vant-weapp/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    update:true,
    account:"",
    name:"",
    sex: "",
    age: "0",
    studentID: "",
    major: "",
    grade:"",
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

  goUpdate:function()
  {
    this.setData({update:false});
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
  if(!(this.data.name.length<=16))
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
        content: '年级不能超过三个字符',
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
            that.setData({ update: true });
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
        var major_map = {
          "01": "材料科学与工程学院",
          "02": "电子信息工程学院",
          "03": "自动化科学与电气工程学院",
          "04": "能源与动力工程学院",
          "05": "航空科学与工程学院",
          "06": "计算机学院",
          "07": "机械工程及自动化学院",
          "08": "经济管理学院",
          "09": "数学与系统科学学院",
          "10": "生物医学工程系",
          "11": "人文社会科学学院",
          "12": "外国语学院",
          "13": "交通科学与工程学院",
          "14": "可靠性与系统工程学院",
          "15": "宇航学院",
          "16": "飞行学院"
        }


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
            studentID: res.data.studentID
          });
          // console.log(res.data.studentID.slice(2, 4));
          // // that.setData({
          // //   major: major_map[res.data.studentID.slice(2, 4)]
          // // });
          // // that.setData({
          // //   grade: res.data.studentID.slice(0, 2)+"级"
          // // });
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