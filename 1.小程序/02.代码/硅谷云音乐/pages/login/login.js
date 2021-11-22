// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:"17777777",
        password:""
    },

    // 用于收集用户输入的手机号
    handlePhone(event){
        // 如何获取到input框的内容
        // 通过event.detail.value可以获取到最新value值
        // console.log('handlePhone',event)
        const value = event.detail.value;
        this.setData({
            phone:value
        })
    },

    // 用于收集用户输入的密码
    handlePassWord(event){
        // 如何获取到input框的内容
        // 通过event.detail.value可以获取到最新value值
        // console.log('handlePhone',event)
        const value = event.detail.value;
        this.setData({
            password:value
        })
    },

    handleInput(event){
        // 小程序实现对事件回调函数内部进行传参的方法:通过自定义属性实现
        // console.log(event)
        const type = event.target.dataset.type;
        const value = event.detail.value;
        this.setData({
            [type]:value
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