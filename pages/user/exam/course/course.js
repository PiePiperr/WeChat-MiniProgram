Page({

  data: {
    email: ''
  },

  onShow: function () {
    let that = this
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

  report: function () {
    wx.navigateTo({
      url: '../report/report'
    })
  }
})