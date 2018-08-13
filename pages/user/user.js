var app = getApp();
Page({
  data: {
    buttonStatus: 'hide',
    info: 'hide',
    userInfo: '',
    uid: '',
    openid: '',
    varify: '',
    sign: '',
    imageUrl: '',
    section:true,
    bindphone:false
  },

  onLoad: function () {
    var that = this
    //获取openid
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://luxq.botbrain.ai/wx/login', //https://bkd.botbrain.ai/wx/auth/login.json
            method: 'Post',//http://localhost:8080/wx/login
            data: {
              // appid: 'RVCQS9UR56',
              jsCode: res.code,
              // preview: false
            },
            success: function (res) {
              console.log('+++++++++++++++++++')
              console.log(res)  //1
              that.setData({
                openid: res.data.data.openid,
                uid: res.data.data.uid,
                sign: res.data.data.sign,
              })

              wx.getUserInfo({
                success: function (res) {
                  console.log('---------------------')
                  console.log(res) //2
                  wx.request({
                    url: 'https://luxq.botbrain.ai/user/info',
                    data: {
                      sign: that.data.sign,
                      uid: that.data.uid,
                      //session_key: that.data.sessionkey,
                      openid: that.data.openid,
                      user_name: res.userInfo.nickName,
                      icon: res.userInfo.avatarUrl,
                      gender: res.userInfo.gender,
                      //sign: res.data.data.sign,

                    },
                    method: 'Post',
                    success: function (res) {
                      //console.log(that.data.sessionkey)
                      console.log(res)   //3
                      that.setData({
                        sign: res.data.data.sign,
                      })
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })


  },

  getUserInfo: function (e) {
    console.log(e)
    app.aldstat.sendEvent('个人中心', '授权登录')
    var that = this
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo,
    })

    that.setData({
      buttonStatus: 'hide',
      info: 'show',
      userInfo: e.detail.userInfo,
      imageUrl: e.detail.userInfo.avatarUrl
    })


  },

  edit_industry: function (e) {
    wx.navigateTo({
      url: '/pages/industry/industry'
    })
  },

  edit_company: function (e) {
    wx.navigateTo({
      url: '/pages/company/company'
    })
  },

  edit_entrepreneur: function (e) {
    wx.navigateTo({
      url: '/pages/entrepreneur/entrepreneur'
    })
  },
  
  //绑定手机
  bindphone: function (e) {
    var that = this
    wx.navigateTo({
      url: '/pages/phone/phone?uid='+that.data.uid+"&sign="+that.data.sign
    })
  },
  //查看我的收藏
  linkCollect: function (e) {
    app.aldstat.sendEvent('查看我的收藏', '查看我的收藏')
    wx.navigateTo({
      url: '/pages/user_collect/user_collect'
    })
  },
  //查看我的话题
  linkTopic: function (e) {
    app.aldstat.sendEvent('查看我的话题', '查看我的话题')
    wx.navigateTo({
      url: '/pages/user_topic/user_topic'
    })
  },
  //查看我的作品
  linkWork: function (e) {
    app.aldstat.sendEvent('查看我的作品', '查看我的作品')
    wx.navigateTo({
      url: '/pages/user_work/user_work'
    })
  },
  //意见反馈
  feedBack: function (e) {
    app.aldstat.sendEvent('意见反馈', '意见反馈')
    wx.navigateTo({
      url: '/pages/user_feedback/user_feedback'
    })
  },

  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          info: 'show',
          buttonStatus: 'hide',
          userInfo: res.data
        })
      },
      fail: function () {
        that.setData({
          buttonStatus: 'show',
          info: 'hide'
        })
      }
    })
  }
})
