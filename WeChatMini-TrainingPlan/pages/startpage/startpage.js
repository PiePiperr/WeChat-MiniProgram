Page({
  data: {
    MyTrade: [],
    TradeList: [
      {
        id: 0,
        name: '区块链',
        check: 0
      }, {
        id: 1,
        name: '人工智能',
        check: 0
      }, {
        id: 2,
        name: '物联网',
        check: 0
      }, {
        id: 3,
        name: '大数据',
        check: 0
      }, {
        id: 4,
        name: '教育',
        check: 0
      }, {
        id: 5,
        name: '金融',
        check: 0
      }, {
        id: 6,
        name: '健康医疗',
        check: 0
      },{
        id: 7,
        name: '无人机',
        check: 0
      },{
        id: 8,
        name: '机器人',
        check: 0
      },{
        id: 9,
        name: 'VR/AR',
        check: 0
      },{
        id: 10,
        name: '零售行业',
        check: 0
      },{
        id: 11,
        name: '企业服务',
        check: 0
      },{
        id: 12,
        name: 'SAAS',
        check: 0
      },{
        id: 13,
        name: '电子商务',
        check: 0
      },{
        id: 14,
        name: '汽车交通',
        check: 0
      },{
        id: 15,
        name: '文化娱乐',
        check: 0
      },{
        id: 16,
        name: '房产家居',
        check: 0
      },{
        id: 17,
        name: '游戏/电竞',
        check: 0
      },{
        id: 18,
        name: '广告营销',
        check: 0
      },{
        id: 19,
        name: '旅游',
        check: 0
      },{
        id: 20,
        name: '体育',
        check: 0
      },{
        id: 21,
        name: '硬件',
        check: 0
      },{
        id: 22,
        name: '社交',
        check: 0
      },{
        id: 23,
        name: '生活服务',
        check: 0
      },{
        id: 24,
        name: '餐饮业',
        check: 0
      },{
        id: 25,
        name: '工具软件',
        check: 0
      },{
        id: 26,
        name: '物流',
        check: 0
      },{
        id: 27,
        name: '农业',
        check: 0
      },{
        id: 28,
        name: '生产制造',
        check: 0
      },{
        id: 29,
        name: '能源矿产',
        check: 0
      },{
        id: 30,
        name: '材料',
        check: 0
      },{
        id: 31,
        name: '环保产业',
        check: 0
      },{
        id: 32,
        name: '公共事业',
        check: 0
      },{
        id: 33,
        name: '消费升级',
        check: 0
      }
    ]
  },

  onLoad: function () {
  },
  
  skip: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },

  save: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  
  check: function (e) {
    //console.log(e)
    var that = this
    if (e.currentTarget.dataset.data.check == 0) {
      that.setData({
        MyTrade: that.data.MyTrade.concat(e.currentTarget.dataset.data),
      })
    } else {
      // console.log(e.currentTarget.dataset.data)
      //这里要找到该元素在MyTrade 的下表,并将他删除


    }
    var item = 'TradeList[' + e.currentTarget.dataset.index + '].check'
    var follow = e.currentTarget.dataset.data.check == 0 ? 1 : 0;
    that.setData({
      [item]: follow
    })
  }

})