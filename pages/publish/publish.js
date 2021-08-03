const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',
    title: '',
    explain: '',
    imageSrc: ''
  },

  uploadImg() {
    // 让用户选择一张图片
    console.log(Date.now()+Math.ceil(Math.random()*1000))
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'cyberspeak/'+Date.now()+Math.ceil(Math.random()*1000),
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            if(res.errMsg == 'cloud.uploadFile:ok'){
              this.setData({
                imageSrc: res.fileID
              })
            }else{
              wx.showToast({
                title: '上传失败',
                icon: 'none'
              })
            }
          }
        })

      },
    })
  },
  previewImg() {
    if(this.data.imageSrc){
      wx.previewImage({
        current: this.data.imageSrc,
        urls: [this.data.imageSrc]
      })
    }
  },
  handleInput(e) {
    this.setData({
      [e.target.dataset.model]: e.detail.value
    })
  },
  uploadcyberspeak() {
    if(!this.data.title){
      wx.showToast({
        title: '请输入用语',
        icon: 'none'
      })
      return false
    }
    if(!this.data.explain && !this.data.imageSrc){
      wx.showToast({
        title: '请输入用语释义或上传图片释义',
        icon: 'none'
      })
    }
    wx.cloud.database().collection('cyberspeak').add({
      data: {
        title: this.data.title,
        explain: this.data.explain,
        imageSrc: this.data.imageSrc,
        date: new Date(),
        commentNum: 0,
        likeNum: 0,
        ...this.data.userInfo
      }
    }).then(res => {
      this.setData({
        title: '',
        explain: '',
        imageSrc: '',
      })
      wx.showToast({
        title: '发布成功',
        icon: 'none'
      })
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '发布失败',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getSetting({
      success(res) {
        //console.log(res)
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})