var app = getApp();
Page({
  data: {
    nav: '',
    cid: '',
    list: '',
    item: '',
    loading: true,
    alg_group: ''
  },

  onLoad: function () {
    var that = this


    wx.showLoading({
      title: '加载中',
      mask: true
    })

    wx.showModal({
      title: '提示',
      content: '您可以前往“个人中心”修改理想行业、公司等内容，订阅更准确的新闻资讯',
      cancelText: "不，谢谢",
      confirmText: "去设置",
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '../user/user',
          })
        }
      }
    })

    wx.request({
      url: 'https://cloud.botbrain.ai/config/v1/RVCQS9UR56',
      data: {
        appid: 'RVCQS9UR56'
      },
      success: function (e) {
        that.setData({
          nav: e.data.data.columns,
          cid: e.data.data.columns[0].id
        })
        wx.getStorage({
          key: 'openid',
          success: function (e) {
            console.log(e)
            wx.getStorage({
              key: 'list' + that.data.cid,
              success: function (e) {
                that.setData({
                  list: e.data,
                  //alg_group: e.data.data.alg_group
                })
                wx.hideLoading()
              },
              fail: function () {
                wx.request({
                  url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
                  data: {
                    uid: wx.getStorageSync('openid'),
                    column_id: that.data.cid
                  },
                  success: function (e) {
                    console.log(e)
                    wx.setStorageSync('list' + that.data.cid, e.data.data.items)
                    that.setData({
                      list: e.data.data.items,
                      //  alg_group: e.data.data.alg_group
                    })
                    wx.hideLoading()
                  }
                })
              }
            })
          },
          fail: function () {
            wx.login({
              success: function (e) {
                wx.request({
                  url: 'https://bkd.botbrain.ai/wx/auth/login.json',
                  data: {
                    appid: 'RVCQS9UR56',
                    jsCode: e.code,
                    preview: false
                  },
                  success: function (e) {
                    wx.setStorageSync('openid', 1234567)
                    wx.getStorage({
                      key: 'list' + that.data.cid,
                      success: function (e) {
                        console.log(e)
                        that.setData({
                          list: e.data,
                          //alg_group: e.data.data.alg_group
                        })
                        wx.hideLoading()
                      },
                      fail: function () {
                        wx.request({
                          url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
                          data: {
                            uid: wx.getStorageSync('openid'),
                            column_id: that.data.cid
                          },
                          success: function (e) {
                            console.log(e)
                            wx.setStorageSync('list' + that.data.cid, e.data.data.items)
                            that.setData({
                              list: e.data.data.items,
                              //alg_group: e.data.data.alg_group
                            })
                            wx.hideLoading()
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  //删除新闻
  delete: function (e) {
    //console.log(e)
    var Index = e.currentTarget.dataset.index;
    var that = this
    wx.showActionSheet({
      itemList: ['内容太差', '对内容不感兴趣',],
      success: function (res) {
        that.setData({
          reason: res.tapIndex,
          iid: e.currentTarget.dataset.iid
        })
        console.log(res.tapIndex)
        if (that.data.reason == 0) {
          //console.log('内容太差')
          wx.request({
            url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/down',
            data: {
              uid: wx.getStorageSync('openid'),
              guid: wx.getStorageSync('openid'),
              dt: Date.parse(new Date()) / 1000,
              plt: 'wechat',
              iid: that.data.iid,
            },
            success: function (e) {
              //console.log('踩成功')
              that.data.list.splice(Index, 1);
              console.log(that.data.list)
              that.setData({
                list: that.data.list
              })
              wx.setStorageSync('list' + that.data.cid, that.data.list)
            }
          })
        } else {
          //console.log('对内容不感兴趣')
          wx.request({
            url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/dislike',
            data: {
              uid: wx.getStorageSync('openid'),
              guid: wx.getStorageSync('openid'),
              dt: Date.parse(new Date()) / 1000,
              plt: 'wechat',
              iid: that.data.iid,
            },
            success: function (e) {
              //console.log('不喜欢成功')
              that.data.list.splice(Index, 1);
              console.log(that.data.list)
              that.setData({
                list: that.data.list
              })
            }
          })
        }
      },
      fail: function (res) {
        //console.log(res.errMsg)
      }
    })
  },


  onReachBottom: function (e) {
    var that = this
    that.setData({
      loading: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.cid
      },
      success: function (e) {
        setTimeout(function () {
          that.setData({
            list: that.data.list.concat(e.data.data.items),
            // alg_group: e.data.data.alg_group,
            loading: true
          })
        }, 800)
      }
    })
  },


  // 加载栏目
  loadColumn: function (e) {
    app.aldstat.sendEvent('切换栏目', '切换栏目')
    var that = this
    that.setData({
      cid: e.currentTarget.dataset.id,
      list: ''
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.getStorage({
      key: 'list' + that.data.cid,
      success: function (res) {
        console.log(res)
        that.setData({
          list: res.data,
          //alg_group: e.data.data.alg_group
        })
        wx.hideLoading()
      },
      fail: function () {
        wx.request({
          url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
          data: {
            column_id: that.data.cid,
            uid: wx.getStorageSync('openid')
          },
          success: function (e) {
            console.log(e)
            wx.hideLoading()
            that.setData({
              list: e.data.data.items,
              //alg_group: e.data.data.alg_group
            })
            wx.setStorageSync('list' + that.data.cid, e.data.data.items)
          }
        })
      }
    })

  },


  linkDetail: function (e) {

    app.aldstat.sendEvent('查看新闻详情', '查看新闻详情')
    //console.log(e)
    wx.navigateTo({
      url: '/pages/index_detail/index_detail?iid=' + e.currentTarget.dataset.iid + '&algs=' + e.currentTarget.dataset.algs
      //+ '&alg_group=' + e.currentTarget.dataset.alg_group
    })

  },
  Linksearch: function (e) {

    app.aldstat.sendEvent('搜索', '搜索')
    //console.log(e)
    wx.navigateTo({
      url: '/pages/search/search'
    })

  },


  onShareAppMessage: function () {
    return {
      title: '陆向谦推荐',
      desc: '为创业者提供最新的创业资讯',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onPullDownRefresh: function () {
    var that = this
    wx.showLoading({
      title: '更新中',
      mask: true
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.cid
      },
      success: function (e) {
        wx.setStorageSync('list' + that.data.cid, e.data.data.items)
        setTimeout(function () {
          that.setData({
            list: e.data.data.items,
            // alg_group: e.data.data.alg_group
          })
          wx.stopPullDownRefresh()
          wx.hideLoading()
          wx.showToast({
            title: '更新成功',
            icon: "success"
          })
        }, 500)
      }
    })
  },

  Refresh: function () {
    app.aldstat.sendEvent('按钮刷新', '刷新成功')
    wx.showLoading({
      title: '更新中',
      mask: true
    })
    var that = this
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.cid
      },
      success: function (e) {
        wx.setStorageSync('list' + that.data.cid, e.data.data.items)
        setTimeout(function () {
          that.setData({
            list: e.data.data.items,
            // alg_group: e.data.data.alg_group
          })
          wx.hideLoading()
          wx.showToast({
            title: '更新成功',
            icon: "success"
          })
        }, 500)
      }
    })
  }

})
