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
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/updateFeedback',
      data: {
        uid: wx.getStorageSync('uid'), 
        feedback: that.data.inputtext
      },
      success: function (e) {
        //console.log(e)
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(){
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  }

})