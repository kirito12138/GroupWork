const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp() // 获得全局变量
// pages/myResume/myResume.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    sex:"",
    age:"",
    degree:"",
    city:"",
    phone: "",
    email: "",
    expEdu1:{
      year:"",
      major:"",
      school:"",
    },
    expEdu2: {
      year: "",
      major: "",
      school: "",
    },
    expEdu3: {
      year: "",
      major: "",
      school: "",
    },
    awards:"",
    english_skill:"",
    project_exp: "",
    self_review: "",

    hosList1: [
      { id: 101, name: "哲学类", show: false, serch: "000哲学类" },
      { id: 201, name: "经济学类", show: false, serch: "000经济学类" },
      { id: 202, name: "财政学类", show: false, serch: "000财政学类" },
      { id: 203, name: "金融学类", show: false, serch: "000金融学类" },
      { id: 204, name: "经济与贸易类", show: false, serch: "000经济与贸易类" },
      { id: 301, name: "法学类", show: false, serch: "000法学类" },
      { id: 302, name: "政治学类", show: false, serch: "000政治学类" },
      { id: 303, name: "社会学类", show: false, serch: "000社会学类" },
      { id: 304, name: "民族学类", show: false, serch: "000民族学类" },
      { id: 305, name: "马克思主义理论类", show: false, serch: "000马克思主义理论类" },
      { id: 306, name: "公安学类", show: false, serch: "000公安学类" },
      { id: 401, name: "教育学类", show: false, serch: "000教育学类" },
      { id: 402, name: "体育学类", show: false, serch: "000体育学类" },
      { id: 501, name: "中国语言文学类", show: false, serch: "000中国语言文学类" },
      { id: 502, name: "外国语言文学类", show: false, serch: "000外国语言文学类" },
      { id: 503, name: "新闻传播学类", show: false, serch: "000新闻传播学类" },
      { id: 601, name: "历史学类", show: false, serch: "000历史学类" },
      { id: 701, name: "数学类", show: false, serch: "000数学类" },
      { id: 702, name: "物理学类", show: false, serch: "000物理学类" },
      { id: 703, name: "化学类", show: false, serch: "000化学类" },
      { id: 704, name: "天文学类", show: false, serch: "000天文学类" },
      { id: 705, name: "地理科学类", show: false, serch: "000地理科学类" },
      { id: 706, name: "大气科学类", show: false, serch: "000大气科学类" },
      { id: 707, name: "海洋科学类", show: false, serch: "000海洋科学类" },
      { id: 708, name: "地球物理学类", show: false, serch: "000地球物理学类" },
      { id: 709, name: "地质学类", show: false, serch: "000地质学类" },
      { id: 710, name: "生物科学类", show: false, serch: "000生物科学类" },
      { id: 711, name: "心理学类", show: false, serch: "000心理学类" },
      { id: 712, name: "统计学类", show: false, serch: "000统计学类" },
      { id: 801, name: "力学类", show: false, serch: "000力学类" },
      { id: 802, name: "机械类", show: false, serch: "000机械类" },
      { id: 803, name: "仪器类", show: false, serch: "000仪器类" },
      { id: 804, name: "材料类", show: false, serch: "000材料类" },
      { id: 805, name: "能源动力类", show: false, serch: "000能源动力类" },
      { id: 806, name: "电气类", show: false, serch: "000电气类" },
      { id: 807, name: "电子信息类", show: false, serch: "000电子信息类" },
      { id: 808, name: "自动化类", show: false, serch: "000自动化类" },
      { id: 809, name: "计算机类", show: false, serch: "000计算机类" },
      { id: 810, name: "土木类", show: false, serch: "000土木类" },
      { id: 811, name: "水利类", show: false, serch: "000水利类" },
      { id: 812, name: "测绘类", show: false, serch: "000测绘类" },
      { id: 813, name: "化工与制药类", show: false, serch: "000化工与制药类" },
      { id: 814, name: "地质类", show: false, serch: "000地质类" },
      { id: 815, name: "矿业类", show: false, serch: "000矿业类" },
      { id: 816, name: "纺织类", show: false, serch: "000纺织类" },
      { id: 817, name: "轻工类", show: false, serch: "000轻工类" },
      { id: 818, name: "交通运输类", show: false, serch: "000交通运输类" },
      { id: 819, name: "海洋工程类", show: false, serch: "000海洋工程类" },
      { id: 820, name: "航空航天类", show: false, serch: "000航空航天类" },
      { id: 821, name: "兵器类", show: false, serch: "000兵器类" },
      { id: 822, name: "核工程类", show: false, serch: "000核工程类" },
      { id: 823, name: "农业工程类", show: false, serch: "000农业工程类" },
      { id: 824, name: "林业工程类", show: false, serch: "000林业工程类" },
      { id: 825, name: "环境科学与工程类", show: false, serch: "000环境科学与工程类" },
      { id: 826, name: "生物医学工程类", show: false, serch: "000生物医学工程类" },
      { id: 827, name: "食品科学与工程类", show: false, serch: "000食品科学与工程类" },
      { id: 828, name: "建筑类", show: false, serch: "000建筑类" },
      { id: 829, name: "安全科学与工程类", show: false, serch: "000安全科学与工程类" },
      { id: 830, name: "生物工程类", show: false, serch: "000生物工程类" },
      { id: 831, name: "公安技术类", show: false, serch: "000公安技术类" },
      { id: 901, name: "植物生产类", show: false, serch: "000植物生产类" },
      { id: 902, name: "自然保护与环境生态类", show: false, serch: "000自然保护与环境生态类" },
      { id: 903, name: "动物生产类", show: false, serch: "000动物生产类" },
      { id: 904, name: "动物医学类", show: false, serch: "000动物医学类" },
      { id: 905, name: "林学类", show: false, serch: "000林学类" },
      { id: 906, name: "水产类", show: false, serch: "000水产类" },
      { id: 907, name: "草学类", show: false, serch: "000草学类" },
      { id: 1001, name: "基础医学类", show: false, serch: "000基础医学类" },
      { id: 1002, name: "临床医学类", show: false, serch: "000临床医学类" },
      { id: 1003, name: "口腔医学类", show: false, serch: "000口腔医学类" },
      { id: 1004, name: "公共卫生与预防医学类", show: false, serch: "000公共卫生与预防医学类" },
      { id: 1005, name: "中医学类", show: false, serch: "000中医学类" },
      { id: 1006, name: "中西医结合类", show: false, serch: "000中西医结合类" },
      { id: 1007, name: "药学类", show: false, serch: "000药学类" },
      { id: 1008, name: "中药学类", show: false, serch: "000中药学类" },
      { id: 1009, name: "法医学类", show: false, serch: "000法医学类" },
      { id: 1010, name: "医学技术类", show: false, serch: "000医学技术类" },
      { id: 1011, name: "护理学类", show: false, serch: "000护理学类" },
      { id: 1201, name: "管理科学与工程类", show: false, serch: "000管理科学与工程类" },
      { id: 1202, name: "工商管理类", show: false, serch: "000工商管理类" },
      { id: 1203, name: "农业经济管理类", show: false, serch: "000农业经济管理类" },
      { id: 1204, name: "公共管理类", show: false, serch: "000公共管理类" },
      { id: 1205, name: "图书情报与档案管理类", show: false, serch: "000图书情报与档案管理类" },
      { id: 1206, name: "物流管理与工程类", show: false, serch: "000物流管理与工程类" },
      { id: 1207, name: "工业工程类", show: false, serch: "000工业工程类" },
      { id: 1208, name: "电子商务类", show: false, serch: "000电子商务类" },
      { id: 1209, name: "旅游管理类", show: false, serch: "000旅游管理类" },
      { id: 1301, name: "艺术学理论类", show: false, serch: "000艺术学理论类" },
      { id: 1302, name: "音乐与舞蹈学类", show: false, serch: "000音乐与舞蹈学类" },
      { id: 1303, name: "戏剧与影视学类", show: false, serch: "000戏剧与影视学类" },
      { id: 1304, name: "美术学类", show: false, serch: "000美术学类" },
      { id: 1305, name: "设计学类", show: false, serch: "000设计学类" },
      { id: 9001, value: "实习招募", selected: false, serch: "000实习招募" },
      { id: 9003, value: "实验室招募", selected: false, serch: "000实验室招募" },
      { id: 9004, value: "学科竞赛", selected: false, serch: "000学科竞赛" },
      { id: 9005, value: "学生项目", selected: false, serch: "000学生项目" },
      { id: 9006, value: "个人招募", selected: false, serch: "000个人招募" },
      { id: 9007, value: "志愿招募", selected: false, serch: "000志愿招募" },
      { id: 9008, value: "娱乐活动", selected: false, serch: "000娱乐活动" },
    ],
    hosList: [],
    l1:1,
    l2:1,
    l3:1

  },

  input_sex: function(e)
  {
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
    this.serch(e.detail.detail.value)
  },
  noblur1: function (e) {
    this.setData
      ({
        hosList: []
      })
  },
  clicsho: function (e) {
    var that = this;
    console.log(e);
    var tti = e.currentTarget.dataset.text;
    this.setData
      ({
        'expEdu1.major': tti,
        hosList: []
      })
  },

  serch: function (key) {
    var that = this;
    var arr = [];
    console.log("assss" + key)
    for (let i in that.data.hosList1) {
      that.data.hosList1[i].show = false;
      if (that.data.hosList1[i].serch.indexOf(key) > 0) {
        that.data.hosList1[i].show = true;
        arr.push(that.data.hosList1[i])
      }
    }
    console.log(arr)
    this.setData({
      hosList: arr,
    })
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
    this.serch2(e.detail.detail.value)
  },

  noblur2: function (e) {
    this.setData
      ({
        hosList2: []
      })
  },
  clicsho2: function (e) {
    var that = this;
    console.log(e);
    var tti = e.currentTarget.dataset.text;
    this.setData
      ({
        'expEdu2.major': tti,
        hosList2: []
      })
  },

  serch2: function (key) {
    var that = this;
    var arr = [];
    console.log("assss" + key)
    for (let i in that.data.hosList1) {
      that.data.hosList1[i].show = false;
      if (that.data.hosList1[i].serch.indexOf(key) > 0) {
        that.data.hosList1[i].show = true;
        arr.push(that.data.hosList1[i])
      }
    }
    console.log(arr)
    this.setData({
      hosList2: arr,
    })
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
    this.serch3(e.detail.detail.value)
  },

  noblur3: function (e) {
    this.setData
      ({
        hosList3: []
      })
  },
  clicsho3: function (e) {
    var that = this;
    console.log(e);
    var tti = e.currentTarget.dataset.text;
    this.setData
      ({
        'expEdu3.major': tti,
        hosList3: []
      })
  },

  serch3: function (key) {
    var that = this;
    var arr = [];
    console.log("assss" + key)
    for (let i in that.data.hosList1) {
      that.data.hosList1[i].show = false;
      if (that.data.hosList1[i].serch.indexOf(key) > 0) {
        that.data.hosList1[i].show = true;
        arr.push(that.data.hosList1[i])
      }
    }
    console.log(arr)
    this.setData({
      hosList3: arr,
    })
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
    else if (this.data.email != "" && !(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(this.data.email)))
    {
      $Message({
        content: '邮箱格式不正确',
        type: 'error'
      });
    }
    else if (this.data.expEdu1['major'] != "")
    {
      var that = this;
      var arr = [];
      var tag = 0;
      for (let i in that.data.hosList1) {
        if (that.data.hosList1[i].name == that.data.expEdu1['major']) 
        {
          tag = 1;
          that.setData({
            l1: i,
          });
        }
      }
      if(tag == 0)
      {
        $Message({
          content: '本科专业不在库中',
          type: 'error'
        });
      }

    }
    else if (this.data.expEdu2['major'] != "") {
      var that = this;
      var arr = [];
      var tag = 0;
      for (let i in that.data.hosList1) {
        if (that.data.hosList1[i].name == that.data.expEdu2['major']) {
          tag = 1;
          that.setData({
            l2: i,
          });
        }
      }
      if (tag == 0) {
        $Message({
          content: '硕士专业不在库中',
          type: 'error'
        });
      }

    }
    else if (this.data.expEdu3['major'] != "") {
      var that = this;
      var arr = [];
      var tag = 0;
      for (let i in that.data.hosList1) {
        if (that.data.hosList1[i].name == that.data.expEdu3['major']) {
          tag = 1;
          that.setData({
            l3: i,
          });
        }
      }
      if (tag == 0) {
        $Message({
          content: '博士专业不在库中',
          type: 'error'
        });
      }

    }

    else {
      var age = this.data.age;
      var edu_exp, edu_exp1, edu_exp2, edu_exp3;
      edu_exp1 = this.data.expEdu1['year'] + "&" + this.data.expEdu1['major'] + "&" + this.data.expEdu1['school'];
      edu_exp2 = this.data.expEdu2['year'] + "&" + this.data.expEdu2['major'] + "&" + this.data.expEdu2['school'];
      edu_exp3 = this.data.expEdu3['year'] + "&" + this.data.expEdu3['major'] + "&" + this.data.expEdu3['school'];
      edu_exp = edu_exp1 + "|" + edu_exp2 + "|" + edu_exp3;
      if (age == "") age = "0";

      $Toast({
        content: '加载中',
        type: 'loading',
        duration: 0
      });

      wx.request({
        url: 'https://group.tttaaabbbccc.club//my/resume/modify/',
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          'Authorization': tk
        },
        data:
        {
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
          $Toast.hide();
          console.log(res.data)
          if (res.data.ret) {
            $Message({
              content: '修改成功',
              type: 'success'
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
          console.log("1111"+res.data.degree);
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
        if (res.data.edu_exp != "")
        {
          var arr_deg;
          console.log(res.data.edu_exp)
          arr_deg = res.data.edu_exp.split("|");
          if(arr_deg[0]!="")
          {
            console.log(JSON.stringify(arr_deg[0].split("&")));
            that.setData({
              "expEdu1.year": arr_deg[0].split("&")[0],
              "expEdu1.major": arr_deg[0].split("&")[1],
              "expEdu1.school": arr_deg[0].split("&")[2]
            });
          }
          if (arr_deg[1] != "") 
          {
          
            that.setData({
              "expEdu2.year": arr_deg[1].split("&")[0],
              "expEdu2.major": arr_deg[1].split("&")[1],
              "expEdu2.school": arr_deg[1].split("&")[2]
            });
          }
          if (arr_deg[2] != "") 
          {
            
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