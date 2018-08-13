// pages/industry/industry.js
Page({
  data: {
    MyIndustry: [],    
    IndustryList: [
                  { id: 1, name: '电子商务' , check: 0 }, 
                  { id: 2, name: '医疗健康', check: 0 }, 
                  { id: 3, name: '工具软件', check: 0 }, 
                  { id: 4, name: '企业服务', check: 0  }, 
                  { id: 5, name: '汽车交通', check: 0  }, 
                  { id: 6, name: '硬件', check: 0  }, 
                  { id: 7, name: '教育', check: 0 },
                  { id: 8, name: '文化娱乐', check: 0 },
                  { id: 9, name: '金融', check: 0 },
                  { id: 10, name: '体育运动', check: 0 },
                  { id: 11, name: '物流', check: 0 },
                  { id: 12, name: '本地生活', check: 0 },
                  { id: 13, name: '旅游', check: 0 },
                  { id: 14, name: '房产服务', check: 0 },
                  { id: 15, name: '广告营销', check: 0 },
                  { id: 16, name: '游戏', check: 0 },
                  { id: 17, name: '社交网络', check: 0 },
               ],        
  },

  check: function (e) {
    //console.log(e)
    var that = this    
    var item = 'IndustryList[' + e.currentTarget.dataset.index + '].check'
    var follow = e.currentTarget.dataset.data.check == 0 ? 1 : 0;
    that.setData({
      [item]: follow
    })
  }

  /*

  for (var i = 0; i < that.data.TradeList.length; i++) {  缓存到本地
    if (that.data.TradeList[i].check == 1) {
      CheckedIndustry[j] = that.data.IndustryList[i]
        j++
      }
    }
    wx.setStorage({
      key: 'MyIndustrys',
      data: CheckedTrade,
    })
  } 
  */ 
  
})

