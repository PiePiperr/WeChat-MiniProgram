var date = new Date();
var Y = date.getFullYear();
var M = date.getMonth() + 1;
var D = date.getDate();

Page({
  data: {
    access_token: '',
    refresh_token: '',
    column_id: '0',
    selected_date: '',
    list1: [],
    list2: [],
    time: [{
      id: 0,
      name: '今天',
      date: Y + '-' + M + '-' + D
    }, {
      id: 1,
      name: M + '-' + (D - 1),
      date: Y + '-' + M + '-' + (D - 1)
    }, {
      id: 2,
      name: M + '-' + (D - 2),
      date: Y + '-' + M + '-' + (D - 2)
    }, {
      id: 3,
      name: M + '-' + (D - 3),
      date: Y + '-' + M + '-' + (D - 3)
    }, {
      id: 4,
      name: M + '-' + (D - 4),
      date: Y + '-' + M + '-' + (D - 4)
    }, {
      id: 5,
      name: M + '-' + (D - 5),
      date: Y + '-' + M + '-' + (D - 5)
    }]
  },

  onLoad: function(options) {
    var that = this
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
          url: 'https://openapi.itjuzi.com/news/get_news_info',
          header: {
            AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
          },
          data: {
            type: 1,
            date: that.data.time[0].date
          },
          success: function(e) {
            console.log(e)
            that.setData({
              list1: e.data.data
            })
            wx.request({
              url: 'https://openapi.itjuzi.com/news/get_news_info',
              header: {
                AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
              },
              data: {
                type: 2,
                date: that.data.time[0].date
              },
              success: function(e) {
                that.setData({
                  list2: e.data.data
                })
              }
            })
          }
        })
      }
    })
  },

  loadColumn: function(e) {
    var that = this
    that.setData({
      column_id: e.currentTarget.dataset.id,
      selected_date: e.currentTarget.dataset.date
    })
    wx.request({
      url: 'https://openapi.itjuzi.com/news/get_news_info',
      header: {
        AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
      },
      data: {
        type: 1,
        date: that.data.selected_date
      },
      success: function(e) {
        that.setData({
          list1: e.data.data
        })
        wx.request({
          url: 'https://openapi.itjuzi.com/news/get_news_info',
          header: {
            AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
          },
          data: {
            type: 2,
            date: that.data.selected_date
          },
          success: function(e) {
            that.setData({
              list2: e.data.data
            })
          }
        })
      }
    })
  },

  linkDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/news_detail?url=' + e.currentTarget.dataset.url
    })
  }
})