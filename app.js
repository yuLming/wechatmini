//app.js
var utilMd5 = require('utils/md5.js');  

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }),
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          console.log(latitude);
          console.log(longitude);

          // wx.openLocation({
          //   latitude,
          //   longitude,
          //   scale: 18
          // })
        }
      }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    baseUrl: 'http://adfs.xftm.com:8767/XftmApp/',
    testUrl: 'http://127.0.0.1:8767/XftmApp/',
    basqbh : '',//申请编号
    bacjhm : '',//车架号
    id : '',//二维码id,
    cardInfo:{
      basqbh:'',//申请编号
      bacjhm:'',//车架号
      baclzz:'',//制造商
      baclcx:'',//车系
      bacx:'',//车型
      carcolor:'',//车颜色
      address:'',//停放位置
      action:[] //可执行操作
    },//汽车信息
    getUserInfo:function (){
      console.log(wx.getStorageSync('userInfo'));
      return wx.getStorageSync('userInfo');
    },
    getRealUrl:function(e){
      var a = this.baseUrl;
      switch (e) {
        case "wxLogin":
          a += "WxCtrl/wxlogin";
          break;
        case "wxSweepCode":
          a += "WxCtrl/wxSweepCode";
          break;
        case "wechatSmallUserLoginMobileBind":
          a += "/user/login/phone";
          break;
        case "weixiUserInfo":
          a += "/combo/save";
          break;
        case "goodsList":
          a += "/goods/queryGoodsInfoList";
          break;
        case "goodsProductinfo":
          a += "w2/goods/productinfo";
          break;
        case "submitOrder":
          a += "/order/submitOrder";
          break;
        case "pay":
          a += "/order/pay";
          break;
        case "uploadImage":
          a += "/WxCtrl/uploadImage";
          break;
        case "queryCarInfo":
          a += "/WxCtrl/queryCarStockInfo";
          break;
         
        case "sumbitKcActions":
          a += "/WxCtrl/sumbitKcActions";
          break;
      }

      return a;  
    }
  },
   updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    return nameMap
  } ,
  baseAjaxRequest:function(){



    
  },
  getMD5String:function(e){
    return utilMd5.hexMD5(e);

  },
  alert:function(msg){

    wx.showToast({
      title: msg,
      icon: "none",
      mask: !1
    })
  },
  /**
   * 获取ip 地址等信息 
   * 此http地址在微信开放文档未找到
   */
  getClientInfo:function(){

    wx.request({
      url: 'http://ip-api.com/json',
      success: function (e) {
        
        console.log(e.data);

      }
    })
  }
})