// pages/entre/entre.js
Page({
  data: {
    nextPage: 2,
    keyWord: '',
    loadingIconHidden: true,
    noResultHidden: true,
    inputText: '',
    entre_List: true,
    search: true,
    EntreList: [],
    myentre_name: [],
    myentre_id: []
  },


  onLoad: function(e) {
    let that = this
    wx.getStorage({
      key: 'MyEntrepreneur',
      success: function(res) {
        console.log(res.data)
        that.setData({
          myentre_name: res.data.name,
          myentre_id: res.data.id
        })
      },
    })
  },


  save: function(e) {
    let that = this
    let id = that.data.myentre_id
    let name = that.data.myentre_name
    wx.setStorage({
      key: 'MyEntrepreneur',
      data: {
        id,
        name
      }
    })
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/updateEntrepreneur',
      data: {
        uid: wx.getStorageSync('uid'),
        id: id.toString()
      },
      success: function(e) {
        console.log(e)
        wx.navigateBack({})
      },
      fail: function () {
        wx.navigateBack({})
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  bindKeyInput: function(e) {
    let that = this
    that.setData({
      inputText: e.detail.value,
    })
    wx.request({
      url: 'https://wxapp.proflu.cn/vipSystem/wxapp/personal/queryEntrepreneur',
      data: {
        entrepreneur: e.detail.value
      },
      success: function(e) {
        that.setData({
          EntreList: e.data
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


  choose: function(e) {
    let that = this
    let index = that.data.myentre_name.indexOf(e.currentTarget.dataset.id.entrepreneur);
    if (index >= 0) {
      wx.showModal({
        title: '提示',
        content: '您已选择该企业家！',
      })
    } else {
      that.setData({
        myentre_name: that.data.myentre_name.concat(e.currentTarget.dataset.id.entrepreneur),
        myentre_id: that.data.myentre_id.concat(e.currentTarget.dataset.id.id)
      })
    }
  },

  delete: function(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this
    that.data.myentre_name.splice(e.currentTarget.dataset.index, 1)
    that.data.myentre_id.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      myentre_name: that.data.myentre_name,
      myentre_id: that.data.myentre_id
    })
  }
})