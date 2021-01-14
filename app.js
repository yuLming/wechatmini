//app.js
var utilMd5 = require('utils/md5.js');

App({
  changeData:function(){

    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
    
    },
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
          console.log(latitude+"精度");
          console.log(longitude+"维度");
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
    // baseUrl: 'https://tmdh.xftm.com/XftmApp/',
    baseUrl: 'http://10.10.40.187:8767/XftmApp/',
    // baseUrl: 'http://testwx.xftm.com:9050/XftmApp/',//测试环境
    // testUrl: 'http://testwx.xftm.com/XftmApp/',
    // testGwpUrl: 'https://www.xftmleasing.com:4443/TMDH',    // 刚伟鹏的测试地址
    // baseGwpUrl: 'https://tmdh.xftm.com/TMDH',    // 刚伟鹏的正式地址
    baseGwpUrl: 'http://10.10.40.187:8080/TMDH',    // 本地测试
    // baseGwpUrl: 'http://116.228.224.60:9509/TMDH',    // 本地测试
    
    basqbh: '', //申请编号
    bacjhm: '', //车架号
    id: '', //二维码id,
    urlimage:'',//二维码图片路径
    latitude:'',//精度
    longitude:'',//维度
    cardInfo: {
      basqbh: '', //申请编号
      bacjhm: '', //车架号
      baclzz: '', //制造商
      baclcx: '', //车系
      bacx: '', //车型
      carcolor: '', //车颜色
      address: '', //停放位置
      action: [], //可执行操作
    }, //汽车信息
    getUserInfo: function () {
      console.log(wx.getStorageSync('userInfo')+"21321321");
      return wx.getStorageSync('userInfo');
    },

    getRealUrl: function (e) {
      var a = this.baseUrl;
      var b = this.baseGwpUrl;
      switch (e) {
        case "wxLogin":
          a += "WxCtrl/wxlogin";
          break;
        case "getPosition":
          a += "WxCtrl/getPosition";
          break;
        case "park":
          a += "WxCtrl/park";
          break;
        case "queryqrcode":
          a += "WxCtrl/queryqrcode";
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
        // 上传
        case "baseUpload":
          a += "FileCtrl/baseUploadFileOneToDh";
          break;
        // 之前的接口
        // case "queryCarInfo":
        //   a += "/WxCtrl/queryCarStockInfo";
        //   break;
        // case "sumbitKcActions":
        //   a += "/WxCtrl/sumbitKcActions";
        //   break;
        // 获取已入库订单列表
        case "queryPutInList":
          b += "/xcx/queryPutInList.action";
          return b;
           // 获取未入库订单列表queryList
          case "queryList":
          b += "/xcx/queryList.action";
          return b;
          //生成二维码调用
          case "stock":
          b += "/stock?type=park&oprAcct=";
          return b;
        // 扫码进入操作详情页面
        case "carInfo":
          b += "/xcx/queryCarInfo.action";
          return b;
        // 提交
        case "scanSubmit":
          b += "/xcx/scanSubmit.action";
          return b;
      }

      return a;
    }
  },
  updateValue(e) {
    let name = e.currentTarget.dataset.name;
    let nameMap = {}
    nameMap[name] = e.detail && e.detail.value
    return nameMap
  },
  baseAjaxRequest: function () {




  },
  getMD5String: function (e) {
    return utilMd5.hexMD5(e);

  },
  alert: function (msg) {

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
  getClientInfo: function () {

    wx.request({
      url: 'http://ip-api.com/json',
      success: function (e) {

        console.log(e.data);

      }
    })
  }
})