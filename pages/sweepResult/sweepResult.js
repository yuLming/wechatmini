// pages/sweepResult/sweepResult.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",//input 前面的
    v: "",//input的值
    type : ""//类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const type = options.type;
    let shouName = "";
    switch (type) {

      case "1":
        shouName = "车架号";
        break;
      case "2":
        shouName = "车牌";
        break;
      default:
        shouName = "车架号"
        break;

    }
    

    const result = options.result;
    this.data.v = result;
    this.setData({
      name: shouName,
      v: result,
      type:type
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    

  },
  //下一步跳转到详情页面
  nextStep: function () {

    let type = this.data.type;
    let result = this.data.v;
    wx.navigateTo({
      url: '/pages/sweep/sweep?result=' + result　　// 页面 A
    })
  }
})