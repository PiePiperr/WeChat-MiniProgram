// pages/user_feedback/user_feedback.js
var app = getApp();
Page({
  data: {
    inputtext: '',
    userInfo: wx.getStorageSync('userInfo')
    
  },

  onLoad: function (options) {

  },

  bindTextAreaBlur: function (e) {
    var that = this
    that.setData({
      inputtext: e.detail.value
    })
  },

  submit: function (e) {
    var that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/feedback/log',
   
      data: {
        name:that.data.userInfo.nickName,
        uid: wx.getStorageSync('openid'),
        content: that.data.inputtext,
        type:1
      },
      success: function (e) {
        //console.log(e)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  }

})