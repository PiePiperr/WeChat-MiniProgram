// pages/user_topic/user_topic.js
var app = getApp();
Page({
  data: {
    list: '',
    num: 0,
    topic: '',
    icon: ''

  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/personal/topic/list',
      data: {
        uid: wx.getStorageSync('openid')
      },
      success: function (e) {
        //console.log(e)
        that.setData({
          list: e.data.data,
          num: e.data.data.length,
          topic: e.data.data.name,
          icon: e.data.data.icon

        })

      }
    })
  },

  topicDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/topicdetail/topicdetail?iid=' + e.currentTarget.dataset.iid
    })
  },

  onShow: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/personal/topic/list',
      data: {
        uid: wx.getStorageSync('openid')
      },
      success: function (e) {
        console.log(e)
        that.setData({
          list: e.data.data,
          num: e.data.data.length
        })
        wx.hideLoading()
      }
    })
  }

})
