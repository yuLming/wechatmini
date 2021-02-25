//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: app.globalData.getUserInfo(),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    XTJSID:""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.hideTabBar(true);
    /* http测试
    wx.request({
      url: 'http://adfs.xftm.com:8767/XftmApp/test/schedule',
      method: 'GET',
      dataType: 'json',
      success : function (res) {
        console.log(res)
      },
      fail : function (e) {
        console.log(e)
      }
    })
    */
   const appUserInfo = app.globalData.getUserInfo();
    this.setData({
      XTJSID:app.globalData.getUserInfo().XTJSID
    })

    
    if (app.globalData.userInfo) {
      const appUserInfo = app.globalData.getUserInfo();
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        XTJSID:app.globalData.getUserInfo().XTJSID
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    getUserInfo();

  },
  getPhoneNumber(e) {
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toQueryOrder: function () {
    // 请求获取数据


    // 跳转
    wx.navigateTo({
      url: '/pages/queryorder/queryorder'
    })
  },
  //跳转到待出库订单
  toCkQueryOrder: function () {
    // 跳转
    wx.navigateTo({
      url: '/pages/queryckorder/queryckorder'
    })
  },
    //跳转到已出库订单
    toCkQueryOrder2: function () {
      // 跳转
      wx.navigateTo({
        url: '/pages/queryyckorder/queryyckorder'
      })
    },
    //跳转到盘点列表
    toPdOredr1: function () {
      // 跳转
      wx.navigateTo({
        url: '/pages/pdbatch/pdbatch'
      })
    },
  toOrder: function () {
    // 请求获取数据


    // 跳转
    wx.navigateTo({
      url: '/pages/order/order'
    })
  },
  /**
   * 查看生成二维码的订单
   */
  qrcode:function(){
    wx.navigateTo({
      url: '/pages/park/inder'
    }) 
  },
  /**
   * 生成二维码跳转
   */
  createScan:function(){
    // 跳转
    wx.navigateTo({
      url: '/pages/qrcode/qrcode'
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
  //扫描车牌号
  // chooseCarPlateimage: function () {
  //   let thit = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['compressed'], // ['original 原图', 'compressed 压缩图']可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['camera'], // ['album 相册', 'camera 相机']可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       wx.showToast({
  //         title: '正在识别...',
  //         icon: 'loading',
  //         mask: true,
  //         duration: 3000
  //       })
  //       const tempFilePaths = res.tempFilePaths;
  //       thit.uploadImages(tempFilePaths, 2);
  //     }
  //   })
  // },
  //扫描车架号
  // chooseCarVinimage: function () {
  //   let thit = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['compressed'], // ['original 原图', 'compressed 压缩图']可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['camera'], // ['album 相册', 'camera 相机']可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       wx.showToast({
  //         title: '正在识别...',
  //         icon: 'loading',
  //         mask: true,
  //         duration: 3000
  //       })
  //       const tempFilePaths = res.tempFilePaths;
  //       thit.uploadImages(tempFilePaths, 1);

  //     }
  //   })
  // },
  // // type 1 通用文字扫描 2 扫描车牌
  // uploadImages: function (tempFilePaths, type) {
  //   wx.uploadFile({
  //     url: app.globalData.getRealUrl("uploadImage"), //仅为示例，非真实的接口地址
  //     filePath: tempFilePaths[0],
  //     name: 'file',
  //     formData: {
  //       'type': type
  //     },
  //     success(res) {
  //       const data = JSON.parse(res.data);
  //       const obj = data.obj;
  //       //车牌
  //       const result = obj.result;
  //       wx.navigateTo({
  //         url: '/pages/sweepResult1/sweepResult1?type=' + type + '&result=' + result　　 // 页面 A
  //       })

  //     }
  //   })


  // },
  loginout: function () {


    wx.setStorage({
      key: 'userInfo',
      data: []
    })
    wx.navigateTo({
      url: '/pages/login/login' // 页面 A
    })
  }
})