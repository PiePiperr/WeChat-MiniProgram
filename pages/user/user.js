// var app = getApp();
Page({
  data: {
    buttonStatus: 'hide',
    info: 'hide',
    userInfo: '',
    uid: '',
    openid: '',
    varify: '',
    sign: '',
    imageUrl: '',
    section: true,
    bindphone: false,
    choose: 'hide',
    industry_number: '0',
    company_number: '0',
    entre_number: '0',
    career_number: '0',
    barlength: '0%',
    items: [{
      name: '1',
      value: '技术',
    }, {
      name: '2',
      value: '产品',
    }, {
      name: '3',
      value: '营销',
    }]
  },

  onLoad: function() {
    var that = this

    //获取openid
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://wxapp.proflu.cn/vipSystem/wxapp/wxuser/wxlogin',
            data: {
              jsCode: res.code
            },
            success: function(e) {
              console.log(e)
              that.setData({
                uid: e.data.uid
              })
              wx.setStorage({
                key: 'uid',
                data: e.data.uid,
              })
              wx.setStorage({
                key: 'uid_time',
                data: Date.parse(new Date()),
              })
              //查修计划
              wx.request({
                url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/queryPlanInfo',
                data: {
                  uid: wx.getStorageSync('uid')
                },
                success: function(e) {
                  console.log(e)
                }
              })
            },
            fail: function(e) {
              console.log(e)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getStorage({
      key: 'MyCareer',
      success: function(res) {
        for (var j = 0; j < 3; j++) {
          for (var i = 0; i < 3; i++) {
            if (res.data[i] == that.data.items[j].name) {
              that.data.items[j].checked = 'true'
            }
          }
        }
        that.setData({
          career_number: that.data.career_number
        })
      },
    })

  },
  getUserInfoButton: function(e) {
    console.log(e)
    // app.aldstat.sendEvent('个人中心', '授权登录')
    var that = this
    var user = e.detail.userInfo
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/wxuser/updateWxUserInfo',
      data: {
        user_name: user.nickName,
        icon: user.avatarUrl,
        gender: user.gender,
        // gender: '4',
        city: user.city,
        province: user.province,
        uid: that.data.uid
      },
      success: function(e) {
        console.log(e)
      },
      fail: function(e) {
        console.log(e)
      }
    })
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })

    that.setData({
      buttonStatus: 'hide',
      info: 'show',
      userInfo: e.detail.userInfo,
      imageUrl: e.detail.userInfo.avatarUrl
    })
  },

  edit_industry: function(e) {
    wx.navigateTo({
      url: '/pages/industry/industry'
    })
  },

  edit_career: function(e) {
    var that = this
    that.setData({
      choose: 'show'
    })
  },

  edit_company: function(e) {
    wx.navigateTo({
      url: '/pages/company/company'
    })
  },

  edit_entrepreneur: function(e) {
    wx.navigateTo({
      url: '/pages/entrepreneur/entrepreneur'
    })
  },

  checkboxChange: function(e) {
    var that = this
    wx.setStorage({
      key: 'MyCareer',
      data: e.detail.value
    })
  },

  save_career: function(e) {
    var that = this
    that.setData({
      choose: 'hide'
    })
    wx.getStorage({
      key: 'MyCareer',
      success: function(res) {
        console.log(res)
        that.setData({
          career_number: res.data.length,
        })
        var a = that.data.industry_number
        var b = that.data.career_number
        var c = that.data.company_number
        var d = that.data.entre_number
        that.setData({
          barlength: (((a > 0) ? 1 : 0) + ((b > 0) ? 1 : 0) + ((c > 0) ? 1 : 0) + ((d > 0) ? 1 : 0)) * 25 + "%"
        })
        wx.setStorage({
          key: 'Barlength',
          data: that.data.barlength,
        })
        wx.request({
          url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/updateCareer',
          data: {
            uid: wx.getStorageSync('uid'),
            id: res.data.toString()
          },
          success: function(e) {
            console.log(e)
          }
        })
      },
    })

  },

  //绑定手机
  bindphone: function(e) {
    var that = this
    wx.navigateTo({
      url: '/pages/phone/phone?uid=' + that.data.uid + "&sign=" + that.data.sign
    })
  },
  //查看我的收藏
  linkCollect: function(e) {
    // app.aldstat.sendEvent('查看我的收藏', '查看我的收藏')
    wx.navigateTo({
      url: '/pages/user_collect/user_collect'
    })
  },
  //查看我的话题
  linkTopic: function(e) {
    // app.aldstat.sendEvent('查看我的话题', '查看我的话题')
    wx.navigateTo({
      url: '/pages/user_topic/user_topic'
    })
  },
  //查看我的作品
  linkWork: function(e) {
    // app.aldstat.sendEvent('查看我的作品', '查看我的作品')
    wx.navigateTo({
      url: '/pages/user_work/user_work'
    })
  },
  //意见反馈
  feedBack: function(e) {
    // app.aldstat.sendEvent('意见反馈', '意见反馈')
    wx.navigateTo({
      url: '/pages/user_feedback/user_feedback'
    })
  },
  //入学考试
  exam: function(e) {
    wx.navigateTo({
      url: '../exam/exam'
    })
  },

  lesson: function (e) {
    wx.navigateTo({
      url: '../user_lesson/user_lesson'
    })
  },


  onShow: function() {
    var that = this
    that.setData({
      industry_number: wx.getStorageSync('MyIndustry').length,
      career_number: wx.getStorageSync('MyCareer').length,
    })
    var a = that.data.industry_number
    var b = that.data.career_number
    that.setData({
      barlength: (((a > 0) ? 1 : 0) + ((b > 0) ? 1 : 0)) * 25 + "%"
    })
    wx.setStorage({
      key: 'Barlength',
      data: that.data.barlength,
    })

    wx.getStorage({
      key: 'MyCompany',
      success: function(res) {
        that.setData({
          company_number: res.data.id.length,
        })
        var c = that.data.company_number
        that.setData({
          barlength: (((a > 0) ? 1 : 0) + ((b > 0) ? 1 : 0) + ((c > 0) ? 1 : 0)) * 25 + "%"
        })
        wx.setStorage({
          key: 'Barlength',
          data: that.data.barlength,
        })
      },
      fail: function(e) {}
    })

    wx.getStorage({
      key: 'MyEntrepreneur',
      success: function(res) {
        that.setData({
          entre_number: res.data.id.length,
        })
        var c = that.data.company_number
        var d = that.data.entre_number
        that.setData({
          barlength: (((a > 0) ? 1 : 0) + ((b > 0) ? 1 : 0) + ((c > 0) ? 1 : 0) + ((d > 0) ? 1 : 0)) * 25 + "%"
        })
        wx.setStorage({
          key: 'Barlength',
          data: that.data.barlength,
        })
      },
      fail: function(e) {}
    })

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        that.setData({
          info: 'show',
          buttonStatus: 'hide',
          userInfo: res.data
        })
      },
      fail: function() {
        that.setData({
          buttonStatus: 'show',
          info: 'hide'
        })
      }
    })
    var timestamp = Date.parse(new Date());
    wx.getStorage({
      key: 'uid_time',
      success: function(res) {
        if ((timestamp - res.data) / 60000 > 29) {
          wx.login({
            success: function(res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://wxapp.proflu.cn/vipSystem/wxapp/wxuser/wxlogin',
                  data: {
                    jsCode: res.code
                  },
                  success: function(e) {
                    console.log(e)
                    that.setData({
                      uid: e.data.uid
                    })
                    wx.setStorage({
                      key: 'uid',
                      data: e.data.uid,
                    })
                    wx.setStorage({
                      key: 'uid_time',
                      data: Date.parse(new Date()),
                    })
                  },
                  fail: function(e) {
                    console.log(e)
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      },
    })
  }
})