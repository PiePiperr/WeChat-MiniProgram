// pages/entrepreneur/entrepreneur.js
Page({
  data: {
    nextPage: 2,
    keyWord: '',
    loadingIconHidden: true,
    noResultHidden: true,
    inputText: '',
    myentre: [],
    SearchResult: '',
    entre_List: true,
    searResult: false,
    search: true,
    EntreList: ['吴家', '阎焱 ', '周全', '赵令欢', '王刚 ', '张帆', '林栋梁 '],
  },

  onLoad: function(e) {
    var that = this
    wx.getStorage({
      key: 'MyEntre',
      success: function(res) {
        console.log(res.data[0])
        for (var i = 0; i < res.data.length; i++) {
          for (var j = 0; j < that.data.EntreList.length; j++) {
            if (res.data[i] == that.data.EntreList[j]) {
              that.setData({
                myentre: res.data
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
      key: 'MyEntre',
      data: that.data.myentre
    })
    wx.switchTab({
      url: '../user/user',
    })
  },

  bindfocus: function(e) {
    this.setData({

      entre_List: false
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputText: e.detail.value,


    })
  },
  Search_Entre: function(e) {
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
  clcSearch_entre: function(e) {
    this.setData({
      entre_List: true,
      searResult: false,
      search: true,
      inputText: '',

      noResultHidden: true,

    })
  },


  getSearchResult: function() {
    var that = this
    var index = that.data.EntreList.indexOf(that.data.keyWord)

    console.log(that.data.keyWord)
    if (index >= 0) {
      that.setData({
        searResult: true,
        entre_List: false,
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
      entre_List: false,
      searchResult: that.data.keyWord
    })
  },
  onReachBottom: function(e) {
    var that = this
    if (that.data.EntreList.length == 0) {
      return
    }
    that.setData({
      loadingIconHidden: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/' + 'RVCQS9UR56' + '/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: that.data.keyWord,
        st: that.data.nextPage
      },
      success: function(e) {
        if (e.data.data.items.length == 0) {
          wx.showToast({
            title: '无更多内容',
            image: '/icon/nomore.png',
            duration: 1000
          })
          that.setData({
            loadingIconHidden: true
          })
        } else {
          setTimeout(function() {
            that.setData({
              newsList: that.data.newsList.concat(e.data.data.items),
              nextPage: that.data.nextPage + 1,
              loadingIconHidden: true
            })
          }, 800)
        }
      }
    })
  },
  choose: function(e) {
    console.log(e)
    var that = this

    var index = that.data.myentre.indexOf(e.currentTarget.dataset.id);
    if (index >= 0) {
      wx.showModal({
        title: '提示',
        content: '您已关注该企业家！',
      })
    } else {

      that.setData({
        myentre: that.data.myentre.concat(e.currentTarget.dataset.id)


      })
    }


  },
  delete: function(e) {
    console.log(e.currentTarget.dataset.index)
    var that = this
    that.data.myentre.splice(e.currentTarget.dataset.index, 1)

    that.setData({
      myentre: that.data.myentre
    })

  }
})