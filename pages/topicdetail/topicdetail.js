var app = getApp();
Page({

  data: {
    iid: '',
    list: '',
    item: '',
    loading: true,
  },

  onLoad: function (e) {
    var that = this
    that.setData({
      iid: e.iid
    })

    //请求话题介绍
    wx.request({
      url: 'https://cloud.botbrain.ai/meta/v1/RVCQS9UR56/topic/detail',
      data: {
        uid: wx.getStorageSync('openid'),
        guid: wx.getStorageSync('openid'),
        id: that.data.iid,
      },
      success: function (e) {
        console.log(e)
        that.setData({
          collected: e.data.data.collected,
          topic_name: e.data.data.topic_name,
          desc: e.data.data.desc,
          icon: e.data.data.icon,
          obj: e.data.data
        })
      }
    }),
      //请求话题下的新闻列表
      wx.request({
        url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/topic',
        data: {
          uid: wx.getStorageSync('openid'),
          guid: wx.getStorageSync('openid'),
          topic_id: that.data.iid,
        },
        success: function (e) {
          //console.log(e)
          that.setData({
            list: e.data.data.items
          })
        }
      })
  },
  subTopic: function (e) {
    //console.log(e)
    this.setData({
      topic_id: e.currentTarget.dataset.iid
    })
    var that = this,
      idx = e.currentTarget.dataset.idx,
      follow = e.currentTarget.dataset.follow;
    var item = 'obj.collected'
    //console.log(item);
    var collected = follow == 0 ? 1 : 0;
    that.setData({
      [item]: collected
    })
    wx.request({
      url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/subtopic',
      data: {
        uid: wx.getStorageSync('openid'),
        guid: wx.getStorageSync('openid'),
        dt: Date.parse(new Date()) / 1000,
        plt: 'wechat',
        topic_id: that.data.topic_id,
        type: collected
      },
      success: function (e) {
        //console.log('请求关注成功')
      }
    })
  },


  //查看新闻详情
  linkDetail: function (e) {
    //console.log(e)
    wx.navigateTo({
      url: '/pages/index_detail/index_detail?iid=' + e.currentTarget.dataset.iid
    })
  }

})