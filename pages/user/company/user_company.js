Page({
  data: {},
  onShow: function(e) {
    let that = this
    wx.getStorage({
      key: 'MyCompany',
      success: function(res) {
        that.setData({
          MyCompany: res.data
        })
      }
    })
  },
  search: function (e) {
    wx.navigateTo({
      url: '../../chollima/search/chollima_search'
    })
  },
  linkDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: '../../chollima/detail/chollima_detail?com_id=' + e.currentTarget.dataset.com_id
    })
  },
  unfollow: function(e) {
    let that = this
    let name = that.data.MyCompany.name
    let id = that.data.MyCompany.id
    wx.showModal({
      content: '是否取消关注',
      confirmText: '是的',
      cancelText: '再想想',
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          name.splice(e.currentTarget.dataset.index, 1)
          id.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            MyCompany: {
              id,
              name
            }
          })
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
            fail: function() {
              wx.navigateBack({})
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      }
    })
  },
})