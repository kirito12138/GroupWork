// pages/home/home.js
var app = getApp();
Page({

  data: {
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    f_posts:[],
    num1: 1,
    num2: 2,
    date: "19/05/01",
    name: "111",
    postImg: "../../image/no_load.png",
    title: "示例标题",
    ddl: "2019-05-20",
    acceptedNum: "2",
    tagsDict: ['衣着整洁', '准时送达', '餐品完善', '服务专业', '微笑服务', '穿着专业', '文字评价'],
    tagsIndex: [2, 3, 4],
    requestNum: '10',
  },




  clickCard: function(e){
    console.log(e.currentTarget.dataset.index);
    var i = e.currentTarget.dataset.index;
    var para = JSON.stringify(this.data.f_posts[i]);
    //console.log("111111111" + this.data.f_posts[i]);
    wx.navigateTo({
      url: '../postDetail/postDetail?info=' + para,
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
  goHome:function(e)
  {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  goMyApply: function (e) {
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
      url: 'https://group.tttaaabbbccc.club/f/processing/',
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

  goChangePwd: function(e)
  {
    wx.navigateTo({
      url: '../changePwd/changePwd',
    })
  },
  goMyResume: function(e)
  {
    wx.navigateTo({
      url: '../myResume/myResume',
    })
  },
  goMyPost:function(e)
  {
    wx.navigateTo({
      url: '../myPost/myPost',
    })
  },

  newPost: function(e)
  {
    wx.navigateTo({
      url: '../newPost/newPost',
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
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
      url: 'https://group.tttaaabbbccc.club/f/processing/',
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
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新

    }, 150);
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