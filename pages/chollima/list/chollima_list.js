Page({
  data: {
    list: "",
    column_id: '0',
    limit: 100,
    page: 1
  },

  onLoad: function(e) {
    let that = this
    if (!wx.getStorageSync('MyIndustry')) {
      wx.navigateTo({
        url: '../../startpage/startpage',
      })
    } else {
      let page = 1
      wx.showLoading({
        title: '正在努力加载',
        mask: true
      })
      wx.request({
        url: 'https://openapi.itjuzi.com/oauth2.0/get_access_token',
        data: {
          appid: '123456839',
          appkey: 'da234dsf354sSkwUsd96dHJs243klHK2',
          granttype: 'client_credentials'
        },
        success: function(e) {
          that.setData({
            access_token: e.data.data.access_token,
            refresh_token: e.data.data.refresh_token
          })
          wx.request({
            url: 'https://openapi.itjuzi.com/horse_club/get_horse_club_list',
            header: {
              AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
            },
            data: {
              page: page,
              limit: that.data.limit
            },
            success: function(e) {
              console.log(page)
              if (e.data.code == 1000) {
                that.setData({
                  list: e.data.data
                })
                wx.setStorage({
                  key: 'com_list',
                  data: e.data.data,
                })
                for (let i = 2; i < 9; i++) {
                  console.log(i)
                  wx.request({
                    url: 'https://openapi.itjuzi.com/horse_club/get_horse_club_list',
                    header: {
                      AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
                    },
                    data: {
                      page: i,
                      limit: that.data.limit
                    },
                    success: function(e) {
                      that.setData({
                        list: that.data.list.concat(e.data.data)
                      })
                      if (i == 8) {
                        wx.setStorage({
                          key: 'com_list',
                          data: that.data.list,
                        })
                      }
                    }
                  })
                }
                wx.showToast({
                  title: '加载成功',
                  icon: 'success'
                })
              } else {
                wx.showToast({
                  title: '加载失败',
                  icon: 'success'
                })
              }
            }
          })
        }
      })
    }
  },

  onShow: function(e) {
    let that = this
    wx.getStorage({
      key: 'MyIndustry',
      success: function(res) {
        that.setData({
          MyIndustry: res.data
        })
      }
    })
  },

  loadColumn: function(e) {
    let that = this
    let a = new Array()
    let name = e.currentTarget.dataset.name
    that.setData({
      column_id: e.currentTarget.dataset.id
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.getStorage({
      key: 'com_list',
      success: function(res) {
        if (name == 'all') {
          that.setData({
            list: res.data
          })
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].cat_name == name) {
              a.push(res.data[i])
              that.setData({
                list: a
              })
            }
          }
        }
      },
      complete: function() {
        wx.hideLoading({})
      }
    })
  },

  linkDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/chollima_detail?com_id=' + e.currentTarget.dataset.com_id
    })
  },

  add: function(e) {
    wx.navigateTo({
      url: '../../user/industry/user_industry'
    })
  },

  search: function(e) {
    wx.navigateTo({
      url: '../search/chollima_search'
    })
  },

  info: function(e) {
    wx.showModal({
      title: '千里马俱乐部',
      content: '千里马俱乐部是估值超过10亿元的创业公司，点击左上角搜索按钮可以查询和关注感兴趣的公司',
      confirmText: "去看看",
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../search/chollima_search'
          })
        }
      }
    })
  }
})