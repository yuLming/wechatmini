// pages/sweep/sweep.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifGiveUp: '',     // 是否有自愿放弃书
    ifKeyToCar: '',   // 是否有车钥匙
    ifXSZ: '',        // 是否有行驶证
    showModal: false,   // 模态框默认关闭
    files: [],          // 接收文件单子
    imgs: [],   // 存放图片
    basqbh: '', //申请编号
    bacjhm: '', //车架号
    baclzz: '', //制造商
    baclcx: '', //车系
    bacx: '', //车型
    carcolor: '', //车颜色
    address: '', //停放位置,
    carNo: '',//车牌号
    //可执行操作
    actions: [],
    type: "",
    result: "",
    user: '',
    checkBoxList: []//被选中的checkbox
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type;
    const result = options.result;

    const appUserInfo = app.globalData.getUserInfo();

    this.setData({
      type: type,
      result: result,
      user: appUserInfo.XTCZDM
    })
    const param = {
      "type": type,
      "condition": result,
      "user": appUserInfo.XTCZDM

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
          carNo: obj.carNo,
          files: obj.files   // 接收文件单子
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
    console.log('ifGiveUpChecked事件，携带value值为：', this.data.ifGiveUp)
  },
  ifKeyToCarChecked: function (e) {
    this.setData({
      ifKeyToCar: e.detail.value
    })
    console.log('ifKeyToCarChecked事件，携带value值为：', this.data.ifKeyToCar)
  },
  ifXSZChecked: function (e) {
    this.setData({
      ifXSZ: e.detail.value
    })
    console.log('ifXSZChecked事件，携带value值为：', this.data.ifXSZ)
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
    if (this.data.checkBoxList.length == 0) {
      app.alert("请选择您要执行的操作");
      return false;
    }
    if(!this.data.ifGiveUp || !this.data.ifKeyToCar || !this.data.ifXSZ){
      app.alert("不忘忘记是否按钮")
      return false
    }
    if (this.data.imgs.length < 3) {
      app.alert("别忘记上传图片");
      return false;
    }

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
        if (res.data.success) {
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
            mask: true,
            duration: 3000
          })
          this.setData({
            showModal: true
          })
          // wx.switchTab({
          //   url: '/pages/index/index'　　// 页面 A
          // })

        } else {
          app.alert(res.data.msg);

        }
      }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
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
    let a = e.currentTarget.dataset['index']
    console.log("123123123",a)

    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    let imagePaths
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],   // 'original',
      sourceType: ['camera'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        imagePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        // console.log(imagePaths + '----');
        for (var i = 0; i < imagePaths.length; i++) {
          imgs.push(imagePaths[i]);
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    })
    // wx.uploadFile 接口只能一次上传 1 张图片
    wx.uploadFile({
      url: api.apiRootUrl + '/distribution/addPicture',   // 后台服务URL
      filePath: path,   // 微信返回的临时图片地址
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      success: res => {					// 上传成功的回调函数
        if (res.code == 200) {
          // 上传成功后，把路径set到data 里
          
        } else {
          this.showToast({
            title: '上传失败'
          })
        }
      }
    })


  },
  checkboxChange: function (e) {

    this.setData({ checkBoxList: [] })

    const item = e.detail.value //选中的数组
    console.log("选中的数组", item);
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