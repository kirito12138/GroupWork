// pages/postDetail/postDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      num1:1,
      num2:2,
      date:"19/05/01",
      name:"111",
      postImg:"../../image/no_load.png",
      title:"示例标题",
      ddl:"2019-05-20",
      acceptedNum:"2",
      tagsDict: ['衣着整洁','准时送达','餐品完善','服务专业','微笑服务','穿着专业','文字评价'],
      tagsIndex:[2,3,4],
      requestNum:'10',
      userimg: "",
      username: "",
    tagsDict: ["哲学类", "经济学类", "财政学类", "金融学类", "经济与贸易类", "法学类", "政治学类", "社会学类", "民族学类", "马克思主义理论类", "公安学类", "教育学类", "体育学类", "中国语言文学类", "外国语言文学类", "新闻传播学类", "历史学类", "数学类", "物理学类", "化学类", "天文学类", "地理科学类", "大气科学类", "海洋科学类", "地球物理学类", "地质学类", "生物科学类", "心理学类", "统计学类", "力学类", "机械类", "仪器类", "材料类", "能源动力类", "电气类", "电子信息类", "自动化类", "计算机类", "土木类", "水利类", "测绘类", "化工与制药类", "地质类", "矿业类", "纺织类", "轻工类", "交通运输类", "海洋工程类", "航空航天类", "兵器类", "核工程类", "农业工程类", "林业工程类", "环境科学与工程类", "生物医学工程类", "食品科学与工程类", "建筑类", "安全科学与工程类", "生物工程类", "公安技术类", "植物生产类", "自然保护与环境生态类", "动物生产类", "动物医学类", "林学类", "水产类", "草学类", "基础医学类", "临床医学类", "口腔医学类", "公共卫生与预防医学类", "中医学类", "中西医结合类", "药学类", "中药学类", "法医学类", "医学技术类", "护理学类", "管理科学与工程类", "工商管理类", "农业经济管理类", "公共管理类", "图书情报与档案管理类", "物流管理与工程类", "工业工程类", "电子商务类", "旅游管理类", "艺术学理论类", "音乐与舞蹈学类", "戏剧与影视学类", "美术学类", "设计学类"],

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
    this.data.info=JSON.parse(options.info);
    
    this.setData({
      title: this.data.info.title,
      postDetail: this.data.info.postDetail,
      requestNum: this.data.info.requestNum,
      acceptedNum: this.data.info.acceptedNum,
      ddl: this.data.info.ddl,
      sp:this.data.info.sp,
      postImg:this.data.info.image_url,
      
      postID: this.data.info.postID,
      posterID: this.data.info.posterID
    })
    wx.request({
      url: 'https://group.tttaaabbbccc.club/my/'+that.data.posterID+'/detail/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        console.log(res)
        if (res.data['ret']) {
          that.setData({
            name: res.data['name']
          })
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

  },
  
  applyFor: function(e){
    //TODO:完成申请按钮功能
    var para = JSON.stringify(this.data.postID);
    wx.navigateTo({
      url: '../applyThis/applyThis?info=' + para,
    })
  }
})