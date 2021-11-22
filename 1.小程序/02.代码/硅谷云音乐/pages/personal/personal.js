// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于控制元素在页面上的移动
        moveDistance:0,

        // 用于控制元素移动的过渡效果
        moveTransition:"",

        // 用于存储用户信息
        userInfo:{}
    },

    // 用于跳转Login页面
    toLogin(){
        wx.navigateTo({
          url: '/pages/login/login',
        })
    },

    // 用于监视用户的手指抬起操作
    handleTouchEnd(event){
        // this.startY = event.changedTouches[0].clientY;
        // console.log('handleTouchStart',startY)
        this.setData({
            moveDistance:0,
            moveTransition:"transform 1s"
        })

    },

    // 用于监视用户的手指按下操作
    handleTouchStart(event){
        this.startY = event.changedTouches[0].clientY;
        // console.log('handleTouchStart',startY)
        this.setData({
            moveTransition:""
        })

    },

    // 用于监视用户的手指移动操作
    handleTouchMove(event){
        // console.log('handleTouchMove',moveY)
        const moveY = event.changedTouches[0].clientY;
        // console.log('handleTouchMove',moveY)
        const moveDistance = moveY - this.startY
        if(moveDistance<=0||moveDistance>=80)return;
        this.setData({
            moveDistance
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        // 由于当前页面并不会销毁,所以此处如果想要每次进入都读取到用户信息,必须在onShow中执行

        const userInfo = wx.getStorageSync("userInfo");
        this.setData({
            userInfo
        })
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