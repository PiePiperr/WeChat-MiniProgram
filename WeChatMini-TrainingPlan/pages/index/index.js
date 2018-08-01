var app = getApp();
const appData = getApp().globalData

Page({
  data: {
    newsColumns: '',
    columnId: '',
    newsList: '',
    loadingIconHidden: true,
    alg_group: '',
    searchIconHidden: true
  },

  checkNewsList: function () {
    var that = this
    var currentNewsList = wx.getStorageSync('newsList' + that.data.columnId)
    if (!currentNewsList) {
      that.initNewsList()
    }
    else {
      that.setData({
        newsList: currentNewsList,
        //alg_group: e.data.data.alg_group
      })
      wx.hideLoading()
    }
  },

  initNewsList: function (e) {
    var type = e
    var that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/' + appData.osKey + '/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.columnId
      },
      success: function (e) {
        wx.setStorageSync('newsList' + that.data.columnId, e.data.data.items)
        that.setData({
          newsList: e.data.data.items
          //  alg_group: e.data.data.alg_group
        })
        wx.hideLoading()
        if (type == 'pullDown') {
          wx.stopPullDownRefresh()
          wx.showToast({
            title: '更新成功',
            icon: "success"
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onLoad: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/config/v1/' + appData.osKey,
      success: function (e) {
        that.setData({
          newsColumns: e.data.data.columns,
          columnId: e.data.data.columns[0].id,
          searchIconHidden: false
        })
        var openid = wx.getStorageSync('openid')
        if (!openid) {
          wx.login({
            success: function (e) {
              wx.request({
                url: 'https://bkd.botbrain.ai/wx/auth/login.json',
                data: {
                  appid: appData.osKey,
                  jsCode: e.code,
                  preview: false
                },
                success: function (e) {
                  wx.setStorageSync('openid', e.data.data.openid)
                  that.checkNewsList()
                },
                fail: function (err) {
                  console.log(err)
                }
              })
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
        else {
          that.checkNewsList()
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 加载栏目
  loadColumn: function (e) {
    app.aldstat.sendEvent('切换栏目', '切换栏目')
    var that = this
    that.setData({
      columnId: e.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    that.checkNewsList()
  },

  linkSearch: function (e) {
    app.aldstat.sendEvent('搜索', '搜索')
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  linkDetail: function (e) {
    app.aldstat.sendEvent('查看新闻详情', '查看新闻详情')
    wx.navigateTo({
      url: '/pages/index_detail/index_detail?iid=' + e.currentTarget.dataset.iid + '&algs=' + e.currentTarget.dataset.algs
      //+ '&alg_group=' + e.currentTarget.dataset.alg_group
    })
  },

  deleteNewsItem: function (e) {
    var Index = e.currentTarget.dataset.index;
    var that = this
    wx.showActionSheet({
      itemList: ['内容太差', '对内容不感兴趣',],
      success: function (res) {
        that.setData({
          reason: res.tapIndex,
          iid: e.currentTarget.dataset.iid
        })
        if (that.data.reason == 0) {
          wx.request({
            url: 'https://api.botbrain.ai/behavior/v1/' + appData.osKey + '/down',
            data: {
              uid: wx.getStorageSync('openid'),
              guid: wx.getStorageSync('openid'),
              dt: Date.parse(new Date()) / 1000,
              plt: 'wechat',
              iid: that.data.iid,
            },
            success: function (e) {
              that.data.newsList.splice(Index, 1);
              that.setData({
                newsList: that.data.newsList
              })
              wx.setStorageSync('newsList' + that.data.columnId, that.data.newsList)
            },
            fail: function (err) {
              console.log(err)
            }
          })
        } else {
          wx.request({
            url: 'https://api.botbrain.ai/behavior/v1/' + appData.osKey + '/dislike',
            data: {
              uid: wx.getStorageSync('openid'),
              guid: wx.getStorageSync('openid'),
              dt: Date.parse(new Date()) / 1000,
              plt: 'wechat',
              iid: that.data.iid,
            },
            success: function (e) {
              that.data.newsList.splice(Index, 1);
              that.setData({
                newsList: that.data.newsList
              })
              wx.setStorageSync('newsList' + that.data.columnId, that.data.newsList)
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onReachBottom: function (e) {
    var that = this
    that.setData({
      loadingIconHidden: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/' + appData.osKey + '/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.columnId
      },
      success: function (e) {
        setTimeout(function () {
          that.setData({
            newsList: that.data.newsList.concat(e.data.data.items),
            // alg_group: e.data.data.alg_group,
            loadingIconHidden: true
          })
        }, 800)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  onPullDownRefresh: function () {
    var that = this
    wx.showLoading({
      title: '更新中',
      mask: true
    })
    setTimeout(() => {
      that.initNewsList('pullDown')
    }, 500)
  },

  onShareAppMessage: function () {
    return {
      title: '陆向谦推荐',
      desc: '为创业者提供最新的创业资讯',
      path: 'pages/index/index'
    }
  }
})
