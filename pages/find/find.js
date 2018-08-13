// pages/find/find.js
var app = getApp();
Page({

  data: {

   list: '',
    topic_id :'',
    loading: true,
    mid:''

  },
  
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/topic/hots',
      data: {
        uid: wx.getStorageSync('openid'),
        page_size: 10
      },
      success: function (e) {
        wx.hideLoading()
      }
    })
  },

  onShow: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/topic/hots',
      data: {
        uid: wx.getStorageSync('openid'),
        page_size: 10
      },
      success: function (e) {
        //console.log(e)
        that.setData({
          list: e.data.data,
          title: e.data.data.title,
        })
        wx.hideLoading()
      }
    })
  },

  //查看新闻详情
  linkDetail0: function (e) {
   // console.log(e)
    wx.navigateTo({
      url: '/pages/index_detail/index_detail?iid=' + e.currentTarget.dataset.iid
    })
  },

  //下拉触底shuax
  onReachBottom: function (e) {
    //console.log(e)
    var that = this
    that.setData({
      loading: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/8VA4S7UVAR/topic/hots',
      data: {
        uid: wx.getStorageSync('openid'),
        page_size: 10
      },
      success: function (e) {
    setTimeout(function () {
          that.setData({
            list: that.data.list.concat(e.data.data),
            loading: true
          })
        }, 800)
      }
    })
  },

  //关注按钮动作
  subTopic: function (e) {
    app.aldstat.sendEvent('关注话题', '关注话题')
    //console.log(e)
    this.setData({
      topic_id: e.currentTarget.dataset.iid
    })
    var that = this,
      idx = e.currentTarget.dataset.idx,
      follow = e.currentTarget.dataset.follow;
    var item = 'list[' + idx + '].collected'
    var collected = follow == 0 ? 1 : 0;
    that.setData({
      [item]: collected
    })
    //请求关注/取消关注话题
    wx.request({
      url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/subtopic',
      data: {
        uid: wx.getStorageSync('openid'),
        guid: wx.getStorageSync('openid'),
        dt: Date.parse(new Date()) / 1000,
        plt: 'wechat',
        topic_id: that.data.topic_id,
        type: collected
      },
      success: function (e) {
        //console.log('请求关注成功')
      }
    })
  },

//跳转至新闻详情
  linkDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '/pages/topicdetail/topicdetail?iid=' + e.currentTarget.dataset.iid
    })
  }
})