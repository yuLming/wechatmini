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
      "user": appUserInfo.XTCZDM
    };
    wx.request({
      // 请求入库订单查询列表路径
      url: app.globalData.getRealUrl("queryOutInList"),
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

        // let param = this.data.motto;

        // param = JSON.parse(param);

        // var par = {
        //   'basqbh': '11111',
        //   'bacjhm': 'xxxxxxx',
        //   'codeid': '1'
        // }
        // wx.navigateTo({
        //   url: '/pages/sweep/sweep'　　 // 页面 A
        // })
        // wx.request({
        //   url: app.globalData.getRealUrl("wxSweepCode"),
        //   method: 'POST',
        //   dataType: 'json',
        //   data: param,
        //   header: {
        //     'content-type': 'application/x-www-form-urlencoded' // 默认值
        //   },
        //   success: (sweepRes) => {
        //     const data = sweepRes.data;
        //     console.log(data);
        //     console.log(typeof (data));

        //     if(!data.success){
        //       app.alert(data.msg);
        //       return false;
        //     }
        //     // const dataObj = data.;
        //     // console.log(typeof (dataObj));
        //     // console.log(dataObj)


        //     const obj = data.obj;
        //     //车牌
        //     const result = obj.bacjhm;

        //     wx.navigateTo({
        //       url: '/pages/sweepResult/sweepResult?type=' + 1 + '&result=' + result　　 // 页面 A
        //     })

        //   }
        // })

      },
      fail: (ress) => {

      }

    })
  },

  toDetails: function (e) {
    
    const item = JSON.stringify(e.currentTarget.dataset['index'])
    // 跳转详情页面
    wx.navigateTo({
      url: '/pages/details/details?item='+item
    })


  }

})
