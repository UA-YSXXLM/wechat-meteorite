// pages/fund/fund.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: 9, // 第几天
    sum: 33872.91, //总数
    orNum: -5452.64,//涨跌数
    ratio: -21.13,//涨跌比例
    bl: 0,
    tr: 0,
    list: []
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [field]: e.detail.value
    })
  },
  cancel(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [field]: 0
    })
  },
  submitForm() {
    let { date, sum, orNum, ratio, list, bl, tr } = this.data;
    date = date+1;

    let jrzds = (Number(sum) + Number(tr)) * (Math.abs(bl)/100); // 今日涨跌数
    
    if(bl>0){
      sum = Number(sum) + Number(tr) + Number(jrzds);
      orNum = Number(orNum) + Number(jrzds);
      list = list.concat(`${date}日涨跌比例:+${bl},涨跌数:+${jrzds}`)
    }else{
      sum = Number(sum) + Number(tr) - Number(jrzds);
      orNum = Number(orNum) - Number(jrzds);
      list = list.concat(`${date}日涨跌比例:-${bl},涨跌数:-${jrzds}`)
    }

    ratio = Number(ratio) + Number(bl);

    this.setData({
      date: date,
      sum: sum,
      orNum: orNum,
      ratio: ratio,
      list: list,
      bl: 0,
      tr: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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