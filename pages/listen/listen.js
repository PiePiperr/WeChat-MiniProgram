// pages/listen/listen.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    access_token:'',

   
    src: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.log(e)
    var that = this
    that.setData({
      text:e.content,
     
     src: 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.84f9def073e88f0d692c836bbd9f8f9f.2592000.1528257076.282335-11200386&vol=9&per=0&spd=5&pit=5&tex='+e.content,
 
    })
   
   
    wx.request({
      url: 'https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=MGVrxfvs0b96H03oW3pF2n0U&client_secret=7AjIUxIKYA6Qr9Gxgfx4qGKj7tD04MrG',
      data: {
        //appKey:'MGVrxfvs0b96H03oW3pF2n0',
        //appSecret: '7AjIUxIKYA6Qr9Gxgfx4qGKj7tD04MrG'
      },
      success:function(e){
        console.log(e)
      that.setData({
        access_token: e.data.access_token
        
      })
    }
    })
    
  
  },
  bindTextAreaBlur: function (e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      text: e.detail.value,
      src: 'http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=24.84f9def073e88f0d692c836bbd9f8f9f.2592000.1528257076.282335-11200386&vol=9&per=0&spd=5&pit=5&tex=' + e.detail.value,
    })
    
  },
  bindfocus:function(e){
    var that = this
console.log(e)
that.setData({
 

})
  },
  listen:function(e){
    var that = this
    wx.request({
      url: 'https://tsn.baidu.com/text2audio',
      data: {
        lan:'zh',
        ctp: 1,
        cuid: wx.getStorageSync('openid'),
        tok: that.data.access_token,
        tex:'%e7%99 % be % e5 % ba % a6 % e4 % bd % a0 % e5 % a5 % bd',
      },
      success:function(e){
      console.log(e)
  that.setData({
    mp3:e.data
  })
       
        
      }
    })
  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },
  

  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }
  
  
})