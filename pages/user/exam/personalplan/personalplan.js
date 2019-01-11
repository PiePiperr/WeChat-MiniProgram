let util = require("../../../../utils/utils.js");
Page({
  data: {
    Gradelist: [{
      name: '大一'
    }, {
      name: '大二'
    }, {
      name: '大三'
    }, {
      name: '大四'
    }, {
      name: '研一'
    }, {
      name: '研二'
    }, {
      name: '研三'
    }],
    IndustryList: [{
      id: 1,
      name: '医疗健康',
      check: ''
    }, {
      id: 2,
      name: '工具软件',
      check: ''
    }, {
      id: 3,
      name: '企业服务',
      check: ''
    }, {
      id: 4,
      name: '汽车交通',
      check: ''
    }, {
      id: 5,
      name: '硬件',
      check: ''
    }, {
      id: 6,
      name: '教育',
      check: ''
    }, {
      id: 7,
      name: '文化娱乐',
      check: ''
    }, {
      id: 8,
      name: '金融',
      check: ''
    }, {
      id: 9,
      name: '体育运动',
      check: ''
    }, {
      id: 10,
      name: '物流',
      check: ''
    }, {
      id: 11,
      name: '本地生活',
      check: ''
    }, {
      id: 12,
      name: '旅游',
      check: ''
    }, {
      id: 13,
      name: '房产服务',
      check: ''
    }, {
      id: 14,
      name: '广告营销',
      check: ''
    }, {
      id: 15,
      name: '游戏',
      check: ''
    }, {
      id: 16,
      name: '社交网络',
      check: ''
    }, {
      id: 17,
      name: '农业',
      check: ''
    }, {
      id: 18,
      name: '电子商务',
      check: ''
    }],
    CareerList: [{
        name: '市场营销'
      },
      {
        name: '产品'
      },
      {
        name: '技术'
      }
    ],
    Company: [{
        name: '正在崛起的创业公司'
      },
      {
        name: '行业巨头'
      },
      {
        name: '自己创业'
      }
    ],
    sele_Industry: false,
    Input_form: []
  },

  onLoad: function(options) {
    let that = this
    let CheckedIndustry = new Array()
    let IndustryList = that.data.IndustryList
    wx.showModal({
      title:'提示',
      content: '手打不易，记得保存草稿哦'
    })
    wx.getStorage({
      key: 'MyIndustry',
      success: function(res) {
        for (let j = 0; j < res.data.length; j++) {
          for (let i = 0; i < that.data.IndustryList.length; i++) {
            if (that.data.IndustryList[i].id == res.data[j].id) {
              that.data.IndustryList[i].check = 1
            }
          }
        }
        that.setData({
          IndustryList: that.data.IndustryList,
        })
        for (let i = 0; i < that.data.IndustryList.length; i++) {
          if (that.data.IndustryList[i].check == 1) {
            CheckedIndustry.push(IndustryList[i].name)
          }
        }
        that.setData({
          'Input_form.Industry': CheckedIndustry.toString(),
        })
      }
    })
    wx.getStorage({
      key: 'personalplan',
      success: function(res) {
        let data = res.data
        console.log(data)
        if (data.name) {
          that.setData({
            'Input_form.name': data.name
          })
        }
        if (data.university) {
          that.setData({
            'Input_form.university': data.university
          })
        }
        if (data.email) {
          that.setData({
            'Input_form.email': data.email
          })
        }
        if (data.theory) {
          that.setData({
            'Input_form.theory': data.theory
          })
        }
        if (data.ideal_Company) {
          that.setData({
            'Input_form.ideal_Company': data.ideal_Company
          })
        }
        if (data.Thought) {
          that.setData({
            'Input_form.Thought': data.Thought
          })
        }
        if (data.preparation) {
          that.setData({
            'Input_form.preparation': data.preparation
          })
        }
        if (data.opportunity) {
          that.setData({
            'Input_form.opportunity': data.opportunity
          })
        }
        if (data.experience) {
          that.setData({
            'Input_form.experience': data.experience
          })
        }
        if (data.life_Plan) {
          that.setData({
            'Input_form.life_Plan': data.life_Plan
          })
        }
      }
    })
  },

  formSubmit: function(e) {
    console.log(e)
    let that = this
    let form = that.data.Input_form
    let timestamp = Date.parse(new Date()) / 1000
    wx.setStorage({
      key: 'personalplan',
      data: form
    })
    let CheckedIndustry = new Array()
    for (let i = 0; i < that.data.IndustryList.length; i++) {
      if (that.data.IndustryList[i].check == 1) {
        CheckedIndustry.push({
          id: that.data.IndustryList[i].id,
          name: that.data.IndustryList[i].name
        })
      }
    }
    wx.setStorage({
      key: 'MyIndustry',
      data: CheckedIndustry
    })
    console.log(form)
    if (!form.name || !form.university || !form.email || !form.grade || !form.Industry || !form.Position || !form.theory || !form.ideal_Company_Type || !form.ideal_Company || !form.Thought || !form.preparation || !form.opportunity || !form.experience || !form.life_Plan) {
      wx.showModal({
        title: '提示',
        content: '请填写完全部内容后再提交',
        showCancel: false,
        confirmText: "好的"
      })
    } else {
      wx.request({
        url: 'https://wxapp.proflu.cn/vipSystem/wxapp/exam/examOne',
        data: {
          uid: wx.getStorageSync('uid'),
          submissionTime: util.js_date_time(timestamp),
          name: form.name,
          university: form.university,
          email: form.email,
          grade: form.grade,
          ideal_Industry: form.Industry,
          ideal_Position: form.Position,
          theory: form.theory,
          ideal_Company_Type: form.ideal_Company_Type,
          ideal_Company: form.ideal_Company,
          reason_Or_Thought: form.Thought,
          preparation: form.preparation,
          opportunity: form.opportunity,
          experience: form.experience,
          life_Plan: form.life_Plan
        },
        success: function(e) {
          console.log(e)
          if (e.data.code == 1) {
            wx.setStorage({
              key: 'user_level',
              data: '1',
            })
            wx.showModal({
              title: '上传成功',
              content: '恭喜你进入下一阶段，个人培养方案可重复修改',
              success: function(res) {
                wx.navigateBack({})
              }
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'loading',
              duration: 2000
            })
          }
        }
      })
    }
  },

  save: function(e) {
    let that = this
    let CheckedIndustry = new Array()
    wx.setStorage({
      key: 'personalplan',
      data: that.data.Input_form
    })
    for (let i = 0; i < this.data.IndustryList.length; i++) {
      if (this.data.IndustryList[i].check == 1) {
        CheckedIndustry.push({
          id: this.data.IndustryList[i].id,
          name: this.data.IndustryList[i].name
        })
      }
    }
    wx.setStorage({
      key: 'MyIndustry',
      data: CheckedIndustry
    })
    wx.showToast({
      title: '保存成功',
      icon: "success"
    })
  },

  Input_name: function(e) {
    this.setData({
      'Input_form.name': e.detail.value,
    })
  },

  Input_university: function(e) {
    this.setData({
      'Input_form.university': e.detail.value,
    })
  },

  Input_email: function(e) {
    this.setData({
      'Input_form.email': e.detail.value,
    })
  },

  myGrade: function(e) {
    this.setData({
      'Input_form.grade': e.detail.value,
    })
  },

  sele_Industry: function(e) {
    this.setData({
      sele_Industry: !this.data.sele_Industry
    })
  },

  myIndustry: function(e) {
    let that = this
    let a = 'IndustryList[' + e.currentTarget.dataset.index + '].check'
    let b = e.currentTarget.dataset.data.check == 0 ? 1 : 0;
    let CheckedIndustry = new Array()
    let IndustryList = this.data.IndustryList
    that.setData({
      [a]: b
    })
    for (let i = 0; i < this.data.IndustryList.length; i++) {
      if (this.data.IndustryList[i].check == 1) {
        CheckedIndustry.push(IndustryList[i].name)
        this.setData({
          'Input_form.Industry': CheckedIndustry.toString()
        })
      }
    }
  },

  myCareer: function(e) {
    this.setData({
      'Input_form.Position': e.detail.value,
    })
  },

  Input_theory: function(e) {
    this.setData({
      'Input_form.theory': e.detail.value,
    })
  },

  ideal_Company_Type: function(e) {
    this.setData({
      'Input_form.ideal_Company_Type': e.detail.value,
    })
  },

  Input_ideal_Company: function(e) {
    this.setData({
      'Input_form.ideal_Company': e.detail.value,
    })
  },

  Input_Thought: function(e) {
    this.setData({
      'Input_form.Thought': e.detail.value,
    })
  },

  Input_preparation: function(e) {
    this.setData({
      'Input_form.preparation': e.detail.value,
    })
  },

  Input_opportunity: function(e) {
    this.setData({
      'Input_form.opportunity': e.detail.value,
    })
  },

  Input_experience: function(e) {
    this.setData({
      'Input_form.experience': e.detail.value,
    })
  },

  Input_life_Plan: function(e) {
    this.setData({
      'Input_form.life_Plan': e.detail.value,
    })
  }
})