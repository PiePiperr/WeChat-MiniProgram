let util = require("../../../../utils/utils.js");
Page({
  data: {
    IndustryList: [{
      name: '医疗健康'
    }, {
      name: '工具软件'
    }, {
      name: '企业服务'
    }, {
      name: '汽车交通'
    }, {
      name: '硬件'
    }, {
      name: '教育'
    }, {
      name: '文化娱乐'
    }, {
      name: '金融'
    }, {
      name: '体育运动'
    }, {
      name: '物流'
    }, {
      name: '本地生活'
    }, {
      name: '旅游'
    }, {
      name: '房产服务'
    }, {
      name: '广告营销'
    }, {
      name: '游戏'
    }, {
      name: '社交网络'
    }, {
      name: '农业'
    }, {
      name: '电子商务'
    }],
  },

  onLoad() {
    let that = this
    wx.getStorage({
      key: 'IndustryReport',
      success: function(res) {
        let data = res.data
        console.log(data)
        if (data.subIndustry) {
          that.setData({
            'Input_form.subIndustry': data.subIndustry
          })
        }
        if (data.reasonForIndustry) {
          that.setData({
            'Input_form.reasonForIndustry': data.reasonForIndustry
          })
        }
        if (data.ways) {
          that.setData({
            'Input_form.ways': data.ways
          })
        }
        if (data.excellentCompany) {
          that.setData({
            'Input_form.excellentCompany': data.excellentCompany
          })
        }
        if (data.chollima) {
          that.setData({
            'Input_form.chollima': data.chollima
          })
        }
        if (data.reasonForCompany) {
          that.setData({
            'Input_form.reasonForCompany': data.reasonForCompany
          })
        }
        if (data.company) {
          that.setData({
            'Input_form.company': data.company
          })
        }
        if (data.companyBaseInfo) {
          that.setData({
            'Input_form.companyBaseInfo': data.companyBaseInfo
          })
        }
        if (data.founderInfo) {
          that.setData({
            'Input_form.founderInfo': data.founderInfo
          })
        }
        if (data.marketSize) {
          that.setData({
            'Input_form.marketSize': data.marketSize
          })
        }
        if (data.financingInfo) {
          that.setData({
            'Input_form.financingInfo': data.financingInfo
          })
        }
        if (data.competitor) {
          that.setData({
            'Input_form.competitor': data.competitor
          })
        }
        if (data.whyJoin) {
          that.setData({
            'Input_form.whyJoin': data.whyJoin
          })
        }
        if (data.username) {
          that.setData({
            'Input_form.username': data.username
          })
        } else {
          that.setData({
            'Input_form.username': wx.getStorageSync('personalplan').name
          })
        }
        if (data.email) {
          that.setData({
            'Input_form.email': data.email
          })
        } else {
          that.setData({
            'Input_form.email': wx.getStorageSync('personalplan').email
          })
        }
      }
    })
  },

  save: function(e) {
    let that = this
    console.log(that.data.Input_form)
    wx.setStorage({
      key: 'IndustryReport',
      data: that.data.Input_form
    })
    wx.showToast({
      title: '保存成功',
      icon: "success"
    })
  },

  formSubmit: function(e) {
    let that = this
    let form = that.data.Input_form
    let timestamp = Date.parse(new Date()) / 1000
    wx.setStorage({
      key: 'IndustryReport',
      data: form
    })
    console.log(form)
    if (!form.industry || !form.subIndustry || !form.reasonForIndustry || !form.ways || !form.excellentCompany || !form.chollima || !form.reasonForCompany || !form.company || !form.companyBaseInfo || !form.founderInfo || !form.marketSize || !form.financingInfo || !form.competitor || !form.whyJoin || !form.username || !form.email) {
      wx.showModal({
        title: '提示',
        content: '请填写完全部内容后再提交',
        showCancel: false,
        confirmText: "好的"
      })
    } else {
      wx.request({
        url: 'https://wxapp.proflu.cn/vipSystem/wxapp/exam/industryReport',
        data: {
          uid: wx.getStorageSync('uid'),
          createtime: util.js_date_time(timestamp),
          industry: form.industry.toString(),
          subIndustry: form.subIndustry,
          reasonForIndustry: form.reasonForIndustry,
          ways: form.ways,
          excellentCompany: form.excellentCompany,
          swiftHorse: form.chollima,
          reasonForCompany: form.reasonForCompany,
          company: form.company,
          companyBaseInfo: form.companyBaseInfo,
          founderInfo: form.founderInfo,
          marketSize: form.marketSize,
          financingInfo: form.financingInfo,
          competitor: form.competitor,
          whyJoin: form.whyJoin,
          email: form.email,
          username:form.username
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
              content: '恭喜你进入下一阶段，分析报告可重复修改',
              success: function(res) {
                wx.navigateBack({})
              }
            })
          } else {
            wx.showToast({
              title: '上传失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },

  industry: function(e) {
    this.setData({
      'Input_form.industry': e.detail.value,
    })
  },

  subIndustry: function(e) {
    this.setData({
      'Input_form.subIndustry': e.detail.value,
    })
  },

  reasonForIndustry: function(e) {
    this.setData({
      'Input_form.reasonForIndustry': e.detail.value,
    })
  },

  ways: function(e) {
    this.setData({
      'Input_form.ways': e.detail.value,
    })
  },

  excellentCompany: function(e) {
    this.setData({
      'Input_form.excellentCompany': e.detail.value,
    })
  },

  chollima: function(e) {
    this.setData({
      'Input_form.chollima': e.detail.value,
    })
  },

  reasonForCompany: function(e) {
    this.setData({
      'Input_form.reasonForCompany': e.detail.value,
    })
  },

  company: function(e) {
    this.setData({
      'Input_form.company': e.detail.value,
    })
  },

  companyBaseInfo: function(e) {
    this.setData({
      'Input_form.companyBaseInfo': e.detail.value,
    })
  },

  founderInfo: function(e) {
    this.setData({
      'Input_form.founderInfo': e.detail.value,
    })
  },

  marketSize: function(e) {
    this.setData({
      'Input_form.marketSize': e.detail.value,
    })
  },

  financingInfo: function(e) {
    this.setData({
      'Input_form.financingInfo': e.detail.value,
    })
  },

  competitor: function(e) {
    this.setData({
      'Input_form.competitor': e.detail.value,
    })
  },

  whyJoin: function(e) {
    this.setData({
      'Input_form.whyJoin': e.detail.value,
    })
  },

  email: function(e) {
    this.setData({
      'Input_form.email': e.detail.value,
    })
  },

  username: function (e) {
    this.setData({
      'Input_form.username': e.detail.value,
    })
  }
})