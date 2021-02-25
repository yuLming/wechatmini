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
  onShow: function () {
    
    },
    changeData:function(){

      this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low

      },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        app.globalData.latitude=latitude;
        app.globalData.longitude=longitude;
        // wx.openLocation({
        //   latitude,
        //   longitude,
        //   scale: 18
        // })

      }
    });
    const appUserInfo = app.globalData.getUserInfo();
    const param = {
      "user": appUserInfo.XTCZDM
    };
    wx.request({
      // 请求入库订单查询列表路径
      url: app.globalData.getRealUrl("queryList"),
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
      }
    })
  },

  toDetails: function (e) {
    
    const item = JSON.stringify(e.currentTarget.dataset['index'])
    // 跳转详情页面
    wx.navigateTo({
      url: '/pages/orderdetails/orderdetails?item='+item
    })


  },
  //获取停车场
  nextStep1: function (e) {
    const item = e.currentTarget.dataset['index']

    
    param={
      vehicleIdentifyNum:item.bacjhm,
      latitude:app.globalData.latitude,
      longitude:app.globalData.longitude
    }
    wx.request({
      // url: app.globalData.getRealUrl("queryCarInfo"),    // 改成刚伟鹏的新的接口
      url: app.globalData.getRealUrl("getPosition"),
      method: 'POST',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        var result = JSON.stringify(res.data.obj)
        if (res.data.obj == "" || res.data.obj==undefined) {
          wx.showModal({
            title: '注意',
            content: '当前客户可能已操作，请您核实再操作',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/index/index'　　// 页面 A
                })
              }
            }
          })
        }else{
          wx.navigateTo({
            url: '/pages/park/park?res='+result+'&vehicleIdentifyNum='+param.vehicleIdentifyNum　　// 页面 A
          })
        }
      }

  })
}

})
