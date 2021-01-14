// pages/park/qrcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:"",
    bacjhm:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.item+"ceshi");
    var options=JSON.parse(decodeURIComponent(options.item))
    console.log(options.ociRealPath+"ceshi1212");

    this.setData({
      path: options.ociRealPath,
      bacjhm:options.ociBacjhm
    })
    console.log(this.data.path)
    console.log(this.data.bacjhm)
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
    // console.log("this.onUnload")
    // var pages =getCurrentPages();//当前页面栈
    // console.log(pages+"页面数");
    // var beforePage = pages[pages.length- 1];
    // console.log(beforePage.route);
    // wx.navigateBack({         //返回上一页  
    //   delta:1
    // })
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

  },
  changan:function(e){
    var that=this;
    wx.showActionSheet({
      itemList: ['识别二维码进行入库操作', '保存图片'],
      success: function (res) {
        if (!res.cancel) {
          console.log(res.tapIndex)//这里是点击了那个按钮的下标
          if(res.tapIndex==0){
            console.log(that.data.bacjhm);
            wx.showModal({
              title: '注意',
              content: '是否要进行入库操作',
              success:function(res){
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                  //跳页面直接传值，进行入库操作
                  wx.redirectTo({
                     url: '/pages/sweepResult/sweepResult?result='+that.data.bacjhm,
                  })
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              }
            })
          }
        }
      }
    })
  }
})