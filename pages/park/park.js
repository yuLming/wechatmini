const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sctcid:'',// 停车场ID
    sctcmc:'', //停车场名称
    sctczh:'',//停车场账号
    sctcsf:'',//所在省份
    sctccs:'',//所在城市
    sctcry:'',//停车场联系人员
    scrydh:'',//停车场联系人员电话
    sctcdz:'',//停车场联系地址
    sctcyx:'',//邮箱
    sctcbm:'',//编码
    scqybz:'',//启用标志
    sckhmc:'', //开户名称
    sckhyh:'',//开户银行
    sckhzh:'',//开户账号
    scfjbs:'',//附件标示
    xtczrq:'',//操作日期
    xtczsj:'',//系统操作时间
    xtczry:'',//系统操作人员
    scbzj:'',//保证金
    sctcglr:'',//总部停车场管理人
    distance:'',//车辆到停车场的距离
    bacjhm:'',//chejiahaoma 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options.vehicleIdentifyNum);
    console.log(options.res);
    var result = JSON.parse(options.res);
    this.data.bacjhm=options.vehicleIdentifyNum;
    console.log(this.data.bacjhm);
    console.log(result[0]);
    this.setData({
      result:result,
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
    // 页面显示
    //周期为：2秒 的周期定时器
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
,
  toDetails: function (e) {
    
    const item = JSON.stringify(e.currentTarget.dataset['index']);
    console.log(item+"信息");
    // 跳转详情页面
    wx.navigateTo({
      url: '/pages/detailspark/detailspark?item='+item
    })
  },
  to:function(e){
    var that=this;
    var s=e.currentTarget.dataset['index'];
            console.log(s.sctcid+"测试数据");
            this.data.sctcid=s.sctcid;
    wx.showModal({
      title: '提示',
      content: '您要生成二维码吗？',
      success: function (e) {
        if (e.confirm) {
            // 用户点击了确定 
            console.log("客户点击了");
            that.toPark();
          } else if (e.cancel) {
          }
        }
      })
  },
    toPark:function(){
    var parm=this.data.sctcid;
    console.log(parm)
    const appUserInfo = app.globalData.getUserInfo();
    console.log(this.data.bacjhm)
    param=this.data.bacjhm
    wx.showToast({
      title: '正在生成二维码，请稍等',
      icon: 'loading',
      duration: 2500//持续的时间
    });
    //diaojiekou
    wx.request({
      url: app.globalData.getRealUrl("stock")+encodeURI(encodeURI(appUserInfo.XTCZDM))+"&oprName="+encodeURI(encodeURI(appUserInfo.XTCZDM))+"&frameNo="+param+"&sctcid="+parm,
      // url: "http://10.10.40.187:8080/TMDH/stock?type=park&oprAcct="+encodeURI(encodeURI(appUserInfo.XTCZDM))+"&oprName="+encodeURI(encodeURI(appUserInfo.XTCZDM))+"&frameNo="+param+"&sctcid="+parm,
      method: 'POST',
      dataType: 'json',
      data: "",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: (res) => {
        var result = JSON.stringify(res.data)
        console.log("返回数据", result) 
        var pages =getCurrentPages();//当前页面栈
        console.log(pages+"页面数");
        var beforePage = pages[pages.length- 2];
        console.log(beforePage);
        beforePage.changeData();
        wx.showModal({
          title: '提示',
          content: '已生成二维码，是否查看二维码？',    
          success: function (e) {
            if (e.confirm) {
                // 用户点击了确定 
                console.log("客户点击了");
                wx.redirectTo({
                  url: 'inder',
                })
              } else if (e.cancel) {
                wx.reLaunch({
                  url:'/pages/order/order'
                })
              }
            }
        })
      }
  })
  }
})