// pages/home/home.js
const { $Message } = require('../../vant-weapp/dist/base/index');
Page({

  data: {
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    
    newmark: 0,
    istoright: true,
    f_posts: [],
    a:[
      {ch_flag: true},
      { ch_flag: true },
      { ch_flag: true }
    ],
    ch_flag: [],
    index: 0,
  },

  clickPoint: function(e)
  {
    console.log("hhhhhhhhhhh", e.currentTarget.dataset.index);
    for(var i=0; i< this.data.f_posts.length; i++)
    {
      let string = "f_posts[" + i + "].ch_flag";
      this.setData({
        [string]: true
      });
    }
    let string = "f_posts[" + e.currentTarget.dataset.index + "].ch_flag";
    this.setData({
      [string]: false
    });
  },

  clickOther:function(e)
  {
    for (var i = 0; i < this.data.f_posts.length; i++) {
      let string = "f_posts[" + i + "].ch_flag";
      this.setData({
        [string]: true
      });
    }
  },
  chakan: function (e) {
    for (var i = 0; i < this.data.f_posts.length; i++) {
      let string = "f_posts[" + i + "].ch_flag";
      this.setData({
        [string]: true
      });
    }
    var i = e.currentTarget.dataset.index;
    var para = JSON.stringify(this.data.f_posts[i]);

    wx.navigateTo({
      url: '../applyers/applyers?info=' + para,
    })
  },
  edit: function (e) {
    for (var i = 0; i < this.data.f_posts.length; i++) {
      let string = "f_posts[" + i + "].ch_flag";
      this.setData({
        [string]: true
      });
    }
    var i = e.currentTarget.dataset.index;
    var para = JSON.stringify(this.data.f_posts[i]);

    wx.navigateTo({
      url: '../modifyPostSon/modifyPostSon?info=' + para,
    })
  },

  del:function(e)
  {
    const _jwt = wx.getStorageSync('jwt');
    var that = this;
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
    var i = e.currentTarget.dataset.index;
    var para = this.data.f_posts[i].postID;
    
    wx.request({
      url: 'https://group.tttaaabbbccc.club/p/' + para + '/delete/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        console.log('res', res)
        if (res.data['ret'] != null) {
          if (res.data['error_code'] == 5) {
            $Message({
              content: '登陆状态已失效',
              type: 'error'
            });
            wx.reLaunch({
              url: '../index/index',
            })
          }
          return;
        }
        $Message({
          content: '删除成功',
          type: 'success'
        });
        that.setData({
          f_posts: res.data
        });
        console.log(that.data.f_posts)

      }
    })
    console.log(para)
  },


  clickCard: function (e) {
    console.log(e.currentTarget.dataset.index);
    var i = e.currentTarget.dataset.index;
    var para = JSON.stringify(this.data.f_posts[i]);

    wx.navigateTo({
      url: '../modifyPostDetail/modifyPostDetail?info=' + para,
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
  goMyApply: function (e) {
    wx.navigateTo({
      url: '../myApply/myApply',
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
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
        console.log("KKKKKKKKKKKKKKKKK"+id)
      }
    }
    catch (e) {
      console.log("no id");
    }
    wx.request({
      url: 'https://group.tttaaabbbccc.club/my/'+id+'/post/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        console.log('res', res)
        if(res.data['ret']!=null)
        {
          if(res.data['error_code'] == 5)
          {
            $Message({
              content: '登陆状态已失效',
              type: 'error'
            });
            wx.reLaunch({
              url: '../login/login',
            })
          }
          return;
        }
        that.setData({
          f_posts: res.data
        });
        for (var i = 0; i < that.data.f_posts.length; i++) {
          let string = "f_posts[" + i + "].ch_flag";
          that.setData({
            [string]: true
          });
        }
        console.log(that.data.f_posts)

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