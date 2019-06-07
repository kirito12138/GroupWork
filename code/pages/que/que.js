// pages/five.js
const { $Toast } = require('../../vant-weapp/dist/base/index');
const { $Message } = require('../../vant-weapp/dist/base/index');
var app = getApp() // 获得全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:["111","222"],
    sex: "",
    degree: "",
    phone: "",
    cezhong: "",
    flag1: 0,
    flag2: 0,
    flag3: 0,
    flag4: 0,
    f0: false,
    f1: false,
    f2: false,
    f3: false,
    f4: false,
    f5: false,
    f6: false,
    f7: false,
    f8: false,
    f9: false,
    f10: false,

    n0: "",
    n1: "",
    n2: "",
    n3: "",
    n4: "",
    n5: "",
    n6: "",
    n7: "",
    n8: "",
    n9: "",
    n10: "",

    
    grade1: 0,
    grade2: 0,
    grade3: 0,
    grade4: 0,
    score: 0,



    checkboxItems0: [
      { name: '国一(研究生)', value: '95', checked: false },
    ],

    checkboxItems1: [
      { name: '国二（研究生）', value: '85', checked: false },
    ],
    checkboxItems2: [
      { name: '国三（研究生）', value: '80', checked: false },
    ],
    checkboxItems3: [
      { name: '成功参赛（研究生）', value: '70', checked: false },
    ],
    checkboxItems4: [
      { name: '国一（本科）', value: '90', checked: false },
    ],
    checkboxItems5: [
      { name: '国二（本科）', value: '80', checked: false },
    ],
    checkboxItems6: [
      { name: '省一（本科）', value: '75', checked: false },
    ],
    checkboxItems7: [
      { name: '省二（本科）', value: '70', checked: false },
    ],
    checkboxItems8: [
      { name: '省三（本科）', value: '65', checked: false },
    ],
    checkboxItems9: [
      { name: '成功参赛（本科）', value: '60', checked: false },
    ],
    checkboxItems10: [
      { name: '无参赛经历', value: '0', checked: false },
    ],

    radioItems20: [
      { name: '一等奖', value: '95' },
      { name: '二等奖', value: '85' },
      { name: '三等奖', value: '80' },
      { name: '成功参与', value: '70' },
    ],
    radioItems21: [
      { name: '一等奖', value: '95' },
      { name: '二等奖', value: '85' },
      { name: '三等奖', value: '80' },
      { name: '成功参与', value: '70' },
    ],
    radioItems22: [
      { name: '建模', value: '95' },
      { name: '编程', value: '85' },
      { name: '论文写作', value: '80' },
    ],


    radioItems1: [
      { name: '可以快速拥有处理该问题的大概思路和方法并建模', value: '90' },
      { name: '通过针对性的查阅参考资料快速提炼出适合本题的模型', value: '80' },
      { name: '通过参考大量文献总能找到适合本题的模型并借鉴', value: '70' },
      { name: '可能一时找不到解决问题的思路', value: '60' },
      { name: '可能很难看懂他人的模型', value: '65' },
      { name: '不准备负责这块且零基础', value: '10' },
    ],

    radioItems2: [
      { name: '一定能做出来，总会有突破口', value: '90' },
      { name: '一定能做出来，但有好坏之分而已', value: '85' },
      { name: '有可能做不出来，但不会轻易放弃', value: '70' },
      { name: '很有可能做不出来', value: '60' },
      { name: '不会负责这块', value: '10' },
    ],

    radioItems3: [
      { name: '可以很轻松的将其抽象为数学公式或数学语言', value: '90' },
      { name: '通过借鉴相关文献可以将其整理为为数学公式或数学语言', value: '80' },
      { name: '可能只能用文字叙述出来，不知道怎么用数学语言表达', value: '65' },
      { name: '可能很难听懂', value: '20' },
    ],

    radioItems4: [
      { name: '可以用LaTeX进行排版', value: '95' },
      { name: '充分掌握Word等办公软件里的引用、页眉页脚设置、格式刷等功能', value: '90' },
      { name: '可以熟悉地用Word等办公软件对论文进行针对性排版', value: '80' },
      { name: '基本了解Word等办公软件的相关功能，通过参考资料可以完成对论文的一般性排版', value: '75' },
      { name: '目前对Word等办公软件不是很熟悉，不过后续会学习', value: '60' },
      { name: '不准备负责这块，也不是很熟悉', value: '20' },
    ],

    radioItems5: [
      { name: '会熟练地用其解决一般性问题', value: '90' },
      { name: '通过参考资料可以很快解决一般性问题', value: '85' },
      { name: '通过参考资料可以勉强解决一般性问题', value: '80' },
      { name: '没接触过，但有C,C++,Java等相关语言编程基础，正在学习或即将学习', value: '75' },
      { name: '无基础，但正在学习或即将学习', value: '70' },
      { name: '不准备负责这块，零基础', value: '10' },
    ],

    radioItems6: [
      { name: '静下心来尽全力找到原因，相信自己一定能成功解决', value: '90' },
      { name: '适可而止，适当放宽或者限制条件绕过去', value: '85' },
      { name: '坚持改下去，但心里没底', value: '75' },
      { name: '换种方法重新开始写', value: '80' },
      { name: '改到没信心，最后放弃', value: '60' },
      { name: '不准备负责这块且零基础', value: '10' },
    ],

    radioItems7: [
      { name: '害怕但表面不露声色', value: '40' },
      { name: '不承认而且辩驳，但内心其实已经明白', value: '30' },
      { name: '主动承认自己的错误并改正', value: '90' },
      { name: '难为情，希望逃避别人的批评', value: '60' },
    ],

    radioItems8: [
      { name: '不必有太大压力，可以让我做我熟悉的工作就很不错', value: '60' },
      { name: '应该以最快的速度完成，且争取去完成更多的任务', value: '80' },
      { name: '要么不做，要做就做到最好', value: '90' },
      { name: '如果能将好玩融合其中那就太棒了，不过如果不喜欢的工作实在没劲', value: '70' },
    ],

    radioItems9: [
      { name: '直接放弃', value: '10' },
      { name: '以最快的速度，花费尽量少的精力调查一下可能性，实在困难就换个方法再尝试', value: '90' },
      { name: '花费大量时间去做，做不出来再放弃', value: '80' },
      { name: '就是做不出来也死磕到底不放弃', value: '70' },
    ],

    radioItems10: [
      { name: '完全不符合', value: '90' },
      { name: '部分符合', value: '75' },
      { name: '完全符合', value: '50' },
    ],

    radioItems11: [
      { name: '完全符合', value: '90' },
      { name: '比较符合', value: '80' },
      { name: '一般', value: '70' },
      { name: '不太符合', value: '40' },
      { name: '完全不符合', value: '20' },
    ],

    radioItems12: [
      { name: '没有控制欲，但有感染带动他人的欲望', value: '85' },
      { name: '用规则来保持我对自己的控制和对他人的要求', value: '90' },
      { name: '内心有控制欲和希望别人服从', value: '70' },
      { name: '没想过影响别人，也不愿别人来管我', value: '75' },
    ],

    radioItems13: [
      { name: '未组队', value: '0' },
      { name: '已组队', value: '1' },
    ],

  },

  
  radioChange20: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems20 = this.data.radioItems20;
    for (var i = 0, len = radioItems20.length; i < len; ++i) {
      radioItems20[i].checked = radioItems20[i].value == e.detail.value;
    }

    this.setData({
      radioItems20: radioItems20
    });
  },
  radioChange21: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems21 = this.data.radioItems21;
    for (var i = 0, len = radioItems21.length; i < len; ++i) {
      radioItems21[i].checked = radioItems21[i].value == e.detail.value;
    }

    this.setData({
      radioItems21: radioItems21
    });
  },

  radioChange22: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems22 = this.data.radioItems22;
    for (var i = 0, len = radioItems22.length; i < len; ++i) {
      radioItems22[i].checked = radioItems22[i].value == e.detail.value;
    }

    this.setData({
      radioItems22: radioItems22
    });
  },

  
  radioChange1: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems1 = this.data.radioItems1;
    for (var i = 0, len = radioItems1.length; i < len; ++i) {
      radioItems1[i].checked = radioItems1[i].value == e.detail.value;
    }

    this.setData({
      radioItems1: radioItems1
    });
  },
  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems2 = this.data.radioItems2;
    for (var i = 0, len = radioItems2.length; i < len; ++i) {
      radioItems2[i].checked = radioItems2[i].value == e.detail.value;
    }

    this.setData({
      radioItems2: radioItems2
    });
  },
  radioChange3: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems3 = this.data.radioItems3;
    for (var i = 0, len = radioItems3.length; i < len; ++i) {
      radioItems3[i].checked = radioItems3[i].value == e.detail.value;
    }

    this.setData({
      radioItems3: radioItems3
    });
  },
  radioChange4: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems4 = this.data.radioItems4;
    for (var i = 0, len = radioItems4.length; i < len; ++i) {
      radioItems4[i].checked = radioItems4[i].value == e.detail.value;
    }

    this.setData({
      radioItems4: radioItems4
    });
  },
  radioChange5: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems5 = this.data.radioItems5;
    for (var i = 0, len = radioItems5.length; i < len; ++i) {
      radioItems5[i].checked = radioItems5[i].value == e.detail.value;
    }

    this.setData({
      radioItems5: radioItems5
    });
  },
  radioChange6: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems6 = this.data.radioItems6;
    for (var i = 0, len = radioItems6.length; i < len; ++i) {
      radioItems6[i].checked = radioItems6[i].value == e.detail.value;
    }

    this.setData({
      radioItems6: radioItems6
    });
  },
  radioChange7: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems7 = this.data.radioItems7;
    for (var i = 0, len = radioItems7.length; i < len; ++i) {
      radioItems7[i].checked = radioItems7[i].value == e.detail.value;
    }

    this.setData({
      radioItems7: radioItems7
    });
  },
  radioChange8: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems8 = this.data.radioItems8;
    for (var i = 0, len = radioItems8.length; i < len; ++i) {
      radioItems8[i].checked = radioItems8[i].value == e.detail.value;
    }

    this.setData({
      radioItems8: radioItems8
    });
  },
  radioChange9: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems9 = this.data.radioItems9;
    for (var i = 0, len = radioItems9.length; i < len; ++i) {
      radioItems9[i].checked = radioItems9[i].value == e.detail.value;
    }

    this.setData({
      radioItems9: radioItems9
    });
  },
  radioChange10: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems10 = this.data.radioItems10;
    for (var i = 0, len = radioItems10.length; i < len; ++i) {
      radioItems10[i].checked = radioItems10[i].value == e.detail.value;
    }

    this.setData({
      radioItems10: radioItems10
    });
  },
  radioChange11: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems11 = this.data.radioItems11;
    for (var i = 0, len = radioItems11.length; i < len; ++i) {
      radioItems11[i].checked = radioItems11[i].value == e.detail.value;
    }

    this.setData({
      radioItems11: radioItems11
    });
  },
  radioChange12: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems12 = this.data.radioItems12;
    for (var i = 0, len = radioItems12.length; i < len; ++i) {
      radioItems12[i].checked = radioItems12[i].value == e.detail.value;
    }

    this.setData({
      radioItems12: radioItems12
    });
  },
  radioChange13: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems13 = this.data.radioItems13;
    for (var i = 0, len = radioItems13.length; i < len; ++i) {
      radioItems13[i].checked = radioItems13[i].value == e.detail.value;
    }

    this.setData({
      radioItems13: radioItems13
    });
  },


  checkboxChange0: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.checkboxItems0, values = e.detail.value;
    var flag = this.data.f0;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems0: checkboxItems,
      f0: flag,
      
    });
  },


  checkboxChange1: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems1, values = e.detail.value;
    var flag = this.data.f1;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems1: checkboxItems,
      f1: flag
    });
  },


  checkboxChange2: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems2, values = e.detail.value;
    var flag = this.data.f2;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems2: checkboxItems,
      f2: flag
    });
  },


  checkboxChange3: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems3, values = e.detail.value;
    var flag = this.data.f3;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems3: checkboxItems,
      f3: flag
    });
  },


  checkboxChange4: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems4, values = e.detail.value;
    var flag = this.data.f4;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems4: checkboxItems,
      f4: flag
    });
  },


  checkboxChange5: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems5, values = e.detail.value;
    var flag = this.data.f5;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems5: checkboxItems,
      f5: flag
    });
  },


  checkboxChange6: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems6, values = e.detail.value;
    var flag = this.data.f6;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems6: checkboxItems,
      f6: flag
    });
  },


  checkboxChange7: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems7, values = e.detail.value;
    var flag = this.data.f7;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems7: checkboxItems,
      f7: flag
    });
  },


  checkboxChange8: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems8, values = e.detail.value;
    var flag = this.data.f8;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems8: checkboxItems,
      f8: flag
    });
  },


  checkboxChange9: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems9, values = e.detail.value;
    var flag = this.data.f9;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems9: checkboxItems,
      f9: flag
    });
  },


  checkboxChange10: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems10, values = e.detail.value;
    var flag = this.data.f10;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;
      flag = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          flag = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems10: checkboxItems,
      f10: flag
    });
  },

  input_sex: function (e) {
    this.setData({
      sex: e.detail.detail.value,
    });
  },
  input_degree: function (e) {
    this.setData({
      degree: e.detail.detail.value,
    });
  },
  input_phone: function (e) {
    this.setData({
      phone: e.detail.detail.value,
    });
    console.log(this.data.phone)
  },
  input_n0: function (e) {
    this.setData({
      n0: e.detail.detail.value,
    });
    console.log(this.data.n0)
  },
  input_n1: function (e) {
    this.setData({
      n1: e.detail.detail.value,
    });
    console.log(this.data.n1)
  },
  input_n2: function (e) {
    this.setData({
      n2: e.detail.detail.value,
    });
    console.log(this.data.n2)
  },
  input_n3: function (e) {
    this.setData({
      n3: e.detail.detail.value,
    });
    console.log(this.data.n3)
  },
  input_n4: function (e) {
    this.setData({
      n4: e.detail.detail.value,
    });
    console.log(this.data.n4)
  },
  input_n5: function (e) {
    this.setData({
      n5: e.detail.detail.value,
    });
    console.log(this.data.n5)
  },
  input_n6: function (e) {
    this.setData({
      n6: e.detail.detail.value,
    });
    console.log(this.data.n6)
  },
  input_n7: function (e) {
    this.setData({
      n7: e.detail.detail.value,
    });
    console.log(this.data.n7)
  },
  input_n8: function (e) {
    this.setData({
      n8: e.detail.detail.value,
    });
    console.log(this.data.n8)
  },
  input_n9: function (e) {
    this.setData({
      n9: e.detail.detail.value,
    });
    console.log(this.data.n9)
  },
  input_n10: function (e) {
    this.setData({
      n10: e.detail.detail.value,
    });
    console.log(this.data.n10)
  },
  input_cezhong: function (e) {
    this.setData({
      cezhong: e.detail.detail.value,
    });
    console.log(this.data.cezhong)
  },


  get_grade1: function () {
    var c0 = [this.data.checkboxItems0,
    this.data.checkboxItems1,
    this.data.checkboxItems2,
    this.data.checkboxItems3,
    this.data.checkboxItems4, 
    this.data.checkboxItems5,
    this.data.checkboxItems6,
    this.data.checkboxItems7,
    this.data.checkboxItems8,
    this.data.checkboxItems9,
    this.data.checkboxItems10];
    
    

    var d0 = [parseInt(this.data.n0),
      parseInt(this.data.n1),
      parseInt(this.data.n2),
      parseInt(this.data.n3),
      parseInt(this.data.n4),
      parseInt(this.data.n5),
      parseInt(this.data.n6),
      parseInt(this.data.n7),
      parseInt(this.data.n8),
      parseInt(this.data.n9),
      parseInt(this.data.n10)];


      for(var i = 0;i <= 10;i++){
        if (!(d0[i] >= 0 && d0[i]<=100)) d0[i] = 33;
      }

    
    var g10 = Number(c0[0][0].value)+Number(d0[0]);
    console.log(g10);
    var flag0 = 0;
    var i = 1;
    if (c0[0][0].checked == true) flag0 = 1;
    console.log(c0[0][0].checked);
    for(i = 1; i <= 10;i++){
      if (c0[i][0].value + d0[i] > g10) g10 = Number(c0[i][0].value) + Number(d0[i]);
      if(c0[i][0].checked == true) flag0 = 1;
    }
    this.setData({
      grade1: g10,
      flag1: flag0,
    });
  },

  get_grade2: function () {
    var g1 = this.data.radioItems20;
    var g2 = this.data.radioItems21;
    var pick1 = 8;
    var flag = 0;
    var g3 = 0;
    var g4 = 0;
    for (var i = 0; i < 4; i++) {
      if(g1[i].checked == true) pick1 = i;
    }
    if(pick1 == 8) flag = 1,pick1 = 0;
    var pick2 = 8;
    for (var i = 0; i < 4; i++) {
      if (g2[i].checked == true) pick2 = i;
    }
    if (pick2 == 8) flag = 1, pick2 = 0;

    g3 = (Number(g1[pick1].value) + Number(g2[pick2].value))/2;
    console.log(g3);
    this.setData({
      grade2: g3,
      flag2: flag,
    });
  },

  get_grade3: function () {
    var g1 = this.data.radioItems1;
    var g2 = this.data.radioItems2;
    var g3 = this.data.radioItems3;
    var g4 = this.data.radioItems4;
    var g5 = this.data.radioItems5;
    var g6 = this.data.radioItems6;
    var flag = 0;
    var pick1 = 8;
    for (var i = 0; i < 6; i++) {
      if (g1[i].checked == true) pick1 = i;
    }
    if (pick1 == 8) flag = 1, pick1 = 0;
    var pick2 = 8;
    for (var i = 0; i < 5; i++) {
      if (g2[i].checked == true) pick2 = i;
    }
    if (pick2 == 8) flag = 1, pick2 = 0;
    var pick3 = 8;
    for (var i = 0; i < 4; i++) {
      if (g3[i].checked == true) pick3 = i;
    }
    if (pick3 == 8) flag = 1, pick3 = 0;
    var pick4 = 8;
    for (var i = 0; i < 6; i++) {
      if (g4[i].checked == true) pick4 = i;
    }
    if (pick4 == 8) flag = 1, pick4 = 0;
    var pick5 = 8;
    for (var i = 0; i < 6; i++) {
      if (g5[i].checked == true) pick5 = i;
    }
    if (pick5 == 8) flag = 1, pick5 = 0;
    var pick6 = 8;
    for (var i = 0; i < 6; i++) {
      if (g6[i].checked == true) pick6 = i;
    }
    if (pick6 == 8) flag = 1, pick6 = 0;
    console.log(g1[pick1].value);
    var g10 = 0.5396*(Number(g1[pick1].value)+Number(g2[pick2].value))/2;
    var g11 = 0.29696 * (Number(g3[pick3].value) + Number(g4[pick4].value)) / 2;
    var g12 = 0.163424 * (Number(g5[pick5].value) + Number(g6[pick6].value)) / 2;
    g10 = Number(g10)+Number(g11)+Number(g12);
    console.log(g10);
    this.setData({
      grade3: g10,
      flag3: flag,
    });
  },

  get_grade4: function () {
    var g1 = this.data.radioItems7;
    var g2 = this.data.radioItems8;
    var g3 = this.data.radioItems9;
    var g4 = this.data.radioItems10;
    var g5 = this.data.radioItems11;
    var g6 = this.data.radioItems12;
    var flag = 0;
    var pick1 = 8;
    for (var i = 0; i < 4; i++) {
      if (g1[i].checked == true) pick1 = i;
    }
    if (pick1 == 8) flag = 1, pick1 = 0;
    var pick2 = 8;
    for (var i = 0; i < 4; i++) {
      if (g2[i].checked == true) pick2 = i;
    }
    if (pick2 == 8) flag = 1, pick2 = 0;
    var pick3 = 8;
    for (var i = 0; i < 4; i++) {
      if (g3[i].checked == true) pick3 = i;
    }
    if (pick3 == 8) flag = 1, pick3 = 0;
    var pick4 = 8;
    for (var i = 0; i < 3; i++) {
      if (g4[i].checked == true) pick4 = i;
    }
    if (pick4 == 8) flag = 1, pick4 = 0;
    var pick5 = 8;
    for (var i = 0; i < 5; i++) {
      if (g5[i].checked == true) pick5 = i;
    }
    if (pick5 == 8) flag = 1, pick5 = 0;
    var pick6 = 8;
    for (var i = 0; i < 4; i++) {
      if (g6[i].checked == true) pick6 = i;
    }
    if (pick6 == 8) flag = 1, pick6 = 0;
    var g20 = (Number(g1[pick1].value) + Number(g2[pick2].value) + Number(g3[pick3].value) + Number(g4[pick4].value) + Number(g5[pick5].value) + Number(g6[pick6].value)) / 6;
    this.setData({
      grade4: g20,
      flag4:flag,
    });
  },

  get_score: function(){
    var g1 = this.data.grade1;
    var g2 = this.data.grade2;
    var g3 = this.data.grade3;
    var g4 = this.data.grade4;
    var g5 = Number(0.3916*g1)+Number(0.1929*g2)+Number(0.2929*g3)+Number(0.1226*g4);
    g5 = parseInt(g5);
    this.setData({
      score: g5,
    });
  },

  click_submit: function(){
     


    this.get_grade1();
    this.get_grade2();
    this.get_grade3();
    this.get_grade4();
    this.get_score();
    console.log(this.data.score);
    var that = this;
    const _jwt = wx.getStorageSync('jwt');
    var tk;

    if (_jwt) {
      tk = JSON.parse(_jwt);
    }
    else {
      console.log("no token");
      return;
    }


    if (this.data.n0 != "" && !(/^[0-9]+$/.test(this.data.n0))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n1 != "" && !(/^[0-9]+$/.test(this.data.n1))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n2 != "" && !(/^[0-9]+$/.test(this.data.n2))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n3 != "" && !(/^[0-9]+$/.test(this.data.n3))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n4 != "" && !(/^[0-9]+$/.test(this.data.n4))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n5 != "" && !(/^[0-9]+$/.test(this.data.n5))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }

    if (this.data.n6 != "" && !(/^[0-9]+$/.test(this.data.n6))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n7 != "" && !(/^[0-9]+$/.test(this.data.n7))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n8 != "" && !(/^[0-9]+$/.test(this.data.n8))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n9 != "" && !(/^[0-9]+$/.test(this.data.n9))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }
    if (this.data.n10 != "" && !(/^[0-9]+$/.test(this.data.n10))) {
      $Message({
        content: "分数均为数字",
        type: 'error'
      });
      console.log("1")
      return;
    }

    if (this.data.flag1 == 0 || this.data.flag2 == 1 || this.data.flag3 == 1 || this.data.flag4 == 1) {
      $Message({
        content: "未完成所有选项",
        type: 'error'
      });
      //console.log("1");
      console.log(this.data.flag1);
      console.log(this.data.flag2);
      console.log(this.data.flag3);
      console.log(this.data.flag4);
      return;
    }
    //console.log(this.data.grade1);
    //console.log(this.data.grade2);
    //console.log(this.data.grade3);
    //console.log(this.data.grade4);
    

    wx.request({
      url: 'https://group.tttaaabbbccc.club//mcm/score/',
      method: "POST",
      header: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': tk
      },
      data:
      {
        score: this.data.score,
      },

      success(res) {
        console.log(res);
        $Toast.hide();
        console.log(res.data)
        if (res.data.ret) {
          $Message({
            content: '提交成功',
            type: 'success'
          });
        }
        if (res.data['ret'] == false) {
          if (res.data['error_code'] == 3) {
            $Message({
              content: '没填问卷，没有分数',
              type: 'error'
            });
          }
        }
      },
      fail(res) {
        $Toast.hide();
        $Toast({
          content: '服务器连接超时',
          type: 'error',
          duration: 2,
          mask: true
        });
      }
    })

  },
    

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   
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