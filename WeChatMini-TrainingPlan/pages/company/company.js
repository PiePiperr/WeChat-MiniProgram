// pages/company/company.js
Page({
  data: {
    nextPage: 2,
    keyWord: '',
    loadingIconHidden: true,
    noResultHidden: true,
    inputText: '',
    myCompany:[],
    SearchResult:'',
    comp_List:true,
    searResult:false,
    search:true,
    // companyList:[
    //   { id: 1, name: '蚂蚁金服' }, { id: 2, name: '阿里云' }, { id: 3, name: '滴滴出行' }, { id: 4, name: '陆金所' }, { id: 5, name: '美团点评集团' }, { id: 6, name: '今日头条' }, { id: 7, name: '腾讯娱乐' }


    // ],
    
    companyList: [

     '蚂蚁金服' , '阿里云' ,  '滴滴出行' ,  '陆金所' ,  '美团点评集团' , '今日头条', '腾讯娱乐' 


    ]
    
    
    ,
  },

 
  onLoad: function (e) {
    
  
  },
  bindfocus:function(e){
    this.setData({
    
      comp_List: false
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputText: e.detail.value,
      
   
    })
  },
  searchCompany: function (e) {
    var that = this

    var inputText = e.detail.value
    if (inputText == '') {
      return
    }
   
    that.setData({
      search: false,
      keyWord: e.detail.value,
      searchResult:'',
      noResultHidden: true
    })
    that.getSearchResult()
  },
  clcSearchCompany:function(e){
    this.setData({
      comp_List: true,
      searResult: false,
      search: true,
      inputText: '',
      
      noResultHidden: true,
    
    })
  },


  getSearchResult: function () {
    var that = this
    var index = that.data.companyList.indexOf(that.data.keyWord)

    console.log(that.data.keyWord)
    if (index>=0){
      that.setData({
        searResult:true,
        comp_List:false,
        searchResult:that.data.keyWord
      })

    }

else{
      that.setData({
        noResultHidden: false
      })
}
   
  },
  chooseResult:function (e){
    that.setData({
      searResult: true,
      comp_List: false,
      searchResult: that.data.keyWord
    })
  },
  onReachBottom: function (e) {
    var that = this
    if (that.data.companyList.length == 0) {
      return
    }
    that.setData({
      loadingIconHidden: false
    })
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/' +'RVCQS9UR56' + '/search',
      data: {
        uid: wx.getStorageSync('openid'),
        keyword: that.data.keyWord,
        st: that.data.nextPage
      },
      success: function (e) {
        if (e.data.data.items.length == 0) {
          wx.showToast({
            title: '无更多内容',
            image: '/icon/nomore.png',
            duration: 1000
          })
          that.setData({
            loadingIconHidden: true
          })
        }
        else {
          setTimeout(function () {
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
  choose:function(e){
    console.log(e)
    var that = this

    var index = that.data.myCompany.indexOf(e.currentTarget.dataset.id);
      if (index >= 0) {
        wx.showModal({
          title: '提示',
          content: '您已选择该公司！',
        })
      }
    
   
  

else{

    that.setData({
      myCompany : that.data.myCompany.concat(e.currentTarget.dataset.id)


    })
}
    
   
  },
  delete:function(e){
    console.log(e.currentTarget.dataset.index)
    var that = this
   that.data.myCompany.splice(e.currentTarget.dataset.index,1)

    that.setData({
      myCompany: that.data.myCompany
    })
    
  }
})