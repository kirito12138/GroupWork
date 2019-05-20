// pages/newPost/newPost.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spinShow: false,
    userID:"currentUser",
    requestNum:1,
    ddl:'日期选择器',
    title:"",
    postDetail:"",
    stringNum:"1",
    lastDate: "2017-09-01",
    beginDate: "2015-09-01",
    tempFilePaths: [],
    riderCommentList: [
      { ind: 0, value: "哲学类", selected: false, title: "哲学类" },
      { ind: 1, value: "经济学类", selected: false, title: "经济学类" },
      { ind: 2, value: "财政学类", selected: false, title: "财政学类" },
      { ind: 3, value: "金融学类", selected: false, title: "金融学类" },
      { ind: 4, value: "经济与贸易类", selected: false, title: "经济与贸易类" },
      { ind: 5, value: "法学类", selected: false, title: "法学类" },
      { ind: 6, value: "政治学类", selected: false, title: "政治学类" },
      { ind: 7, value: "社会学类", selected: false, title: "社会学类" },
      { ind: 8, value: "民族学类", selected: false, title: "民族学类" },
      { ind: 9, value: "马克思主义理论类", selected: false, title: "马克思主义理论类" },
      { ind: 10, value: "公安学类", selected: false, title: "公安学类" },
      { ind: 11, value: "教育学类", selected: false, title: "教育学类" },
      { ind: 12, value: "体育学类", selected: false, title: "体育学类" },
      { ind: 13, value: "中国语言文学类", selected: false, title: "中国语言文学类" },
      { ind: 14, value: "外国语言文学类", selected: false, title: "外国语言文学类" },
      { ind: 15, value: "新闻传播学类", selected: false, title: "新闻传播学类" },
      { ind: 16, value: "历史学类", selected: false, title: "历史学类" },
      { ind: 17, value: "数学类", selected: false, title: "数学类" },
      { ind: 18, value: "物理学类", selected: false, title: "物理学类" },
      { ind: 19, value: "化学类", selected: false, title: "化学类" },
      { ind: 20, value: "天文学类", selected: false, title: "天文学类" },
      { ind: 21, value: "地理科学类", selected: false, title: "地理科学类" },
      { ind: 22, value: "大气科学类", selected: false, title: "大气科学类" },
      { ind: 23, value: "海洋科学类", selected: false, title: "海洋科学类" },
      { ind: 24, value: "地球物理学类", selected: false, title: "地球物理学类" },
      { ind: 25, value: "地质学类", selected: false, title: "地质学类" },
      { ind: 26, value: "生物科学类", selected: false, title: "生物科学类" },
      { ind: 27, value: "心理学类", selected: false, title: "心理学类" },
      { ind: 28, value: "统计学类", selected: false, title: "统计学类" },
      { ind: 29, value: "力学类", selected: false, title: "力学类" },
      { ind: 30, value: "机械类", selected: false, title: "机械类" },
      { ind: 31, value: "仪器类", selected: false, title: "仪器类" },
      { ind: 32, value: "材料类", selected: false, title: "材料类" },
      { ind: 33, value: "能源动力类", selected: false, title: "能源动力类" },
      { ind: 34, value: "电气类", selected: false, title: "电气类" },
      { ind: 35, value: "电子信息类", selected: false, title: "电子信息类" },
      { ind: 36, value: "自动化类", selected: false, title: "自动化类" },
      { ind: 37, value: "计算机类", selected: false, title: "计算机类" },
      { ind: 38, value: "土木类", selected: false, title: "土木类" },
      { ind: 39, value: "水利类", selected: false, title: "水利类" },
      { ind: 40, value: "测绘类", selected: false, title: "测绘类" },
      { ind: 41, value: "化工与制药类", selected: false, title: "化工与制药类" },
      { ind: 42, value: "地质类", selected: false, title: "地质类" },
      { ind: 43, value: "矿业类", selected: false, title: "矿业类" },
      { ind: 44, value: "纺织类", selected: false, title: "纺织类" },
      { ind: 45, value: "轻工类", selected: false, title: "轻工类" },
      { ind: 46, value: "交通运输类", selected: false, title: "交通运输类" },
      { ind: 47, value: "海洋工程类", selected: false, title: "海洋工程类" },
      { ind: 48, value: "航空航天类", selected: false, title: "航空航天类" },
      { ind: 49, value: "兵器类", selected: false, title: "兵器类" },
      { ind: 50, value: "核工程类", selected: false, title: "核工程类" },
      { ind: 51, value: "农业工程类", selected: false, title: "农业工程类" },
      { ind: 52, value: "林业工程类", selected: false, title: "林业工程类" },
      { ind: 53, value: "环境科学与工程类", selected: false, title: "环境科学与工程类" },
      { ind: 54, value: "生物医学工程类", selected: false, title: "生物医学工程类" },
      { ind: 55, value: "食品科学与工程类", selected: false, title: "食品科学与工程类" },
      { ind: 56, value: "建筑类", selected: false, title: "建筑类" },
      { ind: 57, value: "安全科学与工程类", selected: false, title: "安全科学与工程类" },
      { ind: 58, value: "生物工程类", selected: false, title: "生物工程类" },
      { ind: 59, value: "公安技术类", selected: false, title: "公安技术类" },
      { ind: 60, value: "植物生产类", selected: false, title: "植物生产类" },
      { ind: 61, value: "自然保护与环境生态类", selected: false, title: "自然保护与环境生态类" },
      { ind: 62, value: "动物生产类", selected: false, title: "动物生产类" },
      { ind: 63, value: "动物医学类", selected: false, title: "动物医学类" },
      { ind: 64, value: "林学类", selected: false, title: "林学类" },
      { ind: 65, value: "水产类", selected: false, title: "水产类" },
      { ind: 66, value: "草学类", selected: false, title: "草学类" },
      { ind: 67, value: "基础医学类", selected: false, title: "基础医学类" },
      { ind: 68, value: "临床医学类", selected: false, title: "临床医学类" },
      { ind: 69, value: "口腔医学类", selected: false, title: "口腔医学类" },
      { ind: 70, value: "公共卫生与预防医学类", selected: false, title: "公共卫生与预防医学类" },
      { ind: 71, value: "中医学类", selected: false, title: "中医学类" },
      { ind: 72, value: "中西医结合类", selected: false, title: "中西医结合类" },
      { ind: 73, value: "药学类", selected: false, title: "药学类" },
      { ind: 74, value: "中药学类", selected: false, title: "中药学类" },
      { ind: 75, value: "法医学类", selected: false, title: "法医学类" },
      { ind: 76, value: "医学技术类", selected: false, title: "医学技术类" },
      { ind: 77, value: "护理学类", selected: false, title: "护理学类" },
      { ind: 78, value: "管理科学与工程类", selected: false, title: "管理科学与工程类" },
      { ind: 79, value: "工商管理类", selected: false, title: "工商管理类" },
      { ind: 80, value: "农业经济管理类", selected: false, title: "农业经济管理类" },
      { ind: 81, value: "公共管理类", selected: false, title: "公共管理类" },
      { ind: 82, value: "图书情报与档案管理类", selected: false, title: "图书情报与档案管理类" },
      { ind: 83, value: "物流管理与工程类", selected: false, title: "物流管理与工程类" },
      { ind: 84, value: "工业工程类", selected: false, title: "工业工程类" },
      { ind: 85, value: "电子商务类", selected: false, title: "电子商务类" },
      { ind: 86, value: "旅游管理类", selected: false, title: "旅游管理类" },
      { ind: 87, value: "艺术学理论类", selected: false, title: "艺术学理论类" },
      { ind: 88, value: "音乐与舞蹈学类", selected: false, title: "音乐与舞蹈学类" },
      { ind: 89, value: "戏剧与影视学类", selected: false, title: "戏剧与影视学类" },
      { ind: 90, value: "美术学类", selected: false, title: "美术学类" },
      { ind: 91, value: "设计学类", selected: false, title: "设计学类" },
      { ind: 92, value: "实习招募", selected: false, title: "实习招募" },
      { ind: 93, value: "实验室招募", selected: false, title: "实验室招募" },
      { ind: 94, value: "学科竞赛", selected: false, title: "学科竞赛" },
      { ind: 95, value: "学生项目", selected: false, title: "学生项目" },
      { ind: 96, value: "个人招募", selected: false, title: "个人招募" },
      { ind: 97, value: "志愿招募", selected: false, title: "志愿招募" },
      { ind: 98, value: "娱乐活动", selected: false, title: "娱乐活动" },

    ],
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
      { id: 9001, value: "实习招募", selected: false, title: "000实习招募" },
      { id: 9003, value: "实验室招募", selected: false, title: "000实验室招募" },
      { id: 9004, value: "学科竞赛", selected: false, title: "000学科竞赛" },
      { id: 9005, value: "学生项目", selected: false, title: "000学生项目" },
      { id: 9006, value: "个人招募", selected: false, title: "000个人招募" },
      { id: 9007, value: "志愿招募", selected: false, title: "000志愿招募" },
      { id: 9008, value: "娱乐活动", selected: false, title: "000娱乐活动" },
    ],
    hosList: [],
    tei: ""
  },

  input1: function (e) {
    this.setData
      ({
        tei: e.detail.value
      })
    this.serch(e.detail.value)
  },
  confirm1: function (e) {
    this.serch(e.detail.value)
  },

  noblur: function(e)
  {
    this.setData
      ({
        tei: "",
        hosList: []
      })
  },

  clicsho: function (e) {
    var that = this;
    console.log(e);
    var tti = e.currentTarget.dataset.text;
    for(var i = 0; i< that.data.riderCommentList.length; i++)
    {
      if (that.data.riderCommentList[i].value == tti)
      {
        let string = "riderCommentList["+i+"].selected";
        that.setData
        ({
            [string]: true,
        })
      }
    }
    this.setData
      ({
        tei: "",
        hosList: []
      })
  },

  serch: function (key) {
    var that = this;
    var arr = [];
    console.log(key)
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



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    this.data.beginDate = year + seperator1 + month + seperator1 + strDate;
    this.data.ddl=this.data.beginDate;
    year = year+5;
    this.data.lastDate = year + seperator1 + month + seperator1 + strDate;
    //console.log(this.data.beginDate);
    //console.log(this.data.lastDate);
  },
  handleLoading() {
    $Toast({
      content: '加载中',
      type: 'loading'
    });
  },

  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        if (this.data.tempFilePaths.length > 1)
        {
          $Message({
            content: '只能选择一张图片，请重新选择',
            type: 'error'
          });
        }
        else
        {
          for (var i = 0, h = tempFilePaths.length; i < h; i++) {
            //上传文件
            /*  wx.uploadFile({
                url: HOST + '地址路径',
                filePath: tempFilePaths[i],
                name: 'uploadfile_ant',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                success: function (res) {
                  count++;
                  //如果是最后一张,则隐藏等待中  
                  if (count == tempFilePaths.length) {
                    wx.hideToast();
                  }
                },
                fail: function (res) {
                  wx.hideToast();
                  wx.showModal({
                    title: '错误提示',
                    content: '上传图片失败',
                    showCancel: false,
                    success: function (res) { }
                  })
                }
              });*/
          }
        }
        

      }
    })
  },

  checkboxChange(e) {
    console.log('checkboxChange e:', e);
    let string = "riderCommentList[" + e.target.dataset.index + "].selected"
    this.setData({
      [string]: !this.data.riderCommentList[e.target.dataset.index].selected
    })
    let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value)
    console.log('所有选中的值为：', detailValue)
  },


  getTitle: function(e){
    
    this.setData({
      title:e.detail.value
    })
    console.log(this.data.title)
  },

  getDetail: function (e) {
    this.setData({
      postDetail: e.detail.value
    })
    console.log(this.data.postDetail)
  },

  

  getNum: function (e) {
    this.setData({
      stringNum: e.detail.value
    })
    if ( !(/^[0-9]+$/.test(this.data.stringNum))|| parseInt(this.data.stringNum) <= 0 || parseInt(this.data.stringNum)>100)
    {
      this.setData({
        stringNum: "1",
        requestNum:1
      })
      $Toast({
        content: '需求人数最小为1，最大100！',
        type: 'error'
      });
    }
    else
    {
      this.data.requestNum = parseInt(this.data.stringNum);
    }
    console.log(this.data.requestNum);
  },

  bindDateChange: function (e) {
    this.setData({
      ddl: e.detail.value
    })
    console.log(this.data.ddl);
  },

  genPost: function(e){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (this.data.title.length==0)
    {
      $Toast({
        content: '发布标题不能为空！',
        type: 'error'
      });
    }
    else if (this.data.postDetail.length==0)
    {
      $Toast({
        content: '详细需求不能为空！',
        type: 'error'
      });
    }
    else if (parseInt(this.data.ddl.slice(0, 4)) < year || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7))<month)
      || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7)) == month && parseInt(this.data.ddl.slice(8, 10)) <= strDate))
      {
      $Toast({
        content: '截止日期'+this.data.ddl+'已过！',
        type: 'error'
      });
      }
      else{
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
        let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.ind);
        var tags = "";
        for(var i = 0; i< detailValue.length; i++)
        {
          //tags+=detailValue[i];
          //tags+="&";
        }
        tags = detailValue.join("&");
        console.log('所有选中的值为：', tags);

        console.log("输出调试：");
        console.log(this.data.title);
        console.log(this.data.postDetail);
        console.log(this.data.requestNum);
        console.log(this.data.ddl);

        $Toast({
          content: '加载中',
          type: 'loading',
          duration: 0
        });

        wx.request({
          url: 'https://group.tttaaabbbccc.club/c/post/',
          data: {
            title: this.data.title, //标题  : 20字符之内 （可以根据前端需求调整）
            postDetail: this.data.postDetail,//内容 : text类型，无字数限制
            requestNum: this.data.requestNum, //所需人数 : >0
            ddl: this.data.ddl,
            labels: tags,
            //userimg: app.globalData.userInfo.avatarUrl,
            //username: app.globalData.userInfo.nickName,
          },
          method: "POST",
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": tk
          },
          success(res) {
            $Toast.hide();
            console.log(res.data)
            if (res.data["ret"]==false)
            {
              if (res.data["error_code"] == 4)
              {
                $Toast({
                  content: '已存在完全相同发布！',
                  type: 'error'
                });
              }
              else if (res.data["error_code"] == 5) {
                $Toast({
                  content: '登录过期，请重新登录！',
                  type: 'error'
                });
              }
              else
              {
                $Toast({
                  content: '新建发布错误！错误码：' + res.data["error_code"] + '，请联系开发者',
                  type: 'error'
                });
              }
            }
            else if (res.data["ret"] == true)
            {
              console.log(that.data.tempFilePaths[0])
              console.log(res.data["postID"])
              var count = 0;
              for (var i = 0, h = that.data.tempFilePaths.length; i < h; i++) {
                //上传文件
                  $Toast({
                    content: '上传中',
                    type: 'loading',
                    duration: 0
                  });
                  wx.uploadFile({
                    url: 'https://group.tttaaabbbccc.club/p/' + res.data["postID"] + '/upload_image/',
                    filePath: that.data.tempFilePaths[i],
                    name: 'image',
                    header: {
                      "Content-Type": "multipart/form-data",
                      "Authorization": tk
                    },
                    success: function (res) {
                      $Toast.hide()
                      console.log(res)
                      $Toast({
                        content: '新建发布成功！',
                        type: 'success'
                      })
                      wx.reLaunch({
                        url: '../home/home',
                      })
                    },
                    fail: function (res) {
                      wx.hideToast();
                      wx.showModal({
                        title: '错误提示',
                        content: '上传图片失败',
                        showCancel: false,
                        success: function (res) { }
                      })
                    }
                  });
              }
              
              setTimeout(function () {
                wx.redirectTo({
                  url: '../home/home',
                })
              }, 1000)
              
              
            }
            else{
              $Toast({
                content: '无法连接到服务器',
                type: 'error'
              })
            }
          },
          fail(res){
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