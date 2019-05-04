// pages/newPost/newPost.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:"currentUser",
    requestNum:1,
    ddl:'日期选择器',
    title:"",
    postDetail:"",
    stringNum:"1",
    lastDate: "2017-09-01",
    beginDate: "2015-09-01",
    tempFilePaths: [],
    riderCommentList: [{
      value: '衣着整洁',
      selected: false,
      title: '衣着整洁',
      ind: 0,
    }, {
      value: '准时送达',
      selected: false,
      title: '准时送达',
      ind: 1,
    }, {
      value: '餐品完善',
      selected: false,
      title: '餐品完善',
      ind: 2,
    }, {
      value: '服务专业',
      selected: false,
      title: '服务专业',
      ind: 3,
    }, {
      value: '微笑服务',
      selected: false,
      title: '微笑服务',
      ind: 4,
    }, {
      value: '穿着专业',
      selected: false,
      title: '穿着专业',
      ind: 5,
    }, {
      value: '文字评价',
      selected: false,
      title: '文字评价',
      ind: 6,
    }],
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
          tags+=detailValue[i];
          tags+="&";
        }
        console.log('所有选中的值为：', tags);

        console.log("输出调试：");
        console.log(this.data.title);
        console.log(this.data.postDetail);
        console.log(this.data.requestNum);
        console.log(this.data.ddl);

        wx.request({
          url: 'https://group.tttaaabbbccc.club/c/post/',
          data: {
            title: this.data.title, //标题  : 20字符之内 （可以根据前端需求调整）
            postDetail: this.data.postDetail,//内容 : text类型，无字数限制
            requestNum: this.data.requestNum, //所需人数 : >0
            ddl: this.data.ddl,
            labels: tags,
            userimg: app.globalData.userInfo.avatarUrl,
            username: app.globalData.userInfo.nickName,
          },
          method: "POST",
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": tk
          },
          success(res) {
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
              for (var i = 0, h = this.data.tempFilePaths.length; i < h; i++) {
                //上传文件
                  wx.uploadFile({
                    url: 'https://group.tttaaabbbccc.club/c/upLoadImg/' + res.data["postID"],
                    filePath: tempFilePaths[i],
                    name: res.data["postID"],
                    header: {
                      "Content-Type": "multipart/form-data",
                      "Authorization": tk
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
                  });
              }
              $Toast({
                content: '新建发布成功！',
                type: 'success'
              })
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