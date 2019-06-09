// pages/Invation/Invation.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    visible:false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  changeShow:function(e)
  {
    var i = e.currentTarget.dataset.index;

    let string = "f_posts[" + i + "].isShow";
    this.setData({
     [string]:!this.data.f_posts[i].isShow
    })
    console.log(this.data.f_posts[i].isShow)
  },
  cancelAccept: function (e) {
    console.log("取消")
    if (e.detail.index == 0) {
      this.setData({
        visible: false
      })
    }
    else {
      this.setData({
        visible: false
      })
      this.accept()
    }
  },
  isAccept:function(e)
  {
    var i = e.currentTarget.dataset.index;
    console.log(i,this.data.f_posts[i])
    if(this.data.myId != this.data.f_posts[i].team_id)
    {
      this.setData({
        visible: true,
        inviteId:this.data.f_posts[i].id
      });
    }
    else
    {
      $Message({
        content: '您已加入该队伍',
        type: 'error'
      });
    }
  },
  accept:function()
  {
    
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      return;
    }
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });
    console.log(this.data.inviteId)
    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/accept/' + this.data.inviteId+'/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        if(res.data.ret)
        {
          $Message({
            content: '加入成功',
            type: 'success'
          });
        }
        else
        {
          if(res.data.error_code == 2)
          {
            $Message({
              content: '队伍已满',
              type: 'error'
            });
          }
          else if(res.data.error_code == 3)
          {
            $Message({
              content: '邀请信息缺失',
              type: 'error'
            });
          }
          else if(res.data.error_code == 4)
          {
            $Message({
              content: '本用户已有队友且本人为队长，不能退队',
              type: 'error'
            });
            
          }
          else if(res.data.error_code == 5)
          {
            $Message({
              content: '登陆状态已失效',
              type: 'error'
            });
          }
          
        }
        that.onLoad()

      },
      fail(res) {
        $Toast.hide();
      }
    })


  },
  refuse:function(e)
  {
    var i = e.currentTarget.dataset.index;
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      return;
    }
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });
    console.log(this.data.inviteId)
    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/refuse/' + this.data.f_posts[i].id + '/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        if (res.data.ret) {
          $Message({
            content: '已拒绝',
            type: 'success'
          });
        }
        else {
          if (res.data.error_code == 3) {
            $Message({
              content: '邀请信息缺失',
              type: 'error'
            });
          }
          else if (res.data.error_code == 5) {
            $Message({
              content: '登陆状态已失效',
              type: 'error'
            });
          }

        }
        that.onLoad()

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
    intr.fillText('收到邀请', 15, 25)


    intr.draw()

    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;
    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {

      return;
    }
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    });

    wx.request({
      url: 'https://group.tttaaabbbccc.club/mcm/invitations/received//',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        that.setData({
          f_posts: res.data.slice(1)
        });
        that.setData(
          {
            myId:res.data[0].team_id
          }
        )
        console.log('dasdas',that.data.f_posts)

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