// pages/newPost/newPost.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: "currentUser",
    requestNum: 1,
    ddl: '日期选择器',
    title: "",
    postDetail: "",
    stringNum: "1",
    lastDate: "2017-09-01",
    beginDate: "2015-09-01"
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
    this.data.ddl = this.data.beginDate;
    year = year + 5;
    this.data.lastDate = year + seperator1 + month + seperator1 + strDate;
    this.data.info = JSON.parse(options.info);
    this.setData({
      title: this.data.info.title,
      postDetail: this.data.info.postDetail,
      requestNum: this.data.info.requestNum,
      acceptedNum: this.data.info.acceptedNum,
      ddl: this.data.info.ddl,

      postID: this.data.info.postID,
      posterID: this.data.info.posterID
    })
    //console.log(this.data.beginDate);
    //console.log(this.data.lastDate);
  },

  getTitle: function (e) {

    this.setData({
      title: e.detail.value
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
    if (!(/^[0-9]+$/.test(this.data.stringNum)) || parseInt(this.data.stringNum) <= 0 || parseInt(this.data.stringNum) > 100) {
      this.setData({
        stringNum: "1",
        requestNum: 1
      })
      $Toast({
        content: '需求人数最小为1，最大100！',
        type: 'error'
      });
    }
    else {
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

  genPost: function (e) {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (this.data.title.length == 0) {
      $Toast({
        content: '发布标题不能为空！',
        type: 'error'
      });
    }
    else if (this.data.postDetail.length == 0) {
      $Toast({
        content: '详细需求不能为空！',
        type: 'error'
      });
    }
    else if (parseInt(this.data.ddl.slice(0, 4)) < year || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7)) < month)
      || (parseInt(this.data.ddl.slice(0, 4)) == year && parseInt(this.data.ddl.slice(5, 7)) == month && parseInt(this.data.ddl.slice(8, 10)) <= strDate)) {
      $Toast({
        content: '截止日期' + this.data.ddl + '已过！',
        type: 'error'
      });
    }
    else {
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
      console.log("输出调试：");
      console.log(this.data.title);
      console.log(this.data.postDetail);
      console.log(this.data.requestNum);
      console.log(this.data.ddl);
      wx.request({
        url: 'https://group.tttaaabbbccc.club/p/'+ this.data.postID+ '/modify/',
        data: {
          title: this.data.title, //标题  : 20字符之内 （可以根据前端需求调整）
          postDetail: this.data.postDetail,//内容 : text类型，无字数限制
          requestNum: this.data.requestNum, //所需人数 : >0
          ddl: this.data.ddl
        },
        method: "POST",
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": tk
        },
        success(res) {
          if (res.data["ret"] == false) {
            if (res.data["error_code"] == 4) {
              $Toast({
                content: '该发布不存在，请先新建发布',
                type: 'error'
              });
            }
            else if (res.data["error_code"] == 5) {
              $Toast({
                content: '登录过期，请重新登录！',
                type: 'error'
              });
            }
            else if (res.data["error_code"] == 6) {
              $Toast({
                content: '只有发布者可修改自己的发布信息',
                type: 'error'
              });
            }
            else {
              $Toast({
                content: '修改发布错误！错误码：' + res.data["error_code"] + '，请联系开发者',
                type: 'error'
              });
            }
          }
          else if (res.data["ret"] == true) {
            $Toast({
              content: '修改成功！',
              type: 'success'
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../home/home',
              })
            }, 1000)


          }
          else {
            $Toast({
              content: '无法连接到服务器',
              type: 'error'
            })
          }
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