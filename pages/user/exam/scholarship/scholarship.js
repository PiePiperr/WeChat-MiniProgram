Page({

  data: {
    level1: false,
    level2: true,
    level3: true,
    arrow1: true,
    arrow2: true,
    email: ''
  },

  onShow: function () {
    let that = this
    wx.getStorage({
      key: 'user_level',
      success: function (res) {
        if (res.data == 2) {
          that.setData({
            level1: true,
            level2: false,
            arrow1: false,
          })
        } else
          if (res.data == 3) {
            that.setData({
              level1: true,
              level2: true,
              level3: false,
              arrow1: false,
              arrow2: false
            })
          }
      },
      fail: function (res) {
        wx.setStorage({
          key: 'user_level',
          data: 1,
        })
      }
    })
  },

  lesson: function () {
    wx.navigateTo({
      url: '../../lesson/user_lesson',
    })
  },

  personalplan: function () {
    wx.navigateTo({
      url: '../personalplan/personalplan',
    })
  },

  Input_email: function (e) {
    this.setData({
      email: e.detail.value,
    })
  },

  check_email: function (e) {
    let that = this
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/exam/syncExamOne',
      data: {
        uid: wx.getStorageSync('uid'),
        email: that.data.email
      },
      success: function (e) {
        console.log(e)
        if (e.data.code == 1) {
          wx.setStorageSync('user_level', 1)
          that.setData({
            level0: true,
            level1: false,
            arrow1: false,
          })
          wx.showModal({
            content: '恭喜你进入下一阶段，个人培养方案可重复修改',
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '该邮箱用户未提交个人培养方案',
            cancelText: "重新填",
            confirmText: "去考试",
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../personalplan/personalplan',
                })
              } else { }
            }
          })
        }
      }
    })
  },

  QR_webex: function () {
    wx.navigateTo({
      url: '../QR_webex/QR_webex'
    })
  },

  zoom: function () {
    wx.navigateTo({
      url: '../zoom/zoom'
    })
  },

  report: function () {
    wx.navigateTo({
      url: '../report/report'
    })
  }
})