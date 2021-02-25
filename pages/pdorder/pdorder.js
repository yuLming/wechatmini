const app = getApp();
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    listData: []
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    const appUserInfo = app.globalData.getUserInfo();
    const param = {
      "user": appUserInfo.XTCZDM,
      "jsId": appUserInfo.XTJSID
    };
    wx.request({
      // 盘点列表路径
      url: app.globalData.getRealUrl("queryStockTaskList"),
      method: 'GET',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        this.setData({
          listData: res.data.data
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
  toDetails: function (e) {
    
    const item = JSON.stringify(e.currentTarget.dataset['index'])
    // 跳转详情页面
    wx.navigateTo({
      url: '/pages/details/details?item='+item
    })


  },
  startScan: function (e) {
    wx.scanCode({
      success: (res) => {
        let r = JSON.parse(res.result)
        this.setData({
          motto: res.result
        })
        wx.navigateTo({
          url: '/pages/sweepResult/sweepResult?result=' + r.bacjhm     // 页面 A
        })
      },
      fail: (ress) => {

      }

    })
  },

})
