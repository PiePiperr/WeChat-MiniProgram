Page({
  data: {
    inputText: '',
    companyList: [],
    myCompany_name: [],
    myCompany_id: [],
    hot_com: ['今日头条', '蚂蚁金服', '阿里云', '滴滴出行', '陆金所', '腾讯音乐娱乐集团', '大疆无人机', '京东数科', '菜鸟网络', '快手']
  },

  onLoad: function(e) {
    let that = this
    wx.getStorage({
      key: 'MyCompany',
      success: function(res) {
        console.log(res.data)
        that.setData({
          myCompany_name: res.data.name,
          myCompany_id: res.data.id
        })
      },
    })
  },

  bindKeyInput: function(e) {
    let that = this
    that.setData({
      inputText: e.detail.value,
    })
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/queryCompany',
      data: {
        company: e.detail.value
      },
      success: function(e) {
        console.log(e)
        that.setData({
          companyList: e.data
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 200
        })
      }
    })
  },

  hot_search: function(e) {
    let that = this
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/queryCompany',
      data: {
        company: e.currentTarget.dataset.com
      },
      success: function(e) {
        console.log(e)
        that.setData({
          companyList: e.data
        })
      },
      fail: function(e) {
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 200
        })
      }
    })
  },

  save: function(e) {
    var that = this
    var id = that.data.myCompany_id
    var name = that.data.myCompany_name
    wx.setStorage({
      key: 'MyCompany',
      data: {
        id,
        name
      }
    })
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/updateCompany',
      data: {
        uid: wx.getStorageSync('uid'),
        id: id.toString()
      },
      success: function(e) {
        console.log(e)
        wx.navigateBack({})
      },
      fail: function() {
        wx.navigateBack({})
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  choose: function(e) {
    let that = this
    let index = that.data.myCompany_name.indexOf(e.currentTarget.dataset.id.company);
    if (index >= 0) {
      wx.showModal({
        title: '提示',
        content: '您已选择该公司！',
      })
    } else {
      let id = that.data.myCompany_id
      let name = that.data.myCompany_name
      that.setData({
        myCompany_id: id.concat(e.currentTarget.dataset.id.id),
        myCompany_name: name.concat(e.currentTarget.dataset.id.company)
      })
      console.log(that.data.myCompany_id)
      wx.setStorage({
        key: 'MyCompany',
        data: {
          id: that.data.myCompany_id,
          name: that.data.myCompany_name
        }
      })
      wx.request({
        url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/updateCompany',
        data: {
          uid: wx.getStorageSync('uid'),
          id: id.toString()
        },
        success: function(e) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  },

  delete: function(e) {
    let that = this
    let name = that.data.myCompany_name
    let id = that.data.myCompany_id
    name.splice(e.currentTarget.dataset.index, 1)
    id.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      myCompany_name: name,
      myCompany_id: id
    })
  },


  linkDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../detail/chollima_detail?com_id=' + e.currentTarget.dataset.com_id
    })
  }
})