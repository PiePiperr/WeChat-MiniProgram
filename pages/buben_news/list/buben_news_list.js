let app = getApp();
Page({
  data: {
    nav: '',
    cid: '',
    list: '',
    newsList: '',
    item: '',
    loading: true,
    alg_group: '',
  },

  onLoad: function() {
    let that = this
    console.log(wx.getStorageSync('MyIndustry'))
    if (!wx.getStorageSync('MyIndustry')) {
      wx.navigateTo({
        url: '../../startpage/startpage',
      })
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.getStorage({
      key: 'times',
      success: function(res) {
        that.setData({
          times: res.data
        })
      },
      fail: function(res) {
        wx.setStorage({
          key: 'times',
          data: 0,
        })
      },
      complete: function(res) {
        let a = that.data.times;
        if (a < 2) {
          wx.showModal({
            title: '提示',
            content: '你可以前往“个人中心”添加你的兴趣领域',
            cancelText: "不，谢谢",
            confirmText: "去添加",
            success: function(res) {
              console.log(res)
              if (res.cancel) {
                wx.setStorage({
                  key: 'times',
                  data: a + 1,
                })
              } else {
                wx.switchTab({
                  url: '../../user/index/user_index',
                })
                wx.setStorage({
                  key: 'times',
                  data: a + 3,
                })
              }
            }
          })
        } else {}
      }
    })

    wx.request({
      url: 'https://cloud.botbrain.ai/config/v1/RVCQS9UR56',
      data: {
        appid: 'RVCQS9UR56'
      },
      success: function(e) {
        console.log(e)
        that.setData({
          nav: e.data.data.columns,
          cid: e.data.data.columns[0].id
        })
        wx.getStorage({
          key: 'openid',
          success: function(e) {
            console.log(e)
            wx.getStorage({
              key: 'list' + that.data.cid,
              success: function(e) {
                that.setData({
                  list: e.data,
                  //alg_group: e.data.data.alg_group
                })
                wx.hideLoading()
              },
              fail: function() {
                wx.request({
                  url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
                  data: {
                    uid: wx.getStorageSync('openid'),
                    column_id: that.data.cid
                  },
                  success: function(e) {
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
          fail: function() {
            wx.login({
              success: function(e) {
                wx.request({
                  url: 'https://bkd.botbrain.ai/wx/auth/login.json',
                  data: {
                    appid: 'RVCQS9UR56',
                    jsCode: e.code,
                    preview: false
                  },
                  success: function(e) {
                    wx.setStorageSync('openid', e.data.data.openid)
                    wx.getStorage({
                      key: 'list' + that.data.cid,
                      success: function(e) {
                        console.log(e)
                        that.setData({
                          list: e.data,
                          //alg_group: e.data.data.alg_group
                        })
                        wx.hideLoading()
                      },
                      fail: function() {
                        wx.request({
                          url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
                          data: {
                            uid: wx.getStorageSync('openid'),
                            column_id: that.data.cid
                          },
                          success: function(e) {
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
  delete: function(e) {
    //console.log(e)
    let Index = e.currentTarget.dataset.index;
    let tag = '1. 分类：' + e.currentTarget.dataset.tag;
    let that = this
    wx.showActionSheet({
      itemList: ['不感兴趣理由', tag, '2. 对内容不感兴趣', ],
      success: function(res) {
        that.setData({
          reason: res.tapIndex,
          iid: e.currentTarget.dataset.iid
        })
        if (that.data.reason == 1) {
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
            success: function(e) {
              //console.log('踩成功')
              that.data.list.splice(Index, 1);
              that.setData({
                list: that.data.list
              })
              wx.setStorageSync('list' + that.data.cid, that.data.list)
            }
          })
        }
        if (that.data.reason == 2) {
          //console.log('对内容不感兴趣')
          wx.request({
            url: 'https://wxapp.proflu.cn/vipSystem/wxapp/getnews/dislike',
            data: {
              uid: wx.getStorageSync('uid'),
              dt: Date.parse(new Date()) / 1000,
              plt: 'wechat',
              iid: that.data.iid,
            },
            success: function(e) {
              //console.log('踩成功')
              that.data.list.splice(Index, 1);
              that.setData({
                list: that.data.list
              })
              wx.setStorageSync('list' + that.data.cid, that.data.list)
            },
            fail: function(err) {
              console.log(err)
            }
          })
        }
      },
      fail: function(res) {
        //console.log(res.errMsg)
      }
    })
  },

  onReachBottom: function(e) {
    let that = this
    that.setData({
      loading: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
      data: {
        uid: wx.getStorageSync('openid'),
        column_id: that.data.cid
      },
      success: function(e) {
        setTimeout(function() {
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
  loadColumn: function(e) {
    // app.aldstat.sendEvent('切换栏目', '切换栏目')
    let that = this
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
      success: function(res) {
        console.log(res)
        that.setData({
          list: res.data,
          //alg_group: e.data.data.alg_group
        })
        wx.hideLoading()
      },
      fail: function() {
        wx.request({
          url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/feed/',
          data: {
            column_id: that.data.cid,
            uid: wx.getStorageSync('openid')
          },
          success: function(e) {
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

  linkDetail: function(e) {
    // app.aldstat.sendEvent('查看新闻详情', '查看新闻详情')
    wx.navigateTo({
      url: '../detail/buben_news_detail?iid=' + e.currentTarget.dataset.iid + '&algs=' + e.currentTarget.dataset.algs
      //+ '&alg_group=' + e.currentTarget.dataset.alg_group
    })
  },
  search: function(e) {
    // app.aldstat.sendEvent('搜索', '搜索')
    wx.navigateTo({
      url: '../search/buben_news_search'
    })

  },


  onShareAppMessage: function() {
    return {
      title: '陆向谦推荐',
      desc: '为创业者提供最新的创业资讯',
      path: 'pages/buben_news/list/buben_news_list',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  onPullDownRefresh: function() {
    let that = this
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
      success: function(e) {
        wx.setStorageSync('list' + that.data.cid, e.data.data.items)
        setTimeout(function() {
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
  }
})