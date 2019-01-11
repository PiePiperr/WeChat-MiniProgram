const txvContext = requirePlugin("tencentvideo");
Page({
  data: {
    code: 'w6rtsak5xuya21',
    inputText: '',
    inputValue: '',
    videos: [],
    ImgUrl: [],
  },

  onLoad: function(options) {
    let that = this
    wx.showModal({
      title: '考核须知',
      content: '扫描页面底部二维码进入综合能力考核群获取考核相关信息，通过后会收到负责人发送的邀请码，在下方输入后即可进入下一阶段',
    })
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/QR_code/queryQR_code?id=1',
      data: {
        uid: wx.getStorageSync('uid')
      },
      success: function(e) {
        console.log(e)
        that.setData({
          ImgUrl: ['http://img01.store.sogou.com/net/a/04/link?appid=100520029&url=' + e.data.url, 1]
        })
        console.log(that.data.ImgUrl)
      },
    })
  },

  info: function() {
    wx.showModal({
      title: '考核须知',
      content: '扫描页面底部二维码进入综合能力考核群获取考核相关信息，通过后会收到负责人发送的邀请码，在下方输入后即可进入下一阶段',
    })
  },

  bindKeyInput: function(e) {
    this.setData({
      inputText: e.detail.value,
    })
  },

  previewImage: function(e) {
    let that = this
    wx.previewImage({
      current: that.data.ImgUrl,
      urls: that.data.ImgUrl
    })
  },

  check: function(e) {
    let that = this
    if (that.data.inputText == that.data.code) {
      wx.setStorage({
        key: 'user_level',
        data: '2',
      })
      wx.showModal({
        title: '密码正确',
        content: '恭喜你进入实习阶段',
        success: function(res) {
          wx.navigateBack({})
        }
      })
    } else {
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})