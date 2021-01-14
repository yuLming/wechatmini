// pages/park/inder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: "",
    modalHidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const appUserInfo = app.globalData.getUserInfo();
    console.log(appUserInfo.XTJSID+"fds");
    const param = {
      "username": appUserInfo.XTCZDM,
      "xtjsid":appUserInfo.XTJSID
    };
    console.log("参数",appUserInfo)
    wx.request({
      // 请求入库订单查询列表路径
      url: app.globalData.getRealUrl("queryqrcode"),
      method: 'POST',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        console.log("订单列表",res.data.obj);
        this.setData({
          listData: res.data.obj
        })
        // const actions = obj.actions;
        // this.setData({ actions: [] })
        // const dataAction = [];
        // for (let key in actions) {

        //   dataAction.push({

        //     'realValue': key,
        //     'name': actions[key]

        //   });

        // }
        // this.setData({ actions: dataAction })

      }
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

  },
  buttonTap:function(e){
    const item = JSON.stringify(e.currentTarget.dataset['index'])
    wx.redirectTo({
      url: 'qrcode?item='+encodeURIComponent(item),
    })
  },
})