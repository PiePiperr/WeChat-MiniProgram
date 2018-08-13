// pages/user_collect/user_collect.js
var app = getApp();
Page({
  data: {
    list: '',
    num: 0

  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/collect',
      data: {
        uid: wx.getStorageSync('openid'),
        page: 1,
        page_size: 10
      },
      success: function (e) {
        console.log(e)
        that.setData({
          list: e.data.data.items,
          num: e.data.data.items.length
        })

      }
    })
  },

  linkDetail: function (e) {
    wx.navigateTo({
      url: '/pages/index_detail/index_detail?iid=' + e.currentTarget.dataset.iid
    })
  },
  onShow: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/collect',
      data: {
        uid: wx.getStorageSync('openid'),

      },
      success: function (e) {
        console.log(e)
        that.setData({
          list: e.data.data.items
        })
        wx.hideLoading()
      }
    })
  }
})
