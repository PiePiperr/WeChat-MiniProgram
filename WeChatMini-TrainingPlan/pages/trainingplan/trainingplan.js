Page({
  data: {    
    items: [
      { name: 'produce', value: '产品' },
      { name: 'project', value: '工程', checked: 'true'},  
      { name: 'marketing', value: '营销' }           
    ],
    
  },
  checkboxChange: function (e) {
    console.log('理想职业value值为：', e.detail.value)
  },
  
  //修改行业
  edit_trade: function (e) {
    //app.aldstat.sendEvent('修改行业', '修改行业')    
    wx.navigateTo({
      url: '/pages/trade/trade'
    })
  },

  edit_company: function (e) {
    //app.aldstat.sendEvent('修改公司', '修改公司')    
    wx.navigateTo({
      url: '/pages/company/company'
    })
  },

  edit_entrepreneur: function (e) {
    //app.aldstat.sendEvent('修改企业家', '修改企业家')    
    wx.navigateTo({
      url: '/pages/entrepreneur/entrepreneur'
    })
  }

})


