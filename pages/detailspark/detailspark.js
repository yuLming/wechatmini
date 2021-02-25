const app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    obj: {}
  },
  onLoad: function (options) {
    let obj = JSON.parse(options.item); 
    this.setData({
      obj: obj
    })

  }
})
