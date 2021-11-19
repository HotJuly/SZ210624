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
      msg:"我是初始化数据",
      userInfo:{}
    },

    // 最新版获取用户个人信息
    getUserProfile(){

      wx.getUserProfile({
        desc:"用于测试",
        success:(detail)=>{
          // 能进入这里,说明用户允许授权
          // console.log('success',event)
          this.setData({
            userInfo:detail.userInfo
          })
        }
      })
    },

    // 用于获取用户个人信息
    getUserInfo(event){
      // 无法判断用户点击拒绝还是允许
      // 该回调函数两种情况都会执行
      /*
        通过event.detail.userInfo可以获取到用户信息
      
      */
     const userInfo = event.detail.userInfo;
     if(userInfo){
      //  能进入此处就代表用户允许授权
      this.setData({
        userInfo
      })
     }
      // console.log('getUserInfo',event)
    },

    changeMsg(){
      this.setData({
        msg:"我是修改之后的数据"
      })
    },
    handleClick(){
      // console.log('handleClick')
      // wx.redirectTo({
      //   url:"../log/log"
      // })
      // wx.navigateTo({
      //   url:"../log/log"
      // })
    },
    handleParent(){
      console.log('handleParent')
    },

    // methods:{
    //   handleClick
    // }

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // console.log(this.data.msg)
      // 小程序没有数据劫持
      // this.data.msg="我是修改之后的数据"

      // console.log("msg1",this.data.msg)
      // this.setData({
      //   msg:"我是修改之后的数据1"
      // })
      // this.setData({
      //   msg:"我是修改之后的数据2"
      // })
      // this.setData({
      //   msg:"我是修改之后的数据3"
      // })
      // console.log("msg2",this.data.msg)

      // console.log('--------onLoad---------')



      // wx.getUserInfo({
      //   success:(detail)=>{
      //     // console.log('success',event)
      //     this.setData({
      //       userInfo:detail.userInfo
      //     })
      //   }
      // })


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
      // console.log('--------onReady---------')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      // console.log('--------onShow---------')
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
      // console.log('--------onHide---------')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      // console.log('--------onUnload---------')
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