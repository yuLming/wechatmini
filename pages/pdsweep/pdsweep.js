// pages/cksweep/cksweep.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,  // 设置提交按钮默认可用
    xtjsdm: '',     // 系统角色
    isShow: false,   // 根据登录角色页面显示是否按钮
    atDate: '',   // 当前时间
    person: '',   // 入库人员
    f: [],
    operType: '',   // 操作
    scrwid: '',//放位置,
    carNo: '',//车牌号
    //可执行操作
    ifGiveUp: '',     // 是否有自愿放弃书
    ifKeyToCar: '',   // 是否有车钥匙
    ifXSZ: '',        // 是否有行驶证
    showModal: false,   // 模态框默认关闭
    files: [],          // 接收文件单子
    imgs1: [],   // 存放图片
    applyName: '',  // 客户姓名
    basqbh: '', //申请编号
    bacjhm: '', //车架号
    baclzz: '', //制造商
    baclcx: '', //车系
    bacx: '', //车型
    carcolor: '', //车颜色
    address: '', //停
    actions: [],
    type: "",
    result: "",
    user: '',
    jd: "",
    wd: "",
    ip: "",
    checkBoxList: []//被选中的checkbox
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const type = options.type;
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
    var wd = "";
    var jd = "";
    var ip = "";
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        that.setData({
          wd: res.latitude,
          jd: res.longitude
        })
      }
     })
     wx.request({  // 获取ip
      url: 'http://ip-api.com/json',
      success: function (e) {
        that.setData({
          ip: e.data.query
        })
      }
    })
    const param = {
      "type": '3',
      // "condition": result,
      // "user": appUserInfo.XTCZDM

      "user": appUserInfo.XTCZDM,
      "vin": result

    };
    wx.request({
      // url: app.globalData.getRealUrl("queryCarInfo"),    // 改成刚伟鹏的新的接口
      url: app.globalData.getRealUrl("carInfo"),
      method: 'GET',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        if (res.data.data == undefined || res.data.data == "") {
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
      
        const obj = res.data.data;
        this.setData({
          scrwid: obj.scrwid,
          applyName: obj.applyName,   // 客户姓名
          basqbh: obj.applyNo, //申请编号
          bacjhm: obj.vin, //车架号
          baclzz: obj.carMark, //制造商
          baclcx: obj.carLine, //车系
          bacx: obj.carModel, //车型
          carcolor: obj.carColour, //车颜色
          address: obj.stopSite, //停放位置
          carNo: obj.carNumber,   // 车牌
          files: obj.files,   // 接收文件单子
          operType: obj.operType
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
  operaCarStock: function () {
    console.log(11)
    let time = new Date();
    let date = time.toLocaleDateString()
    this.setData({
      atDate: date
    })
   
    const l = this.data.f
    if (l.length < 1) {
      app.alert("别忘记上传图片");
      return false;
    }
      const param = {
        "files": JSON.stringify(this.data.f),
        "user": this.data.user,
        "vin": this.data.bacjhm,
        "ip": this.data.ip,
        "jd": this.data.jd,
        "wd": this.data.wd
      };
      
      wx.request({
        url: app.globalData.getRealUrl("sumbitPdActions"),
        method: 'GET',
        dataType: 'json',
        data: param,
        header: {
          'content-type': 'application/json;charset=UTF-8' // 默认值
        },
        success: (res) => {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
            success (res) {
              // 在C页面内 navigateBack，将返回A页面
          wx.navigateBack({
            delta: 3
          })
    
            }
          })
          
    
        }
      })

  
  },
  // 删除图片
  deleteImg1: function (e) {
    
    var imgs1 = this.data.imgs1;
    var index = e.currentTarget.dataset.index;
    imgs1.splice(index, 1);
    this.setData({
      imgs1: imgs1
    });
  },

  // // 预览图片
  previewImg1: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs1 = this.data.imgs1;
    wx.previewImage({
      //当前显示图片
      current: imgs1[index],
      //所有图片
      urls: imgs1
    })
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
  // 上传图片
  uploadImage: function (e) {
    var that = this;
    var imgs1 = that.data.imgs1;
    let imagePaths
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],   // 'original',
      sourceType: ['camera'],
      success: function (res) {
        imagePaths = res.tempFilePaths;
        const f = that.data.f
        // wx.uploadFile 接口只能一次上传 1 张图片
        wx.uploadFile({
          url: app.globalData.getRealUrl("baseUpload"),
          filePath: imagePaths[0],   // 微信返回的临时图片地址
          name: 'file',
          header: { "Content-Type": "multipart/form-data" },
          success: res => {					// 上传成功的回调函数
            let d = JSON.parse(res.data)
            let obj = d.obj
            if (res.statusCode == 200) {
              // 上传成功后，把路径set到data 里
              f.push({
                "fileCode": e.currentTarget.dataset['index'],
                "fileName": obj[0].fileRealName,
                "fileUrl": obj[0].realPath + obj[0].fileRealName
              })
              imgs1.push(obj[0].path);
              // 页面预览
              that.setData({
                imgs1: imgs1,
                f: f
              });
            }
          },
          fail: res => {
            that.showToast({
              title: '上传失败'
            })
          }
        })
        
      }
    })
  },
  checkboxChange: function (e) {
    this.setData({ checkBoxList: [] })
    const item = e.detail.value //选中的数组
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