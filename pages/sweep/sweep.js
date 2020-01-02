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
    carNo:'',//车牌号
    //可执行操作
    actions: [{
      "realValue": "xxxx",
      "name": "yyyyy"
    }, {

      "realValue": "xxxxx",
      "name": "yyyyy222"

    }, {
      "realValue": "xxxxx",
      "name": "yyyyy222"
    }],
    type: "",
    result: "",
    checkBoxList:[]//被选中的checkbox
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const type = options.type;
    const result = options.result;


    this.setData({
      type: type,
      result: result
    })
    const param = {
      "type": 1,
      "condition": "xxxxx",
      "user": "xxxx"

    };
    wx.request({
      url: app.globalData.getRealUrl("queryCarInfo"),
      method: 'GET',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        console.log(res);
        const obj = res.data.obj;
        console.log(obj);
        this.setData({
          basqbh: obj.basqbh, //申请编号
          bacjhm: obj.bacjhm, //车架号
          baclzz: obj.clzz, //制造商
          baclcx: '', //车系
          bacx: obj.clcx, //车型
          carcolor: obj.carColor, //车颜色
          address: obj.address, //停放位置
          carNo: obj.carNo
        })
        const actions = obj.actions;
        this.setData({ actions:[]})
        const dataAction = [];
        for (let key in actions){

          dataAction.push({
            
            'realValue': key,
            'name': actions[key]

          });

        }
        this.setData({ actions: dataAction })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  operaCarStock: function() {
    if(this.data.checkBoxList.length ==0){
      app.alert("请选择您要执行的操作");
      return false;
    }
    console.log(this.data.checkBoxList);

    wx.request({
      url: app.globalData.getRealUrl("sumbitKcActions"),
      method: 'POST',
      dataType: 'json',
      data: { 'args': JSON.stringify(this.data) },
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        console.log(res);
      }
    })
  },
  checkboxChange:function(e){
      
    this.setData({ checkBoxList: [] })

    const item = e.detail.value //选中的数组
    console.log89 == (item);
    let checkBoxList = []
    for (var i = 0; i < item.length; i++) {
      var selectKey = item[i]; //将数组进行分割
      checkBoxList.push({

        "key": selectKey
      });
    }
    this.setData({ checkBoxList: checkBoxList })
    

  }
})