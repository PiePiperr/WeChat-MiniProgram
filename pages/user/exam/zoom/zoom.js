const txvContext = requirePlugin("tencentvideo");
Page({
  data: {
    code: 'lxqcxcysys',
    inputText: '',
    inputValue: '',
    videos: [],
    ImgUrl: ['../../../../images/zhnlkh.png',1]
  },

  onLoad: function(options) {
    let that = this
    wx.showModal({
      title: '考核须知',
      content: '加入qq群了解更多考核相关信息（页面最下方）',
    })
  },

  info: function() {
    wx.showModal({
      title: '考核须知',
      content: '加入qq群了解更多考核相关信息（页面最下方）',
    })
  },

  bindKeyInput: function(e) {
    this.setData({
      inputText: e.detail.value,
    })
  },

  previewImage: function(e) {
    wx.previewImage({
      urls: this.data.ImgUrl
    })
  },

  check: function(e) {
    let that = this
    if (that.data.inputText == that.data.code) {
      wx.setStorage({
        key: 'user_level',
        data: '3',
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