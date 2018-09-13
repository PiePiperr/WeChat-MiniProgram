// pages/level3/level3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lesson: "实习期间请观看剩余6期基础课视频\n点击此处进入“我的课程”观看",
    link: "请在3个月内完成师父分配的实习任务，\n实习期结束后，表现优异的同学\n可被推荐为正式学员",
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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