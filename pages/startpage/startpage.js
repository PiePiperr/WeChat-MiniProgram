Page({
  data: {
    item:'',

    IndustryList: [
      { id: 0, name: '电子商务', check: 0 },
      { id: 1, name: '医疗健康', check: 0 },
      { id: 2, name: '工具软件', check: 0 },
      { id: 3, name: '企业服务', check: 0 },
      { id: 4, name: '汽车交通', check: 0 },
      { id: 5, name: '硬件', check: 0 },
      { id: 6, name: '教育', check: 0 },
      { id: 7, name: '文化娱乐', check: 0 },
      { id: 8, name: '金融', check: 0 },
      { id: 9, name: '体育运动', check: 0 },
      { id: 10, name: '物流', check: 0 },
      { id: 11, name: '本地生活', check: 0 },
      { id: 12, name: '旅游', check: 0 },
      { id: 13, name: '房产服务', check: 0 },
      { id: 14, name: '广告营销', check: 0 },
      { id: 15, name: '游戏', check: 0 },
      { id: 16, name: '社交网络', check: 0 },
      { id: 17, name: '农业', check: 0 },
    ]
  },

  onLoad: function () {
  },
  
  check: function (e) {
    console.log(e)
    var that = this
    var item = 'IndustryList[' + e.currentTarget.dataset.index + '].check'
    var follow = e.currentTarget.dataset.data.check == 0 ? 1 : 0;

    that.setData({
      [item]: follow
    })
  },

  checkall: function (e) {
    var that = this
    var a = that.data.IndustryList
    for (var i = 0; i < a.length; i++) {
      a[i].check = 1
    }
    that.setData({
      IndustryList: a
    })
  },


  skip: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },

  save: function (e) {
    var that = this
    var j=0
    var CheckedIndustry= new Array()
    // for (var i = 0; i < that.data.IndustryList.length; i++){
    //    if (that.data.IndustryList[k].check == 1)
    //     {k++
    //     that.setData({
    //       b: that.data.IndustryList[k]
    //     })
    //     }   
    // }
    // console.log(that.data.b)
    for (var i = 0; i < that.data.IndustryList.length; i++) {
      if (that.data.IndustryList[i].check == 1) {
        CheckedIndustry[j] = that.data.IndustryList[i]
        j++
      }
    }

    wx.setStorage({
      key: 'MyIndustry',
      data: CheckedIndustry,
    })
    
    wx.switchTab({
      url: '../index/index',
    })
  },
  
  


})