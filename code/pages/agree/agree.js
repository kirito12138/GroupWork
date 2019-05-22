const { $Message } = require('../../vant-weapp/dist/base/index');
// pages/myResume/myResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "未填写",
    sex: "未填写",
    age: "0",
    degree: "未填写",
    city: "未填写",
    phone: "未填写",
    email: "未填写",
    expEdu1: {
      year: "未填写",
      major: "未填写",
      school: "未填写",
    },
    expEdu2: {
      year: "未填写",
      major: "未填写",
      school: "未填写",
    },
    expEdu3: {
      year: "未填写",
      major: "未填写",
      school: "未填写",
    },
    awards: "未填写",
    english_skill: "未填写",
    project_exp: "未填写",
    self_review: "未填写",

    edu_exp: "",
    info: "",

  },

  input_sex: function (e) {
    this.setData({
      sex: e.detail.detail.value,
    });
  },
  input_name: function (e) {
    this.setData({
      name: e.detail.detail.value,
    });
  },
  input_age: function (e) {
    this.setData({
      age: e.detail.detail.value,
    });
  },
  input_degree: function (e) {
    this.setData({
      degree: e.detail.detail.value,
    });
  },
  input_city: function (e) {
    this.setData({
      city: e.detail.detail.value,
    });
  },
  input_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value,
    });
    console.log(this.data.phone)
  },
  input_email: function (e) {
    this.setData({
      email: e.detail.detail.value,
    });
  },
  input_year_1: function (e) {
    this.setData({
      'expEdu1.year': e.detail.detail.value,
    });
    console.log(this.data.expEdu1['year'])
  },
  input_school_1: function (e) {
    this.setData({
      'expEdu1.school': e.detail.detail.value,
    });
  },
  input_major_1: function (e) {
    this.setData({
      'expEdu1.major': e.detail.detail.value,
    });
  },
  input_year_2: function (e) {
    this.setData({
      'expEdu2.year': e.detail.detail.value,
    });
  },
  input_school_2: function (e) {
    this.setData({
      'expEdu2.school': e.detail.detail.value,
    });
  },
  input_major_2: function (e) {
    this.setData({
      'expEdu2.major': e.detail.detail.value,
    });
  },
  input_year_3: function (e) {
    this.setData({
      'expEdu3.year': e.detail.detail.value,
    });
  },
  input_school_3: function (e) {
    this.setData({
      'expEdu3.school': e.detail.detail.value,
    });
  },
  input_major_3: function (e) {
    this.setData({
      'expEdu3.major': e.detail.detail.value,
    });
  },
  input_rewards: function (e) {
    this.setData({
      awards: e.detail.value,
    });
  },
  input_english_skill: function (e) {
    this.setData({
      english_skill: e.detail.value,
    });
  },
  input_project_exp: function (e) {
    this.setData({
      project_exp: e.detail.value,
    });
  },
  input_self_review: function (e) {
    this.setData({
      self_review: e.detail.value,
    });
  },

  click_save_resume: function (e) {
    /*‘
    
    
      TODO   tong yi
    
    
    */ 
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;

    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }

    
    wx.request({
      url: 'https://group.tttaaabbbccc.club//apply/' + this.data.applyID + '/accept/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:
      {
      },
      success(res) {
        console.log(res.data)
        if (res.data.ret) {
          $Message({
            content: '已同意',
            type: 'success'
          });
          wx.navigateBack(1)
        }
      }
    })
    
  },

  refuse: function (e) {
    /*‘
    
    
      TODO   tong yi
    
    
    */
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;

    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }


    wx.request({
      url: 'https://group.tttaaabbbccc.club//apply/' + this.data.applyID + '/reject/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:
      {
      },
      success(res) {
        console.log(res.data)
        if (res.data.ret) {
          $Message({
            content: '已拒绝',
            type: 'error'
          });
          wx.navigateBack(1)
        }
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

    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }
    wx.request({
      url: 'https://group.tttaaabbbccc.club//apply/' + this.data.applyID + '/accept/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:
      {
      },
      success(res) {
        console.log(res.data)
        if (res.data.ret) {
          $Message({
            content: '已同意',
            type: 'success'
          });
        }
      }
    })
    console.log("2222" + options.info)
    this.data.info = JSON.parse(options.info);
    
    this.setData({
      name: this.data.info.name,
      sex: this.data.info.sex,
      age: this.data.info.age,
      degree: this.data.info.degree,
      city: this.data.info.city,
      phone: this.data.info.phone,
      email: this.data.info.email,

      edu_exp: this.data.info.edu_exp,

      awards: this.data.info.awards,
      english_skill: this.data.info.english_skill,
      project_exp: this.data.info.project_exp,
      self_review: this.data.info.self_review,



      /*postDetail: this.data.info.postDetail,
      requestNum: this.data.info.requestNum,
      acceptedNum: this.data.info.acceptedNum,
      ddl: this.data.info.ddl,*/

      applyID: this.data.info.applyID,
      //posterID: this.data.info.posterID,
    })

    if (this.data.edu_exp != "") {
      var arr_deg;

      arr_deg = this.data.edu_exp.split("|");
      if (arr_deg[0] != "") {
        console.log(JSON.stringify(arr_deg[0].split("!")));
        this.setData({
          "expEdu1.year": arr_deg[0].split("!")[0],
          "expEdu1.major": arr_deg[0].split("!")[1],
          "expEdu1.school": arr_deg[0].split("!")[2]
        });
      }
      if (arr_deg[1] != "") {

        this.setData({
          "expEdu2.year": arr_deg[1].split("!")[0],
          "expEdu2.major": arr_deg[1].split("!")[1],
          "expEdu2.school": arr_deg[1].split("!")[2]
        });
      }
      if (arr_deg[2] != "") {

        this.setData({
          "expEdu3.year": arr_deg[2].split("!")[0],
          "expEdu3.major": arr_deg[2].split("!")[1],
          "expEdu3.school": arr_deg[2].split("!")[2]
        });
      }
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