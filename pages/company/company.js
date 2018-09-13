// pages/company/company.js
Page({
  data: {
    nextPage: 2,
    keyWord: '',
    loadingIconHidden: true,
    noResultHidden: true,
    inputText: '',
    comp_List: true,
    search: true,
    companyList: [],
    myCompany_name: [],
    myCompany_id: []
  },


  onLoad: function(e) {
    var that = this
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


  save: function(e) {
    var that = this
    var id = that.data.myCompany_id
    var name = that.data.myCompany_name
    console.log(name)
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
        wx.switchTab({
          url: '../user/user',
          success: function(e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onShow();
          }
        })
      },
      fail: function() {
        wx.switchTab({
          url: '../user/user'
        })
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },

  bindKeyInput: function(e) {
    var that = this
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
        // if (e.data == null){
        // that.setData({
        //   companyList: null
        // })}
        // else{
        //   that.setData({
        //     companyList: e.data
        //   })
        // }
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
    var that = this
    console.log(that.data.myCompany_name)
    var index = that.data.myCompany_name.indexOf(e.currentTarget.dataset.id.company);
    if (index >= 0) {
      wx.showModal({
        title: '提示',
        content: '您已选择该公司！',
      })
    } else {
      that.setData({
        myCompany_name: that.data.myCompany_name.concat(e.currentTarget.dataset.id.company),
        myCompany_id: that.data.myCompany_id.concat(e.currentTarget.dataset.id.id)
      })
    }
  },

  delete: function(e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    that.data.myCompany_name.splice(e.currentTarget.dataset.index, 1)
    that.data.myCompany_id.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      myCompany_name: that.data.myCompany_name,
      myCompany_id: that.data.myCompany_id
    })
  }
})