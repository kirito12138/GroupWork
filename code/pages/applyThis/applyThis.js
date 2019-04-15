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
  click_save_resume:function(e)
  {
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

    if (this.data.age != "" && !(/^[0-9]+$/.test(this.data.age))) {
      $Message({
        content: "年龄均为数字",
        type: 'error'
      });
    }
    else if (this.data.phone != "" && !(/^[0-9]+$/.test(this.data.phone))) {
      $Message({
        content: '电话号码全由数字组成',
        type: 'error'
      });
    }

    else {
      var age = this.data.age;
      var edu_exp, edu_exp1, edu_exp2, edu_exp3;
      edu_exp1 = this.data.expEdu1['year'] + "&" + this.data.expEdu1['major'] + "&" + this.data.expEdu1['school'];
      edu_exp2 = this.data.expEdu2['year'] + "&" + this.data.expEdu2['major'] + "&" + this.data.expEdu2['school'];
      edu_exp3 = this.data.expEdu3['year'] + "&" + this.data.expEdu3['major'] + "&" + this.data.expEdu3['school'];
      edu_exp = edu_exp1 + "|" + edu_exp2 + "|" + edu_exp3;
      if (age == "") age = "0";
      wx.request({
        url: 'https://group.tttaaabbbccc.club/c/apply/',
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          'Authorization': tk
        },
        data:
        {
          post_id:this.data.postID,
          name: this.data.name,
          sex: this.data.sex,
          age: parseInt(age),
          degree: this.data.degree,
          phone: this.data.phone,
          email: this.data.email,
          city: this.data.city,
          awards: this.data.awards,
          english_skill: this.data.english_skill,
          project_exp: this.data.project_exp,
          self_review: this.data.self_review,
          edu_exp:edu_exp,
        },
        success(res) {
          console.log(res.data)
          if (res.data.ret) {
            $Message({
              content: '修改成功',
              type: 'success'
            });
          }
          else
          {
            if(res.data.error_code == 6)
            {
              $Message({
                content: '已经提交过申请',
                type: 'error'
              });
            }
          }
        }
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postID = JSON.parse(options.info);
    this.setData({
      postID: postID,

    })
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
      url: 'https://group.tttaaabbbccc.club/my/resume/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {

        console.log("1111" + res.data.sex)
        if (res.data.name != "") {

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
        if (res.data.degree != "") {
          console.log("1111" + res.data.degree);
          that.setData({
            degree: res.data.degree,
          });
        }
        if (res.data.city != "") {
          that.setData({
            city: res.data.city,
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
        if (res.data.awards != "") {
          that.setData({
            awards: res.data.awards,
          });
        }
        if (res.data.english_skill != "") {
          that.setData({
            english_skill: res.data.english_skill,
          });
        }
        if (res.data.project_exp != "") {
          that.setData({
            project_exp: res.data.project_exp,
          });
        }
        if (res.data.self_review != "") {
          that.setData({
            self_review: res.data.self_review,
          });
        }
        if (res.data.edu_exp != "") {
          var arr_deg;
          console.log(res.data.edu_exp)
          arr_deg = res.data.edu_exp.split("|");
          if (arr_deg[0] != "") {
            console.log(JSON.stringify(arr_deg[0].split("&")));
            that.setData({
              "expEdu1.year": arr_deg[0].split("&")[0],
              "expEdu1.major": arr_deg[0].split("&")[1],
              "expEdu1.school": arr_deg[0].split("&")[2]
            });
          }
          if (arr_deg[1] != "") {

            that.setData({
              "expEdu2.year": arr_deg[1].split("&")[0],
              "expEdu2.major": arr_deg[1].split("&")[1],
              "expEdu2.school": arr_deg[1].split("&")[2]
            });
          }
          if (arr_deg[2] != "") {

            that.setData({
              "expEdu3.year": arr_deg[2].split("&")[0],
              "expEdu3.major": arr_deg[2].split("&")[1],
              "expEdu3.school": arr_deg[2].split("&")[2]
            });
          }
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