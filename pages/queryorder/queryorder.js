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
    listData: [
      { "code": "01", "text": "text1", "type": "type1" },
      { "code": "02", "text": "text2", "type": "type2" },
      { "code": "03", "text": "text3", "type": "type3" },
      { "code": "04", "text": "text4", "type": "type4" },
      { "code": "05", "text": "text5", "type": "type5" },
      { "code": "06", "text": "text6", "type": "type6" },
      { "code": "07", "text": "text7", "type": "type7" }
    ]
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    const appUserInfo = app.globalData.getUserInfo();
    const param = {
      "user": appUserInfo.XTCZDM
    };
    console.log("参数",appUserInfo)
    // wx.request({
    //   // 请求入库订单查询列表路径
    //   url: app.globalData.getRealUrl(""),
    //   method: 'GET',
    //   dataType: 'json',
    //   data: param,
    //   header: {
    //     'content-type': 'application/json;charset=UTF-8' // 默认值
    //   },
    //   success: (res) => {
    //     console.log(res);
    //     // const obj = res.data.obj;
    //     // console.log(obj);
    //     this.setData({
    //       listData: res.data
    //     })
    //     // const actions = obj.actions;
    //     // this.setData({ actions: [] })
    //     // const dataAction = [];
    //     // for (let key in actions) {

    //     //   dataAction.push({

    //     //     'realValue': key,
    //     //     'name': actions[key]

    //     //   });

    //     // }
    //     // this.setData({ actions: dataAction })

    //   }
    // })
  },

  toDetails: function (e) {
    
    const item = JSON.stringify(e.currentTarget.dataset['index'])
    // 跳转详情页面
    wx.navigateTo({
      url: '/pages/details/details?item='+item
    })


  }

})
