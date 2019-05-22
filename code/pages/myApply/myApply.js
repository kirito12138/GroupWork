// pages/home/home.js
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp();
Page({

  data: {
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    f_posts: [],
    num1: 1,
    num2: 2,
    date: "19/05/01",
    name: "111",
    postImg: "../../image/no_load.png",
    title: "示例标题",
    ddl: "2019-05-20",
    acceptedNum: "2",
    tagsDict: ["哲学类", "经济学类", "财政学类", "金融学类", "经济与贸易类", "法学类", "政治学类", "社会学类", "民族学类", "马克思主义理论类", "公安学类", "教育学类", "体育学类", "中国语言文学类", "外国语言文学类", "新闻传播学类", "历史学类", "数学类", "物理学类", "化学类", "天文学类", "地理科学类", "大气科学类", "海洋科学类", "地球物理学类", "地质学类", "生物科学类", "心理学类", "统计学类", "力学类", "机械类", "仪器类", "材料类", "能源动力类", "电气类", "电子信息类", "自动化类", "计算机类", "土木类", "水利类", "测绘类", "化工与制药类", "地质类", "矿业类", "纺织类", "轻工类", "交通运输类", "海洋工程类", "航空航天类", "兵器类", "核工程类", "农业工程类", "林业工程类", "环境科学与工程类", "生物医学工程类", "食品科学与工程类", "建筑类", "安全科学与工程类", "生物工程类", "公安技术类", "植物生产类", "自然保护与环境生态类", "动物生产类", "动物医学类", "林学类", "水产类", "草学类", "基础医学类", "临床医学类", "口腔医学类", "公共卫生与预防医学类", "中医学类", "中西医结合类", "药学类", "中药学类", "法医学类", "医学技术类", "护理学类", "管理科学与工程类", "工商管理类", "农业经济管理类", "公共管理类", "图书情报与档案管理类", "物流管理与工程类", "工业工程类", "电子商务类", "旅游管理类", "艺术学理论类", "音乐与舞蹈学类", "戏剧与影视学类", "美术学类", "设计学类", "实习招募", "实验室招募", "学科竞赛", "学生项目", "个人招募", "志愿招募", "娱乐活动"],
    tagsIndex: [2, 3, 4],
    requestNum: '10',
    hosList1: [
      { id: 101, name: "aaa", show: true, serch: "10111" },
      { id: 102, name: "bbb", show: true, serch: "10212" },
    ],
    hosList: [],
    tei: 1
  },


 

  clickCard: function (e) {
    console.log("-----------" + this.data);
    console.log(e.currentTarget.dataset.index);
    var i = e.currentTarget.dataset.index;
    var para = JSON.stringify(this.data.f_posts[i]);
    console.log("111111111" + this.data.f_posts[i]);
    wx.navigateTo({
      url: '../myApplyson/myApplyson?info=' + para,
    })


  },

  // 点击左上角小图标事件
  tap_ch: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },

  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  tap_drag: function (e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;

    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },
  goPersonInfo: function () {
    wx.navigateTo({
      url: '../personInfo/personInfo',
    })
  },
  goHome: function (e) {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  goMyApply: function(e)
  {
    wx.navigateTo({
      url: '../myApply/myApply',
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    if (app.globalData.userInfo !== null) {
      this.setData({
        userimg: app.globalData.userInfo.avatarUrl,
        username: app.globalData.userInfo.nickName,
        login: true
      })
    }

    var id;
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
    try {
      const _id = wx.getStorageSync('userid');
      console.log(_id)
      if (_id) {
        console.log(_id)
        id = JSON.parse(_id);
      }
    }
    catch (e) {
      console.log("no id");
    }

    wx.request({
      url: 'https://group.tttaaabbbccc.club//my/'+id+'/apply/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        if(res.data['ret'] == false)
        {
          if (res.data['error_code'] == 1)
          {
            $Message({
              content: '不是GET请求',
              type: 'error'
            });
          }
          else if (res.data['error_code'] == 3)
          {
            $Message({
              content: '该 ID 对应的用户不存在',
              type: 'error'
            });
          }
          else if (res.data['error_code'] == 5)
          {
            $Message({
              content: '请重新登录',
              type: 'error'
            });
          }
        }
        else
        {
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {

            var sp = res.data[i].labels.split("&");
            var ssp = [];
            for (var j = 0; j < sp.length; j++) {

              ssp[j] = parseInt(sp[j]);

            }

            res.data[i]["sp"] = ssp;
            if (res.data[i].labels == "") {
              res.data[i]["vie"] = false;
            }
            else {
              res.data[i]["vie"] = true;
            }
            console.log(that.data.tagsIndex)
          }
          that.setData({
            f_posts: res.data
          });
          console.log(that.data.f_posts)
        }
        
      }
    })
  },

  goChangePwd: function (e) {
    wx.navigateTo({
      url: '../changePwd/changePwd',
    })
  },
  goMyResume: function (e) {
    wx.navigateTo({
      url: '../myResume/myResume',
    })
  },
  goMyPost: function (e) {
    wx.navigateTo({
      url: '../myPost/myPost',
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