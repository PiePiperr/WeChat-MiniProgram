Page({
  data: {
    chollima: ''
  },
  onLoad: function(options) {
    let that = this
    wx.showLoading({
      title: '加载中',
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
          url: 'https://openapi.itjuzi.com/horse_club/get_horse_club_info',
          header: {
            AUTHORIZATION: 'Bearer '.concat(that.data.access_token)
          },
          data: {
            com_id: options.com_id
          },
          success: function(e) {
            console.log(e)
            const chollima = e.data.data
            that.setData({
              chollima: chollima,
              milestone: chollima.milestone,
              team: chollima.team,
              similar_company: chollima.similar_company,
              product: chollima.product,
              tags: chollima.tags
            })
            let money = that.data.chollima.invest[0].invse_detail_money
            let value = that.data.chollima.invest[0].invse_guess_particulars
            if (money > 10000) {
              money = money / 10000 + "亿"
            } else {
              money = money + "万"
            }
            if (value > 10000) {
              value = value / 10000 + "亿"
            } else {
              value = value + "万"
            }
            that.setData({
              Money: money,
              Value: value
            })
            wx.showToast({
              title: '加载成功',
              icon: 'success'
            })
          }
        })
      }
    })
  }
})