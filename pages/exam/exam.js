// pages/exam/exam.js
Page({

  data: {
    user_level: '0',
    level2: true,
    level3: true
  },

  onLoad: function(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.getStorage({
      key: 'user_level',
      success: function(res) {
        console.log(res.data)
        if (res.data == 1) {
          that.setData({
            level2: false
          })
        }
        else if (res.data > 1) {
          that.setData({
            level2: false,
            level3: false
          })
        }
      }
    })
  },

  part1: function() {
    wx.navigateTo({
      url: '/pages/part1/part1'
    })
  },
  part2: function() {
    wx.navigateTo({
      url: '/pages/part2/part2'
    })
  },
  part3: function() {
    wx.navigateTo({
      url: '/pages/part3/part3'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})