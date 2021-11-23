// pages/video/video.js
import axios from '../../utils/axios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储导航栏列表
        navList:[],

        // 用于记录当前用户点击的导航选项
        navId:58100
    },

    // 用于监视用户点击导航选项,控制下划线切换
    changeNavId(event){
        /*
        currentTarget->代表的是事件源对象(绑定事件的组件,永远不会发生变化)
        target->代表的是最内层触发者(这个可能根据用户操作发生变化)
        
        */
        // console.log(event.currentTarget.dataset.id,event.target.dataset.id)
        const navId = event.currentTarget.dataset.id
        this.setData({
            navId
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
    onShow:async function () {
        const result = await axios('/video/group/list');

        this.setData({
            navList:result.data.slice(0,14)
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