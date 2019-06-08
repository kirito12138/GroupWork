// pages/serchMan/serchMan.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp() // 获得全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    partens:[],
    p_pos:[],
    is_fill: true,
  },

  changeShow: function (e) {
    var that = this;
    var i = e.currentTarget.dataset.index;
    console.log(e)
    console.log(this.data.p_pos[i])
    if (this.data.p_pos[i].ifShow == false) {
      let string = "p_pos[" + i + "].ifShow";
      that.setData
        ({
          [string]: true,
        })
    }
    else {
      let string = "p_pos[" + i + "].ifShow";
      that.setData
        ({
          [string]: false,
        })
    }
  },

  invite: function (e) {
    //TODO invite
    var that = this
    var i = e.currentTarget.dataset.index;

    console.log(this.data.p_pos[i])
    var user_id = this.data.p_pos[i].user_id;

    const _jwt = wx.getStorageSync('jwt');
    var _history = wx.getStorageSync('history');
    var tk;

    if (_jwt) {
      tk = JSON.parse(_jwt);
      console.log(tk);
    }
    else {
      console.log("no token");
      return;
    }

    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });
    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/invite/' + user_id + '/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()



      },
      fail(res) {
        $Toast.hide();
      }
    })
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });
    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/search/user/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data: {
        name: this.data.info
      },
      success(res) {
        $Toast.hide()
        console.log(res)
        console.log(res.data)
        

        that.setData({
          partens: res.data,
          p_pos: res.data,
        })
        console.log(that.data.p_pos)
      },
      fail(res) {
        $Toast.hide();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        that.setData
          ({
            windowWidth: res.windowWidth * 0.94
          })

      }
    })

    var wid = this.data.windowWidth;
    

    const intr = wx.createCanvasContext('intr')
    intr.moveTo(10, 0)
    intr.lineTo(115, 0)
    intr.lineTo(145, 30)
    intr.lineTo(wid, 30)
    intr.lineTo(wid, 35)
    intr.lineTo(0, 35)
    intr.lineTo(0, 10)
    intr.arc(0 + 10, 0 + 10, 10, Math.PI, Math.PI * 1.5)

    intr.setFillStyle('#3075FF')
    intr.fill()

    intr.setFillStyle('white')
    intr.setFontSize(20)
    intr.fillText('搜索结果', 15, 25)


    intr.draw()

    var that = this;

    var kk = decodeURIComponent(options.info)
    this.data.info = JSON.parse(kk);

    const _jwt = wx.getStorageSync('jwt');
    var _history = wx.getStorageSync('history');
    var tk;

    if (_jwt) {
      tk = JSON.parse(_jwt);
      console.log(tk);
    }
    else {
      console.log("no token");
      return;
    }
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });

    console.log(this.data.info)
    var ss = this.data.info.toString()
    console.log("chuan", ss)

    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/search/user/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data: {
        name: this.data.info
      },
      success(res) {
        $Toast.hide()
        console.log(res)
        console.log(res.data)

          that.setData({
            partens: res.data,
            p_pos: res.data,
          })
      },
      fail(res) {
        $Toast.hide();
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