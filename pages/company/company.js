// pages/company/company.js
Page({
  data: {
    nextPage: 2,
    keyWord: '',
    loadingIconHidden: true,
    noResultHidden: true,
    inputText: '',
    myCompany: [],
    SearchResult: '',
    comp_List: true,
    searResult: false,
    search: true,
    companyList: ['蚂蚁金服', '阿里云', '滴滴出行', '陆金所', '美团点评集团', '今日头条', '腾讯娱乐', "大疆无人机", "京东金融", "快手", "菜鸟网络"],
  },


  onLoad: function(e) {
    var that = this
    wx.getStorage({
      key: 'MyCompany',
      success: function(res) {
        console.log(res.data[0])
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < that.data.companyList.length; j++) {
            if (res.data[i] == that.data.companyList[j]) {
              that.setData({
                myCompany: res.data
              })
            }
          }
        }
      },
    })
  },

  save: function(e) {
    var that = this
    wx.setStorage({
      key: 'MyCompany',
      data: that.data.myCompany
    })
    wx.switchTab({
      url: '../user/user',
    })
  },

  bindfocus: function(e) {
    this.setData({

      comp_List: false
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputText: e.detail.value,


    })
  },

  searchCompany: function(e) {
    var that = this
    var inputText = e.detail.value
    if (inputText == '') {
      return
    }
    that.setData({
      search: false,
      keyWord: e.detail.value,
      searchResult: '',
      noResultHidden: true
    })
    that.getSearchResult()
  },

  clcSearchCompany: function(e) {
    this.setData({
      comp_List: true,
      searResult: false,
      search: true,
      inputText: '',
      noResultHidden: true,

    })
  },

  getSearchResult: function() {
    var that = this
    var index = that.data.companyList.indexOf(that.data.keyWord)

    console.log(that.data.keyWord)
    if (index >= 0) {
      that.setData({
        searResult: true,
        comp_List: false,
        searchResult: that.data.keyWord
      })
    } else {
      that.setData({
        noResultHidden: false
      })
    }
  },

  chooseResult: function(e) {
    that.setData({
      searResult: true,
      comp_List: false,
      searchResult: that.data.keyWord
    })
  },

  onReachBottom: function(e) {},

  choose: function(e) {
    var that = this
    console.log(that.data.myCompany)
    var index = that.data.myCompany.indexOf(e.currentTarget.dataset.id);
    if (index >= 0) {
      wx.showModal({
        title: '提示',
        content: '您已选择该公司！',
      })
    } else {
      that.setData({
        myCompany: that.data.myCompany.concat(e.currentTarget.dataset.id)
      })
    }
  },


  delete: function(e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    that.data.myCompany.splice(e.currentTarget.dataset.index, 1)
    that.setData({
      myCompany: that.data.myCompany
    })

  }
})