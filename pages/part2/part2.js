const txvContext = requirePlugin("tencentvideo");

Page({
  data: {
    code:'w6rtsak5xuya21',
    hide: true,
    wx:'负责人姓名：苑麟丰\n微信号："wxid_w6rtsak5xuya21"',
    inputValue: '',
    videos: []
  },
  onLoad(query) {
    var player1 = txvContext.getTxvContext('txv1');
    console.log(player1);
  },

  code:function(e){
    var that = this
    console.log(e)
    if (e.detail.value == that.data.code){
      that.setData({
        hide: false
      })
    }
    else{
      wx.showToast({
        title: '密码错误',
        icon: 'none',
        duration: 2000
      })
    }
  },

  back: function () {
    wx.setStorage({
      key: 'user_level',
      data: '2',
    })
    wx.navigateBack({
    })
  },
});