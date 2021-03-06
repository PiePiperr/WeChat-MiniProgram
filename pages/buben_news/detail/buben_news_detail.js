let app = getApp();
const appData = getApp().globalData
const api = require("../../../utils/getTok.js")
Page({
  data: {
    iid: '',
    algs: [],
    content: '',
    title: '',
    relatedlist: '',
    publish: '',
    creator: '',
    userInfo: '',
    collectStatus: 0,
    likeStatus: 0,
    buttonStatus: 'hide',
    collected: true,
    liked: true,
    recom: true,
    info: 'hide',
    userInfo: '',
    imagList: '',
    url: '',
    source: '',
    img: '',
    summary: '',
    text: '',
    access_token: '',
    //alg_group:'',
    src: '',
    contentList: '',
    stop: true,
    ing: true,
    listen: false,
    hidden: true,
    currentIndex: 0, //当前自然段索引
    maxIndex: 0
  },

  onLoad: function(e) {
    let that = this
    console.log(e)
    that.setData({
      iid: e.iid,
      // algs: e.algs,
      // alg_group:e.alg_group
      currentIndex: 0
    })
    api.getToken()
    //console.log(that.data.iid)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //请求新闻详情页
    wx.request({
      url: 'https://bkd.botbrain.ai/view/v1/RVCQS9UR56/article/' + that.data.iid + '.json',
      data: {
        user_is_up: true
      },
      success: function(e) {
        console.log(e)
        let imgList = new Array()
        let contentList = new Array()
        let j = 0
        let k = 1
        that.setData({
          content: JSON.parse(e.data.article.content),
          title: e.data.article.title,
          publish: e.data.article.pubTimeStr,
          creator: e.data.article.creator,
          recom: false,
          source: e.data.article.soureName,
          img: e.data.article.imgs,
          summary: e.data.article.summary,
        })
        let url = that.data.content[0].url
        contentList[0] = that.data.title
        for (let i = 0; i < that.data.content.length; i++) {
          if (that.data.content[i].type == 'img') {
            imgList[j] = that.data.content[i].url
            j++
          }
          if (that.data.content[i].type == 'paragraphs') {
            contentList[k] = that.data.content[i].content
            k++
          }
          that.setData({
            imageList: imgList, //修改
            contentLists: contentList,
            maxIndex: contentList.length - 1,
            text: contentList.join()
          })
        }
        wx.showToast({
          title: '加载成功',
          icon: 'success'
        })
      }
    })

    //相关推荐
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/related/',
      data: {
        iid: that.data.iid,
        uid: wx.getStorageSync('openid'),
        ct: 3
      },
      success: function(e) {
        //console.log(e)
        that.setData({
          relatedlist: e.data.data.items
        })
      }
    })
    //文章是否收藏
    wx.request({
      url: 'https://cloud.botbrain.ai/rec/v1/RVCQS9UR56/collect',
      data: {
        uid: wx.getStorageSync('openid')
      },
      success: function(e) {
        console.log(e)
        for (let i = 0; i < e.data.data.items.length; i++) {
          if (e.data.data.items[i].iid == that.data.iid) {
            that.setData({
              collectStatus: 1,
              collected: false
            })
          }
        }
      },
    })
    //console.log(that.data.content)
  },

  collect: function() {
    // app.aldstat.sendEvent('新闻收藏', '新闻收藏')
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(e) {
        wx.request({
          url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/collect',
          data: {
            uid: wx.getStorageSync('openid'),
            guid: wx.getStorageSync('openid'),
            dt: Date.parse(new Date()) / 1000,
            plt: 'wechat',
            iid: that.data.iid,
            type: that.data.collectStatus
          },
          success: function(e) {
            //console.log(e)
            if (that.data.collectStatus == 0) {
              wx.showToast({
                title: '收藏成功',
                duration: 1000
              })
              that.setData({
                collectStatus: 1,
                collected: false,
                collectColor: 'red'
              })
            } else {
              wx.showToast({
                title: '取消收藏',
                duration: 1000
              })
              that.setData({
                collectStatus: 0,
                collected: true,
                collectColor: '#2a2a2a'
              })
            }
          }
        })
      },
      fail: function() {
        wx.showModal({
          title: '提示',
          content: '登录之后，才可享用此功能！',
          confirmText: '去登陆',
          success: function(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/user/user'
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },


  onHide: function() {
    wx.stopBackgroundAudio()
  },
  /**
   * 生成分享图
   */
  share: function() {
    let that = this
    wx.showActionSheet({
      itemList: ['分享给朋友', '生成卡片保存分享'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          //调用分享
        } else {
          that.aldminishare()
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },



  aldminishare: function(e) {
    console.log(e)
    let page = this;
    let url = page['__route__'];
    let data = new Array
    data = {
      'article_title': this.data.title,
      'article_time': this.data.publish,
      'article_brand': this.data.source,
      'article_content': this.data.text,
      'template_key': "efdf56345c95a82a49fd82c0cb492c0e"
    }
    // data = e.currentTarget.dataset
    data['path'] = url;
    wx.showToast({
      title: '分享生成中...',
      icon: 'loading',
      duration: 999999
    })
    wx.request({
      method: 'post',
      url: 'https://shareapi.aldwx.com/Main/action/Template/Template/applet_htmlpng',
      data: data,
      success: function(data) {
        console.log(data)
        if (data.data.code === 200) {
          wx.previewImage({
            urls: [data.data.data]
          })
        }
        // 关闭loading
        wx.hideLoading()
      },
      complete: function() {
        wx.hideLoading()
      },
      fail: function() {
        wx.hideLoading();
      }
    })
  },

  /**
   * 保存到相册
   */

  listen: function(e) {
    console.log(e)
    let that = this
    that.setData({
      listen: true,
      ing: false,
      stop: true
    })
    that.setData({
      listen: false,
      ing: false,
      stop: true
    })
    that.playAudio(e.currentTarget.dataset.index)
  },
  playAudio: function(e) {
    let that = this
    console.log(that.data.contentLists[e])
    that.createAudio('http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=' + appData.baidu_Token + '&tex=' + that.data.contentLists[e] + '&vol=9&per=0&spd=5&pit=5')
  },
  createAudio: function(playUrl) {
    let that = this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    wx.playBackgroundAudio({
      dataUrl: playUrl,
      title: 'test' + that.data.currentIndex
    })
    wx.onBackgroundAudioStop(() => {
      let that = this
      console.log('235')
      that.next()
    })
  },

  getUserInfo: function(e) {
    // app.aldstat.sendEvent('收藏登录', '收藏登录')
    let that = this
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo
    })
  },

  getUserInfo: function(e) {
    // app.aldstat.sendEvent('收藏登录', '收藏登录')
    let that = this
    wx.setStorage({
      key: 'userInfo',
      data: e.detail.userInfo
    })
    that.setData({
      buttonStatus: 'hide',
      info: 'show',
      userInfo: e.detail.userInfo
    })
  },

  linkDetail: function(e) {
    // app.aldstat.sendEvent('查看相关推荐详情', '查看相关推荐详情')
    wx.navigateTo({
      url: 'buben_news_detail?iid=' + e.currentTarget.dataset.iid
    })
  },

  onShareAppMessage: function(e) {
    let that = this
    return {
      title: '推荐',
      desc: '为创业者提供最新的创业资讯',
      path: '/pages/buben_news/detail/buben_news_detail?iid=' + that.data.iid,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },

  zoomOut: function(e) {
    let that = this
    wx.previewImage({
      current: e.currentTarget.dataset.urls,
      urls: that.data.imageList
    })
  },

  //置顶
  top: function(e) {
    // app.aldstat.sendEvent('阅读置顶', '阅读置顶')
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  //点赞
  like: function() {
    // app.aldstat.sendEvent('新闻点赞', '新闻点赞')
    let that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(e) {
        wx.request({
          url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/up',
          data: {
            uid: wx.getStorageSync('openid'),
            guid: wx.getStorageSync('openid'),
            dt: Date.parse(new Date()) / 1000,
            plt: 'wechat',
            iid: that.data.iid,
            type: that.data.likeStatus
          },
          success: function(e) {
            console.log(e)
            if (that.data.likeStatus == 0) {
              wx.showToast({
                title: '点赞成功',
                duration: 1000
              })
              that.setData({
                likeStatus: 1,
                liked: false,
              })
            } else {
              wx.showToast({
                title: '取消点赞',
                duration: 1000
              })
              that.setData({
                likeStatus: 0,
                liked: true
              })
            }
          }
        })
      },
      fail: function() {
        wx.getUserInfo({
          success: function(e) {
            wx.setStorageSync('userInfo', e.userInfo)
            wx.request({
              url: 'https://api.botbrain.ai/behavior/v1/RVCQS9UR56/up',
              data: {
                uid: wx.getStorageSync('openid'),
                guid: wx.getStorageSync('openid'),
                dt: Date.parse(new Date()) / 1000,
                plt: 'wechat',
                iid: that.data.iid,
                type: that.data.likeStatus
              },
              success: function(e) {
                if (that.data.likeStatus == 0) {
                  wx.showToast({
                    title: '点赞成功',
                    duration: 1000
                  })
                  that.setData({
                    likeStatus: 1,
                    liked: false,
                  })
                } else {
                  wx.showToast({
                    title: '取消点赞',
                    duration: 1000
                  })
                  that.setData({
                    likeStatus: 0,
                    liked: true
                  })
                }
              }
            })
          }
        })
      }

    })
  },

  onReady: function(e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  // 播放音频
  audioPlay: function(e) {
    //console.log(e)
    console.log(e.currentTarget.dataset.index)
    let that = this
    that.setData({
      listen: false,
      ing: false,
      stop: true
    })
    that.playAudio(e.currentTarget.dataset.index)
  },
  playAudio: function(e) {
    let that = this
    console.log(that.data.contentLists[e])
    that.createAudio('http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=' + appData.baidu_Token + '&tex=' + that.data.contentLists[e] + '&vol=9&per=0&spd=5&pit=5')
  },
  createAudio: function(playUrl) {
    let that = this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    wx.playBackgroundAudio({
      dataUrl: playUrl,
      title: 'test' + that.data.currentIndex
    })
    wx.onBackgroundAudioStop(() => {
      let that = this
      that.next()
    })
  },
  next: function() {
    let that = this
    if (that.data.currentIndex != that.data.maxIndex) {
      that.setData({
        currentIndex: that.data.currentIndex + 1
      })
      that.playAudio(that.data.currentIndex)
    }
  },
  audioPause: function(e) {
    let that = this
    that.setData({
      listen: false,
      ing: true,
      stop: false
    })
    wx.pauseBackgroundAudio(() => {
      let that = this
      console.log('235')
    })
  }
})