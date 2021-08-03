// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    price: 0,
    list: [],
    total: 0,
    pageSize: 10,//每页条数
    page: 1,
    pageNum: 0 //总页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.database().collection('goods').count().then(res => {
      this.setData({
        total: res.total,
        pageNum: Math.ceil(res.total/this.data.pageSize)
      })
      this.getList();
    })
  },
  getList() {
    wx.cloud.database().collection('goods').skip((this.data.page-1)*this.data.pageSize).limit(this.data.pageSize).orderBy('date', 'desc').get().then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  last(){
    let page = this.data.page;
    if(page <= 1 ){
      this.setData({
        page: 1
      })
      wx.showToast({
        title: '已经是第一页了'
      })
      return false
    }
    this.setData({
      page: this.data.page-1
    })
    this.getList()
  },
  next() {
    let page = this.data.page;
    if(page >= this.data.pageNum ){
      this.setData({
        page: this.data.pageNum
      })
      wx.showToast({
        title: '已经是最后一页了'
      })
      return false
    }
    this.setData({
      page: this.data.page+1
    })
    this.getList()
  },
  handleInput(e) {
    this.setData({
      [e.target.dataset.model]: e.detail.value
    })
  },
  addGoods() {
    wx.cloud.database().collection('goods').add({
      data: {
        name: this.data.name,
        price: Number(this.data.price),
        date: new Date()
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
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