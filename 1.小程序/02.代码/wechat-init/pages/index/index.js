// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    /* 乞丐版深拷贝:JSON.parse(JSON.stringify(data))
      缺点:
        1.无法拷贝函数
        2.这种拷贝会丢失原型链
        3.如果遇到数据类型为Set(转为数组),如果遇到Map(转为对象)
    */
    data: {
      msg:"我是初始化数据"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log(this.data.msg)
      // 小程序没有数据劫持
      // this.data.msg="我是修改之后的数据"

      console.log("msg1",this.data.msg)
      this.setData({
        msg:"我是修改之后的数据1"
      })
      this.setData({
        msg:"我是修改之后的数据2"
      })
      this.setData({
        msg:"我是修改之后的数据3"
      })
      console.log("msg2",this.data.msg)
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

    }
})