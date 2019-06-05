// pages/MCM/MCM.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    is_fill: true,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '填写',
        color: '#ed3f14',
        loading: false
      }
    ],
    visible: false,
    partens: [],
    team: [],
  },

  cancel_fil: function (e) {
    if (e.detail.index == 0) {
      this.gotoHome(e)
    }
    else {     
      this.fil(e)
    }
  },

  gotoHome: function(e) {
    wx.reLaunch({
      url: '../home/home',
    })
    this.setData({
      visible: false
    })
  },
  fil: function(e) {
    wx.reLaunch({
      url: '../home/home',
    })
    this.setData({
      visible: false
    })
  },

  inputser: function (e) {

    this.setData({
      searchValue: e.detail.value,
    });
  },

  searchkey: function (e) {

    var can = { 'searchValue': "", 'tg': 0 };
    can['searchValue'] = this.data.searchValue;
    can['tg'] = 1;
    var para = JSON.stringify(can);

    para = encodeURIComponent(para)
    //TODO  像后端传参

  },

  choose: function(e)
  {
    console.log(e)
    var wid = this.data.windowWidth;
    if(e.detail.x < (wid/2))
    {
      upQue();
    }
    else if (e.detail.x >= (wid / 2))
    {
      newone();
    }
  },

  newone: function()
  {

  },

  upQue: function()
  {

  },

  fillSurvey: function(e)
  {
    //填写问卷
  },

  invite: function(e)
  {

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
          windowWidth:res.windowWidth*0.94
        })

      }
    })

    var wid = this.data.windowWidth;

    const ctx = wx.createCanvasContext('myCanvas')

    ctx.moveTo(10, 0)
    ctx.lineTo(115, 0)
    ctx.lineTo(145,30)
    ctx.lineTo(wid,30)
    ctx.lineTo(wid,35)
    ctx.lineTo(0, 35)
    ctx.lineTo(0,10)
    ctx.arc(0 + 10, 0 + 10, 10, Math.PI, Math.PI * 1.5)

    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.setFillStyle('black')
    ctx.setFontSize(20)
    ctx.fillText('我的队伍', 15, 25)
 
    ctx.draw()

    const bot = wx.createCanvasContext('bottcan')
    
    bot.moveTo(0, 0)
    bot.lineTo(wid/2-15, 0)
    bot.lineTo(wid / 2 + 15, 35)
    bot.lineTo(10, 35)
    bot.arc(0 + 10, 35 - 10, 10, Math.PI * 0.5, Math.PI)
    bot.setFillStyle('yellow')
    bot.fill()
    bot.setFillStyle('black')
    bot.setFontSize(20)
    bot.fillText('重填问卷', 50, 25)


    bot.beginPath()
    bot.moveTo(wid / 2 - 15, 0)
    bot.lineTo(wid, 0)
    bot.lineTo(wid, 25)
    bot.arc(wid - 10, 35 - 10, 10, 0, Math.PI * 0.5)
    bot.lineTo(wid / 2 + 15, 35)
    bot.setFillStyle('blue')
    bot.fill()
    bot.setFillStyle('black')
    bot.setFontSize(20)
    bot.fillText('换一批', 230, 25)

    bot.draw()

    const intr = wx.createCanvasContext('intr')
    intr.moveTo(wid-115, 0)
    intr.lineTo(wid-10, 0)
    intr.arc(wid - 10, 0 + 10, 10, Math.PI * 1.5, Math.PI * 2)
    intr.lineTo(wid, 35)
    
    intr.lineTo(0, 35)
    intr.lineTo(0,30)
    intr.lineTo(wid-145,30)
    

    intr.setFillStyle('blue')
    intr.fill()

    intr.setFillStyle('black')
    intr.setFontSize(20)
    intr.fillText('推荐队友', wid-110, 25)

    intr.draw()

    const quit = wx.createCanvasContext('bottcan1')
    quit.beginPath()
    quit.moveTo(wid / 2 - 15, 0)
    quit.lineTo(wid, 0)
    quit.lineTo(wid, 25)
    quit.arc(wid - 10, 35 - 10, 10, 0, Math.PI * 0.5)
    quit.lineTo(wid / 2 + 15, 35)
    quit.setFillStyle('red')
    quit.fill()
    quit.setFillStyle('black')
    quit.setFontSize(20)
    quit.fillText('退出队伍', 230, 25)

    quit.draw()

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
      url: 'https://group.tttaaabbbccc.club/f/processing/',
      method: "POST",
      data: {
        history: _history,
      },
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data: {
        history: '0'
      },
      success(res) {
        $Toast.hide()
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