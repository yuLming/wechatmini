// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    userName:'',
    userPwd:''
  },
  eventhandle:function(e){
    this.setData(app.updateValue(e));


  },
  pwdHandle :function(e){
    console.log(e);
    this.setData({
       
      userPwd: app.getMD5String(e.detail.value).toUpperCase()
    })
  },
  login:function(){
    if (this.data.userName =="" || this.data.userPwd == ""){
       
      app.alert("请填写手机号和密码");
      return;
    }
      var loginParam = {
        'userName': this.data.userName,
        'pwd': this.data.userPwd 
      }
    console.log(loginParam);
    console.log(typeof (loginParam));
    app.getClientInfo();
    wx.request({
      url: app.globalData.getRealUrl("wxLogin"),
      method: 'POST',
      dataType: 'json',
      data: loginParam,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (loginRes) => {
        console.log(loginRes);

        
        if (loginRes.data.success){
          wx.switchTab({
            url: '/pages/index/index'　　// 页面 A
          })
          wx.setStorage({
            key: 'userInfo',
            data: loginRes.data.obj
          })
        }else{

          app.alert(loginRes.data.msg);
        }
        
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //从缓存获取用户信息
    var appUserInfo = app.globalData.getUserInfo();
    console.log(appUserInfo);
    if (appUserInfo == '' || appUserInfo ==null){
      return ; 
    }else{
      this.setData({
        userName: appUserInfo.XTCZDM,
        userPwd: appUserInfo.XTCZMM
      })
      this.login();
    }
  } , 
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

  }
})