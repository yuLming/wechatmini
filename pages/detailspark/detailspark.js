const app = getApp();
Page({

  /**
   * 组件的初始数据
   */
  data: {
    obj: {}
  },
  onLoad: function (options) {
    console.log(options.item)
    let obj = JSON.parse(options.item); 
    this.setData({
      obj: obj
    })

    console.log("options.applyId===", this.data.obj)
  }
})
