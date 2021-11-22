// pages/personal/personal.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于控制元素在页面上的移动
        moveDistance:0
    },

    // 用于监视用户的手指按下操作
    handleTouchStart(event){
        this.startY = event.changedTouches[0].clientY;
        // console.log('handleTouchStart',startY)

    },

    // 用于监视用户的手指移动操作
    handleTouchMove(event){
        // console.log('handleTouchMove',moveY)
        const moveY = event.changedTouches[0].clientY;
        // console.log('handleTouchMove',moveY)
        const moveDistance = moveY - this.startY
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