Page({
  data: {
    url: ''
  },

  onLoad: function(options) {
    console.log(options)
    this.setData({
      url: options.url == undefined ? 'https://www.toutiao.com/i6501865707154702861' : options.url
    })
  }
})