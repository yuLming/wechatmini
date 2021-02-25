// pages/sweep/sweep.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    basqbh: '', //申请编号
    bacjhm: '', //车架号
    baclzz: '', //制造商
    baclcx: '', //车系
    bacx: '', //车型
    carcolor: '', //车颜色
    address: '', //停放位置,
    carNo: '',//车牌号
    result: "",
    xtjsdm: "",//登陆人
  
    //可执行操作
    actions: [],
  
  },
  //根据勾选的操作进入下一个页面
  nextStep: function () {
    if(this.data.checkBoxList==null || this.data.checkBoxList == ""){
      wx.showModal({
        title: '注意',
        content: '请选择操作',
        showCancel: false,
       
      })
    }
    //入库
    else if(this.data.checkBoxList== "KCIN"){
      wx.navigateTo({
        url: '/pages/sweep/sweep?result=' + this.data.result// 页面 A
      })
    }
    //出库
    else if(this.data.checkBoxList== "KCOUT"){
      wx.navigateTo({
        url: '/pages/cksweep/cksweep?result=' + this.data.result// 页面 A
      })
      // wx.showModal({
      //   title: '注意',
      //   content: '出库成功',
      //   showCancel: false,
       
      // })
    }
     //盘点
     else if(this.data.checkBoxList== "PD"){
      wx.navigateTo({
        url: '/pages/pdsweep/pdsweep?result=' + this.data.result// 页面 A
      })

// // 在C页面内 navigateBack，将返回A页面
//       wx.navigateBack({
//         delta: 1
//       })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type;
    const result = options.result;

    const appUserInfo = app.globalData.getUserInfo();
    this.setData({
      // type: type,
      result: result,
      person: appUserInfo.XTCZMC,
      user: appUserInfo.XTCZDM,
      xtjsdm: appUserInfo.XTJSDM
    })
    if (appUserInfo.XTJSDM == "7025") {
      this.setData({
        isShow: true
      })
    }
   
    const param = {
      "type": type,
      "condition": result,
      "user": appUserInfo.XTCZDM

      // "user": appUserInfo.XTCZDM,
      // "vin": result

    };
    wx.request({
      // url: app.globalData.getRealUrl("queryCarInfo"),    // 改成刚伟鹏的新的接口
      url: app.globalData.getRealUrl("queryCarInfo"),
      method: 'GET',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        if (res.data.obj == undefined || res.data.obj == "") {
          wx.showModal({
            title: '注意',
            content: res.data.message,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/index/index'　　// 页面 A
                })
              }
            }
          })
        }
        const obj = res.data.obj;
        this.setData({
          basqbh: obj.basqbh, //申请编号
          bacjhm: obj.bacjhm, //车架号
          baclzz: obj.clzz, //制造商
          carNo: obj.carNo, //车牌号
          baclcx: obj.clcx, //车系
          bacx: obj.clcx, //车型
          carcolor: obj.carColor, //车颜色
          address: obj.address, //停放位置
        })
        const actions = obj.actions;
        this.setData({ actions: [] })
        const dataAction = [];
        for (let key in actions) {

          dataAction.push({

            'realValue': key,
            'name': actions[key]

          });

        }
        this.setData({ actions: dataAction })

      }
    })
  },
  ifGiveUpChecked: function (e) {
    this.setData({
      ifGiveUp: e.detail.value
    })
  },
  ifKeyToCarChecked: function (e) {
    this.setData({
      ifKeyToCar: e.detail.value
    })
  },
  ifXSZChecked: function (e) {
    this.setData({
      ifXSZ: e.detail.value
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

  // 模态框事件
  confirm: function () {
    this.setData({
      showModal: false
    })
    wx.switchTab({
      url: '/pages/index/index'　　// 页面 A
    })
  },
  preventTouchMove: function () {

  },
 
  checkboxChange: function (e) {

    this.setData({ checkBoxList: '' })

    const item = e.detail.value //选中的数组
   
    this.setData({ checkBoxList: item })


  }
})