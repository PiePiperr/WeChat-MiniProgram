// pages/phone/phone.js
function countdown(that) {
  var second = that.data.countdown_time
  if (second == 0) {
    //console.log("001");
    // console.log("Time Out...");  
    that.setData({
      // second: "Time Out..."  

      showtime1: true,
      showtime2: false,
      reg_hqyzm: "重发验证码",
      countdown_time: 10,
    });
    //console.log("002");
    return;
  }
  //console.log("003");
  var time = setTimeout(function () {
    that.setData({
      countdown_time: second - 1
    });
    countdown(that);
  }
    , 1000)
}  
Page({

  data: {
  bindphone:'show',
  submit:'hide',
  inputtext:'',
 tip:'hide',
 mobile:'',
 varify:'',
 value:'',



 showtime1: true,
 showtime2: false,
 reg_hqyzm: "获取验证码",
 countdown_time: 10,  
  },


  onLoad: function (e) {
    console.log(e)
  
  },
  
  
  setModal: function (e) {
   // console.log(e)
   

    
   

  },
  phone:function(e){
    //console.log(e)
    var inputtext = e.detail.value
    if (inputtext.length <11 ) {
      wx.showModal({ 
        content: '请输入正确的手机号',
      })
    }else{
     this.setData({
        mobile : e.detail.value
     })

    }
   
    
  },
  value:function(e){
    console.log(e)
    var that =this
    that.setData({
      value:e.detail.value
    })
  },
  next:function(e){
    var that =this
    if (that.data.value == that.data.varify){
      console.log('验证码正确')
      wx.navigateTo({
        url: '/pages/perfect/perfect'
      })

    }else{
      console.log('验证码不正确')
      wx.navigateTo({
        url: '/pages/perfect/perfect'
      })
    }
    
  },










  reg_yanzhengma_huoqu: function () {
    //console.log("004");
    var that =this
    var mobile = this.mobile
    that.setData({
      showtime1: false,
      showtime2: true,

    });

    countdown(this);
    // wxTimer.start(this);  
    wx.request({
      url: 'https://luxq.botbrain.ai/user/varify',
      data: {
        osKey: 'RVCQS9UR56',
        sign: that.data.sign,
        uid: that.data.uid,
        mobile: '13519109018',
        type: 'bind'
      },
      success: function (e) {
        console.log(e)
        that.setData({
          varify:e.data
        })

      }
    })

  }


})