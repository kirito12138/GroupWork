const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp() // 获得全局变量
// pages/myResume/myResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    ben_major: "",
    now_major: "",
    target: "",

    phone: "",
    email: "",

    awards: "",
    
    
    ability: '编程',
    fruit: [{
      id: 1,
      name: '编程',
    }, {
      id: 2,
      name: '建模'
    }, {
      id: 3,
      name: '论文'
    } 
    ],

    part: '能参加',
    partin: [{
      id: 1,
      name: '能参加',
    }, {
      id: 2,
      name: '不能参加'
    }],

  },

  handleFruitChange({ detail = {} }) {
    this.setData({
      ability: detail.value
    });
  },

  handlePartChange({ detail = {} }) {
    this.setData({
      part: detail.value
    });
  },

  input_name: function (e) {
    this.setData({
      name: e.detail.detail.value,
    });
  },

  input_ben_major: function (e) {
    this.setData({
      ben_major: e.detail.detail.value,
    });
  },

  input_now_major: function (e) {
    this.setData({
      now_major: e.detail.detail.value,
    });
  },

  input_target: function (e) {
    this.setData({
      target: e.detail.detail.value,
    });
  },
  
  input_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value,
    });
  },
  input_email: function (e) {
    this.setData({
      email: e.detail.detail.value,
    });
  },
  

  input_rewards: function (e) {
    this.setData({
      awards: e.detail.detail.value,
    });
    console.log(e.detail.detail.value)
  },
  

  click_save_resume: function (e) {

    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    var part_bool = true;
    if (this.data.part == "不能参加")
    {
      part_bool = false;
    }

    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }

    if (this.data.phone != "" && !(/^[0-9]+$/.test(this.data.phone))) {
      $Message({
        content: '电话号码全由数字组成',
        type: 'error'
      });
      console.log("2")
      return;
    }
    if (this.data.email != "" && !(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.data.email))) {
      $Message({
        content: '邮箱格式不正确',
        type: 'error'
      });
      return;
    }


    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });

    console.log(this.data)
    console.log(part_bool)
    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/modify/info/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:
      {
        name: this.data.name,

        undergraduate_major: this.data.ben_major,
        major: this.data.now_major,
        goal: this.data.target,

        skill: this.data.ability,
        if_attend_training: part_bool,

        phone: this.data.phone,
        email: this.data.email,
        experience: this.data.awards,
      },

      success(res) {
        $Toast.hide();
        console.log(res.data)
        if (res.data.ret) {
          $Message({
            content: '修改成功',
            type: 'success'
          });
        }
        else
        {
          $Message({
            content: '请填写完整',
            type: 'error'
          });
        }
      },
      fail(res) {
        $Toast.hide();
        $Toast({
          content: '服务器连接超时',
          type: 'error',
          duration: 2,
          mask: true
        });
      }
    })

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
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });

    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/get/info/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()

        console.log("1111" + res.data.sex)
        if (res.data.name != "") {
          that.setData({
            name: res.data.name,
          });
        }
        if (res.data.undergraduate_major != "") {
          that.setData({
            ben_major: res.data.undergraduate_major,
          });
        }
        if (res.data.major != -1) {
          that.setData({
            now_major: res.data.major,
          });
        }
        if (res.data.goal != "") {
          that.setData({
            target: res.data.goal,
          });
        }
        if (res.data.skill != "") {
          that.setData({
            ability: res.data.skill,
          });
        }
        if (res.data.if_attend_training == true) {
          that.setData({
            part: "能参加",
          });
        }
        else
        {
          that.setData({
            part: "不能参加",
          });
        }
        if (res.data.phone != "") {
          that.setData({
            phone: res.data.phone,
          });
        }
        if (res.data.email != "") {
          that.setData({
            email: res.data.email,
          });
        }
        if (res.data.experience != "") {
          that.setData({
            awards: res.data.experience,
          });
        }

      },
      fail(res) {
        $Toast.hide()
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
    this.onLoad()
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