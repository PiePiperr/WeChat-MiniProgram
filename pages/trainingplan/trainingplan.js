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

  edit_industry: function (e) {
    wx.navigateTo({
      url: '/pages/industry/industry'
    })
  },

  edit_company: function (e) {
    wx.navigateTo({
      url: '/pages/company/company'
    })

  }, edit_entrepreneur: function (e) {
    wx.navigateTo({
      url: '/pages/entrepreneur/entrepreneur'
    })
  },
})


