// pages/edit_business/edit_business.js

Page({
  data: {    
    items: [
      { id: 1, name: '区块链' }, 
      { id: 2, name: '人工智能' }, 
      { id: 3, name: '物联网' }, 
      { id: 4, name: '大数据' }, 
      { id: 5, name: '消费升级' }, 
      { id: 6, name: '教育' }, 
      { id: 7, name: '金融' }
    ],        
  },


 /*
  onLoad: function (){
    var that = this
    that.data.items[0].clicked = true;
    var itemsList = that.data.items  //获取Json数组
    that.setData({
      list: that.data.list,
    })//默认list数组的第一个对象是选中的
  }

  
     
    save: function (e){  //保存
      var that = this
      wx.request({
        url: 'https://xxxxxxxxxxxxxxx',
        data: {
        

      },
        
        success: function (e) {
        //console.log(e)
          wx.showToast({
            title: '保存成功',
            icon: 'success',   //images
            duration: 2000
          })

          wx.setStorage({  //缓存
            key: "key",   //name
            data: "value"
          })

          wx.navigateTo({  //保存成功,跳转到培养计划页面
            url: '/pages/logs/logs'
          })
        }

        fail: function(e) {
          wx.showToast({
            title: '保存失败',
            icon: 'fail',
            duration: 2000
          })
        }

      })
      
     
   }

   */
  
  
})

