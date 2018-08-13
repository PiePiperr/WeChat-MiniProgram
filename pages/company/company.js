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

      '蚂蚁金服' , '阿里云' ,  '滴滴出行' ,  '陆金所' ,  '美团点评集团' , '今日头条', '腾讯娱乐' ,"大疆无人机","京东金融",
      "快手","菜鸟网络"
      //,"比特大陆","京东物流","口碑网","链家网","借贷宝","满帮集团","微众银行","微医","WiFi万能钥匙","联影医疗","蔚来汽车","优必选科技","WeWork China","威马汽车","柔宇科技","魅族","商汤科技","房多多","瓜子二手车","喜马拉雅","蘑菇街","斗鱼TV","小鹏汽车","易商红木","VIPKID大米科技","同程旅游","云从科技","银联商务","奇点汽车","自如网","首汽租车","猫眼电影","汇通达","一下科技"

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