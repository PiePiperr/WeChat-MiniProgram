// pages/qr/qr.js
Page({
  data: {
    ImgUrl: [],
  },
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/QR_code/queryQR_code?id=2',
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function (e) {
        console.log(e)
        that.setData({
          ImgUrl: ['http://img01.store.sogou.com/net/a/04/link?appid=100520029&url=' + e.data.url, 1]
        })
      },
    })
  },
  previewImage: function (e) {
    let that = this
    wx.previewImage({
      current: that.data.ImgUrl,
      urls: that.data.ImgUrl
    })
  }
})