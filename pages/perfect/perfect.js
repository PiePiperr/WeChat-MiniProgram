// pages/perfect/perfect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
phd: false,
phd1: false,
org:'',
index:0,
index_:0,

section:[],
    
    

  //array: ['12','123'],
    // objectArray: [
    //   {
    //     id: 0,
    //     name: '产品组'
    //   },
    //   {
    //     id: 1,
    //     name: '工程组'
    //   },
    //   {
    //     id: 2,
    //     name: '营销组'
    //   },
      
    // ],

   array1: ['产品经理', '小程序开发', 'UI设计','后端开发','网站运维','视频剪辑'],
    // objectArray: [
    //   {
    //     id: 0,
    //     name: '产品经理'
    //   },
    //   {
    //     id: 1,
    //     name: '小程序开发'
    //   },
    //   {
    //     id: 2,
    //     name: 'UI设计'
    //   },
    //   {
    //     id: 1,
    //     name: '后端开发'
    //   },
    //   {
    //     id: 2,
    //     name: '网站运维'
    //   },
    //   {
    //     id: 2,
    //     name: '视频剪辑'
    //   },

    // ],
   

  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var array = new Array
   
    var j = 0
    wx.request({
      url: 'https://luxq.botbrain.ai/org/RVCQS9UR56/info',
      data: {
        osKey: 'RVCQS9UR56'
      },
      success: function (res) {
        console.log(res.data.data.posts)
        that.setData({
          org : res.data.data.posts
        })

        for (var i = 0; i < that.data.org.length; i++) {
          
         array[j] = that.data.org[i].name
                   j++
           

          
        }
        
        
    
       // console.log(section[0])
      
      }
    })
  },

  listenerPickerSelected: function (e) {
    //改变index值，通过setData()方法重绘界面
    console.log(e)
    this.setData({
      index: e.detail.value,
      phd:true
      
    });
  },
  listenerPickerSelected1: function (e) {
    //改变index值，通过setData()方法重绘界面
    console.log(e)
    this.setData({
      index_: e.detail.value,
      phd1: true

    });
  },
  next:function(e){
    console.log(e)
    wx.switchTab({
      url: '/pages/user/user'
    })
    var that = this
    that.setData({
      remphone: 'show'
    })
  }
})