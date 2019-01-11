let app = getApp();
// pages/search/search.js
Page({
  data: {
    list: '',
    nextPage: 2,
    keyWord: '',
    loading: true,
    none: true,
    inputText: '',
    history: '',
    his: false,
    clear: true,
    his_none: false,
    cancel: true,
    hot_com: ['今日头条', '蚂蚁金服', '阿里云', '滴滴出行', '陆金所', '腾讯音乐娱乐集团', '大疆无人机', '京东数科', '菜鸟网络', '快手']
  },

  onLoad: function(options) {
    let that = this
    that.setData({
      history: wx.getStorageSync('history')
    })
    if (that.data.history != '') {
      that.setData({
        clear: false,
        hisnone: true
      })
    }
  },

  search: function(e) {
    // app.aldstat.sendEvent('搜索', '搜索')
    console.log(e)
    let that = this
    let inputText = e.detail.value
    if (inputText == '') {
      return
    }
    that.setData({
      clear: true,
      hisnone: true
    })
    let temp = new Array()
    temp[0] = e.detail.value
    wx.getStorage({
      key: 'history',
      success: function(e) {
        that.setData({
          history: temp.concat(e.data)
        })
        wx.setStorageSync('history', that.data.history)
      },
      fail: function(e) {
        that.setData({
          history: temp
        })
        wx.setStorageSync('history', that.data.history)
      }
    })
    that.setData({
      history: wx.getStorageSync('history'),
      his: true,
      keyWord: e.detail.value,
      nextPage: 2,
      none: true,
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: e.detail.value,
        st: 1
      },
      success: function(e) {
        that.setData({
          list: e.data.data.items
        })
        if (that.data.list.length == 0) {
          that.setData({
            none: false
          })
        }
      }
    })
  },

  search1: function(e) {
    let that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: that.data.inputText,
        st: 1
      },
      success: function(e) {
        that.setData({
          list: e.data.data.items
        })
        if (that.data.list.length == 0) {
          that.setData({
            none: false
          })
        }
      }
    })

  },

  bindKeyInput: function(e) {
    console.log(e)
    this.setData({
      inputText: e.detail.value,
      cancel: false
    })
  },
  
  //点击历史记录搜索
  research: function(e) {
    // app.aldstat.sendEvent('历史搜索', '历史搜索')
    let that = this
    that.setData({
      clear: true,
      his: true,
      inputText: e.currentTarget.dataset.value,
      keyWord: e.currentTarget.dataset.value,
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: e.currentTarget.dataset.value,
        st: 1
      },
      success: function(e) {
        that.setData({
          list: e.data.data.items
        })
        if (that.data.list.length == 0) {
          that.setData({
            none: false
          })
        }
      }
    })
  },

  onReachBottom: function(e) {
    let that = this
    if (that.data.list.length == 0) {
      return
    }
    that.setData({
      loading: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: that.data.keyWord,
        st: that.data.nextPage
      },
      success: function(e) {
        if (e.data.data.items.length == 0) {
          wx.showToast({
            title: '无更多内容',
            image: '/icon/nomore.png',
            duration: 1000
          })
          that.setData({
            loading: true
          })
        }
        setTimeout(function() {
          that.setData({
            list: that.data.list.concat(e.data.data.items),
            nextPage: that.data.nextPage + 1,
            loading: true
          })
        }, 800)
      }
    })
  },

  cancel: function(e) {
    let that = this
    that.setData({
      inputText: '',
      list: '',
      none: true,
      his: false
    })
    wx.getStorage({
      key: 'history',
      success: function(e) {
        that.setData({
          inputText: '',
          list: '',
          none: true,
          his: false,
          clear: false,
          hisnone: true
        })
      },
      fail: function() {
        that.setData({
          inputText: '',
          list: '',
          none: true,
          his: false,
          clear: true,
          hisnone: false
        })
      }
    })

  },

  linkDetail: function(e) {
    wx.navigateTo({
      url: '../detail/buben_news_detail?iid=' + e.currentTarget.dataset.iid
    })
  },

  clearHistory: function() {
    let that = this
    wx.removeStorageSync('history')
    that.setData({
      history: '',
      clear: true,
      hisnone: false
    })
  }
})