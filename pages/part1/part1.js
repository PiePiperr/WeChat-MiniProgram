// pages/level1/level1.js
Page({

  data: {
    lesson:"笔试前请观看前5期基础课视频\n点击此处进入“我的课程”观看",
    link:"复制下方链接至浏览器开始考试\nhttp://cn.mikecrm.com/8f9jnlP",
    back: "提交后点击此处返回"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  lesson1: function () {
    wx.navigateTo({
      url: '../user_lesson/user_lesson',
    })
  },

  back: function () {
    wx.setStorage({
      key: 'user_level',
      data: '1',
    })
    wx.navigateBack({
    })
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})