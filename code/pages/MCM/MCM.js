// pages/MCM/MCM.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp() // 获得全局变量
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
    p_pos: [],
    non: [],
    is_non: false
  },

  cancel_fil: function (e) {
    if (e.detail.index == 0) {
      this.gotoHome(e)
    }
    else {
      this.fil(e)
    }
  },

  gotoHome: function (e) {
    wx.reLaunch({
      url: '../home/home',
    })
    this.setData({
      visible: false
    })
  },
  fil: function (e) {
    wx.navigateTo({
      url: '../MCMResume/MCMResume',
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
    var that = this;

    var para = JSON.stringify(this.data.searchValue);

    para = encodeURIComponent(para)
    wx.navigateTo({
      url: '../serchMan/serchMan?info=' + para,
    })


    /*const _jwt = wx.getStorageSync('jwt');
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
      url: 'https://group.tttaaabbbccc.club/mcm/search/user/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:{
        name: that.data.searchValue
      },
      success(res) {
        $Toast.hide()
        console.log()
        console.log(res.data)
        if (res.ret == true) {
          
          that.setData({
            partens: res.data,
            p_pos: res.data,
          })
        }
        else {
          that.setData({
            is_fill: false
          })
        }
      },
      fail(res) {
        $Toast.hide();
      }
    })*/

  },

  choose: function (e) {
    console.log(e)
    var wid = this.data.windowWidth;
    if (e.detail.x < (wid / 2)) {
      this.upQue(e);
    }
    else if (e.detail.x >= (wid / 2)) {
      this.newone(e);
    }
  },

  newone: function (e) {
    console.log(this.data.partens)
    var rans = []
    var i = 0;
    // if(this.data.p_pos.length == 5)
    // {
    while (true) {
      if (this.data.partens.length == 0) {
        break
      }
      var k = this.data.partens.length;
      var x = Math.floor(Math.random() * (k));
      console.log("xxxx", x)
      if (!rans.includes(this.data.partens[x])) {
        console.log(this.data.partens[x])
        rans[i] = this.data.partens[x];
        i = i + 1;
      }
      if (i == 5) {
        break;
      }
      if (this.data.partens.length == i) {
        break
      }

    }

    this.setData({
      p_pos: rans,
    })

    //}


    console.log(rans)
  },

  upQue: function (e) {
    //TODO修改页面
    wx.navigateTo({
      url: '../que/que',
    })
  },

  fillSurvey: function (e) {
    this.upQue(e)
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
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        console.log("invit", res.data.ret)
        if (res.data.ret == false || res.data.ret == undefined) {
          $Message({
            content: "邀请失败",
            type: 'error'
          });
          return
        }
        else if (res.data.ret == true) {
          $Message({
            content: "邀请成功",
            type: 'success'
          });
        }



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
      url: 'https://group.tttaaabbbccc.club/mcm/match/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        console.log("match")
        console.log(res.data)
        if (res.data.ret == false) {
          if (res.data.error_code == 2) {
            that.setData({
              is_fill: false
            })
          }


        }
        else {
          var rans = []
          var i = 0;

          while (true) {
            if (res.data.length == 0) {
              that.setData({
                is_non: true
              })
              break
            }
            var k = res.data.length;
            var x = Math.floor(Math.random() * (k));
            console.log(x)
            if (!rans.includes(res.data[x])) {
              console.log(res.data[x])
              rans[i] = res.data[x];
              i = i + 1;
            }
            if (i == 5) {
              break;
            }
            if (res.data.length == i) {
              break
            }

          }
          that.setData({
            partens: res.data,
            p_pos: rans,
          })
          console.log(rans)
          console.log(that.data.p_pos)

        }
      },
      fail(res) {
        $Toast.hide();
      }
    })
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

  yaoqing: function (e) {
    console.log(e)
    var wid = this.data.windowWidth;
    if (e.detail.x < (wid / 2)) {
      this.myInvite(e);
    }
    else if (e.detail.x >= (wid / 2)) {
      this.whoInvite(e);
    }
  },

  myInvite: function (e) {
    //TODO 我邀请的
    wx.navigateTo({
      url: '../sendInvation/sendInvation',
    })

  },

  whoInvite: function (e) {
    //TODO 被我邀请
    wx.navigateTo({
      url: '../Invation/Invation',
    })

  },

  quit: function (e) {
    const _jwt = wx.getStorageSync('jwt');
    var _history = wx.getStorageSync('history');
    var tk;
    var that = this;
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
      url: 'https://group.tttaaabbbccc.club/mcm/quit/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()

        if (res.ret == false) {
          if (res.error_code == 3) {
            $Message({
              content: '队长请勿退出队伍',
              type: 'error'
            });
          }
        }
        else {

          $Message({
            content: '退出成功',
            type: 'success'
          });
        }

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
      url: 'https://group.tttaaabbbccc.club/mcm/team/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        if (res.ret == false) {
          if (res.error_code == 2) {
            that.setData({
              visible: true
            })
          }
        }
        else {
          console.log("xxxxxxxx")
          console.log(res.data)
          console.log(res)

          var noo = []

          if (res.data.length == 1) {
            noo = [{ 'name': "暂无" }, { 'name': "暂无" }]
          }
          else if (res.data.length == 2) {
            noo = [{ 'name': "暂无" }]
          }

          that.setData({
            team: res.data,
            non: noo
          })

          console.log("kkkkkk")
          console.log(that.data.team)
        }



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

    const ctx = wx.createCanvasContext('myCanvas')

    ctx.moveTo(10, 0)
    ctx.lineTo(115, 0)
    ctx.lineTo(145, 30)
    ctx.lineTo(wid, 30)
    ctx.lineTo(wid, 35)
    ctx.lineTo(0, 35)
    ctx.lineTo(0, 10)
    ctx.arc(0 + 10, 0 + 10, 10, Math.PI, Math.PI * 1.5)

    ctx.setFillStyle('#3075FF')
    ctx.fill()

    ctx.setFillStyle('white')
    ctx.setFontSize(20)
    ctx.fillText('我的队伍', 15, 25)

    ctx.draw()

    const bot = wx.createCanvasContext('bottcan')

    bot.moveTo(0, 0)
    bot.lineTo(wid / 2 - 15, 0)
    bot.lineTo(wid / 2 + 15, 35)
    bot.lineTo(10, 35)
    bot.arc(0 + 10, 35 - 10, 10, Math.PI * 0.5, Math.PI)
    bot.setFillStyle('#FF9955')
    bot.fill()
    bot.setFillStyle('#414141')
    bot.setFontSize(20)
    bot.fillText('重填问卷', 50, 25)


    bot.beginPath()
    bot.moveTo(wid / 2 - 15, 0)
    bot.lineTo(wid, 0)
    bot.lineTo(wid, 25)
    bot.arc(wid - 10, 35 - 10, 10, 0, Math.PI * 0.5)
    bot.lineTo(wid / 2 + 15, 35)
    bot.setFillStyle('#3075FF')
    bot.fill()
    bot.setFillStyle('white')
    bot.setFontSize(20)
    bot.fillText('换一批', 250, 25)

    bot.draw()

    const intr = wx.createCanvasContext('intr')
    intr.moveTo(wid - 115, 0)
    intr.lineTo(wid - 10, 0)
    intr.arc(wid - 10, 0 + 10, 10, Math.PI * 1.5, Math.PI * 2)
    intr.lineTo(wid, 35)

    intr.lineTo(0, 35)
    intr.lineTo(0, 30)
    intr.lineTo(wid - 145, 30)


    intr.setFillStyle('#3075FF')
    intr.fill()

    intr.setFillStyle('white')
    intr.setFontSize(20)
    intr.fillText('推荐队友', wid - 110, 25)

    intr.draw()

    const quit = wx.createCanvasContext('bottcan1')
    quit.moveTo(0, 0)
    quit.lineTo(wid / 2 + 15, 0)
    quit.lineTo(wid / 2 - 15, 35)
    quit.lineTo(10, 35)
    quit.arc(0 + 10, 35 - 10, 10, Math.PI * 0.5, Math.PI)
    quit.setFillStyle('#3075FF')
    quit.fill()
    quit.setFillStyle('white')
    quit.setFontSize(20)
    quit.fillText('已发邀请', 50, 25)

    //blue: 


    quit.beginPath()
    quit.moveTo(wid / 2 + 15, 0)
    quit.lineTo(wid, 0)
    quit.lineTo(wid, 25)
    quit.arc(wid - 10, 35 - 10, 10, 0, Math.PI * 0.5)
    quit.lineTo(wid / 2 - 15, 35)
    quit.setFillStyle('#FF9955')
    quit.fill()
    quit.setFillStyle('#414141')
    quit.setFontSize(20)
    quit.fillText('收到邀请', 230, 25)

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
      url: 'https://group.tttaaabbbccc.club/mcm/team/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        if (res.data.ret == false) {
          if (res.data.error_code == 2) {
            that.setData({
              visible: true
            })
          }
        }
        else {
          console.log("xxxxxxxx")
          console.log(res.data)
          console.log(res)

          var noo = []

          if (res.data.length == 1) {
            noo = [{ 'name': "暂无" }, { 'name': "暂无" }]
          }
          else if (res.data.length == 2) {
            noo = [{ 'name': "暂无" }]
          }

          that.setData({
            team: res.data,
            non: noo
          })

          console.log("kkkkkk")
          console.log(that.data.team)
        }



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
      url: 'https://group.tttaaabbbccc.club/mcm/match/',
      method: "GET",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      success(res) {
        $Toast.hide()
        console.log("match")
        console.log(res.data)
        if (res.data.ret == false) {
          if (res.data.error_code == 2) {
            that.setData({
              is_fill: false
            })
          }


        }
        else {
          var rans = []
          var i = 0;

          while (true) {
            if (res.data.length == 0) {
              that.setData({
                is_non: true
              })
              break
            }
            var k = res.data.length;
            var x = Math.floor(Math.random() * (k));
            console.log(x)
            if (!rans.includes(res.data[x])) {
              console.log(res.data[x])
              rans[i] = res.data[x];
              i = i + 1;
            }
            if (i == 5) {
              break;
            }
            if (res.data.length == i) {
              break
            }

          }
          that.setData({
            partens: res.data,
            p_pos: rans,
          })
          console.log(rans)
          console.log(that.data.p_pos)

        }
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