// pages/cyberspeak/cyberspeak.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    duration: 500,
    list: [],
    page: 1,
    pageSize: 10,
    total: 0,
    pageNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('cyberspeak').count().then(res => {
      this.setData({
        total: res.total,
        pageNum: Math.ceil(res.total/this.data.pageSize)
      })
      this.getData();
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  swiperChange(e) {
    if(e.detail.current>=this.data.list.length) {
      if(this.data.page >= this.data.pageNum) {
        return false
      }
      this.setData({
        page: this.data.page+1
      })
      this.getData()
    }
  },
  getData() {
    wx.cloud.database().collection('cyberspeak').skip((this.data.page-1)*this.data.pageSize).limit(this.data.pageSize).orderBy('_openid', 'desc').get().then(res => {
      this.setData({
        list: this.data.list.concat(res.data)
      })
    })
  },
  previewImg(e) {
    let url = e.currentTarget.dataset.img;
    wx.previewImage({
      current: url,
      urls: [url]
    })
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