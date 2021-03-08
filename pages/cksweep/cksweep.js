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
    imgs2: [],   // 存放图片
    imgs3: '',   // 存放图片
    applyName: '',  // 客户姓名
    basqbh: '', //申请编号
    bacjhm: '', //车架号
    baclzz: '', //制造商
    baclcx: '', //车系
    bacx: '', //车型
    carcolor: '', //车颜色
    address: '', //停
    tcrName: '',
    tcrPhone: '',
    actions: [],
    type: "",
    result: "",
    user: '',
    checkBoxList: [],//被选中的checkbox
    name: '',
    phone: '',
    czrq: ''
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
    const param = {
      "type": '2',
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
        /**
         * 重复入库操作
         */
        // if(res.data.data.applyName=="1"){
        //   wx.showModal({
        //     title: '注意',
        //     content: '车辆已入库，请勿重复操作',
        //     showCancel: false,
        //     success(res) {
        //       if (res.confirm) {
        //         wx.switchTab({
        //           url: '/pages/index/index'　　// 页面 A
        //         })
        //       }
        //     }
        //   }) 
        // }
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
          operType: obj.operType,
          name:obj.tcrName,//提车人姓名
          phone: obj.tcrPhone,//提车人电话
          czrq: obj.czrq,//处置日期
          imgs3: obj.sfzlj//身份证预览地址
        })
        // f.push({
        //   "fileCode": e.currentTarget.dataset['index'],
        //   "fileName": obj[0].fileRealName,
        //   "fileUrl": obj[0].realPath + obj[0].fileRealName
        // })
        // this.imgs3.push(obj.sfzlj);
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
  setName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  setPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  operaCarStock: function () {
    console.log(123)
   
var myreg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    let time = new Date();
    let date = time.toLocaleDateString()
    this.setData({
      atDate: date
    })
   
    
    if (this.data.name.length==0) {
      app.alert("请输入提车人姓名");
        return false;
    }
    if (this.data.phone.length==0) {
      app.alert("请输入提车人电话");
        return false;
    }else if (this.data.phone.length<11) {
      app.alert("请输入正确手机号码");
        return false;
    }else if(!myreg.test(this.data.phone)){
      app.alert("手机号格式不正确");
      return false;

    }
    const l = this.data.f
    if (l.length < 2) {
      app.alert("别忘记上传图片");
      return false;
    }
    let str = "";
    for (let k in l) {
      let files = l[k]
      str += files.fileCode + ","
    }
  //验证图片信息
    if (str.indexOf("6503") == -1) {
      app.alert("别忘记上传人车合影");
      return false;
    } else if (str.indexOf("6502") == -1) {
      app.alert("别忘记上传出库单");
      return false;
    }
    if (this.data.imgs1.length < 1) {
      app.alert("别忘记上传人车合影");
        return false;
    }
    if (this.data.imgs2.length < 1) {
      app.alert("别忘记上传出库单");
        return false;
    }
   
  
    const param = {
      "type": 'stockOutput',
      "oprAcct": this.data.user,
      "files": this.data.f,
      "basqbh":this.data.basqbh,
      "frameNo": this.data.bacjhm,
      "name": this.data.name,
      "phone": this.data.phone
    };
 
    wx.request({
      url: app.globalData.getRealUrl("ckScanSubmit"),
      method: 'GET',
      dataType: 'json',
      data: param,
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success: (res) => {
        if (res.data.code == 100) {
          this.setData({
            showModal: true,
            disabled: true
          })
      //      wx.showModal({
      //   title: '注意',
      //   content: '出库成功',
      //   showCancel: false,
       
      // })
        } else {
          app.alert(res.data.message);
        }
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
  deleteImg2: function (e) {
    var imgs2 = this.data.imgs2;
    var index = e.currentTarget.dataset.index;
    imgs2.splice(index, 1);
    this.setData({
      imgs2: imgs2
    });
  },
  deleteImg3: function (e) {
    var imgs3 = this.data.imgs3;
    var index = e.currentTarget.dataset.index;
    imgs3.splice(index, 1);
    this.setData({
      imgs3: imgs3
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
  // // 预览图片
  previewImg2: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs2 = this.data.imgs2;
    wx.previewImage({
      //当前显示图片
      current: imgs2[index],
      //所有图片
      urls: imgs2
    })
  },
  // // 预览图片
  previewImg3: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs3 = this.data.imgs3;
    wx.previewImage({
      //当前显示图片
      current: imgs3[index],
      //所有图片
      urls: imgs3
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
    var imgs2 = that.data.imgs2;
    
    // var o
    let imagePaths
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],   // 'original',
      sourceType: ['camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        
      
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
              if(e.currentTarget.dataset['index'] == "6503" || e.currentTarget.dataset['index'] == "6503"){
                imgs1.push(obj[0].path);
              }
              if(e.currentTarget.dataset['index'] == "6502" || e.currentTarget.dataset['index'] == "6502"){
                imgs2.push(obj[0].path);
              }
             
              // 页面预览
              that.setData({
                imgs1: imgs1,
                imgs2: imgs2,
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