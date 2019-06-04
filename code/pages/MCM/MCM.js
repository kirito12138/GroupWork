// pages/MCM/MCM.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
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
    if(e.detail.x < 200)
    {
      upQue();
    }
    else if(e.detail.x >=200)
    {
      newone();
    }
  },

  newone: function(e)
  {
    
  },

  upQue: function(e)
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

    const ctx = wx.createCanvasContext('myCanvas')

    ctx.moveTo(10, 0)
    ctx.lineTo(115, 0)
    ctx.lineTo(145,30)
    ctx.lineTo(355,30)
    ctx.lineTo(355,35)
    ctx.lineTo(0, 35)
    ctx.lineTo(0,10)
    ctx.arc(0 + 10, 0 + 10, 10, Math.PI, Math.PI * 1.5)

    ctx.setFillStyle('yellow')
    ctx.fill()

    ctx.setFillStyle('black')
    ctx.setFontSize(20)
    ctx.fillText('我的队伍', 15, 25)
 
    ctx.draw()

    const bot = wx.createCanvasContext('bottcan')
    
    bot.moveTo(0, 0)
    bot.lineTo(170, 0)
    bot.lineTo(200, 35)
    bot.lineTo(10, 35)
    bot.arc(0 + 10, 35 - 10, 10, Math.PI * 0.5, Math.PI)
    bot.setFillStyle('yellow')
    bot.fill()
    bot.setFillStyle('black')
    bot.setFontSize(20)
    bot.fillText('重填问卷', 50, 25)


    bot.beginPath()
    bot.moveTo(170, 0)
    bot.lineTo(353, 0)
    bot.lineTo(353, 25)
    bot.arc(353 - 10, 35 - 10, 10, 0, Math.PI * 0.5)
    bot.lineTo(200, 35)
    bot.setFillStyle('green')
    bot.fill()
    bot.setFillStyle('black')
    bot.setFontSize(20)
    bot.fillText('换一批', 230, 25)



    bot.draw()


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