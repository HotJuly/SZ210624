// pages/index/index.js
import axios from '../../utils/axios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用于存储轮播图数据
        banners:[],

        // 用于存储推荐歌曲区域数据
        recommendList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        /*
            1.在哪发
                onLoad
            2.怎么发
                API:wx.request(Object object)
            3.往哪发
                看接口文档url:/banner
            注意:小程序中,全局对象不是window,全局对象是wx
        */
    //    console.log(wx)
        // let result = await axios('/banner',{type:2});
        axios('/banner',{type:2})
        .then((result)=>{
            this.setData({
                banners:result.banners
            })
        })

        
        axios('/personalized')
        .then((result)=>{
            this.setData({
                recommendList:result.result
            })
        })
        

        
        // let result1 = await axios('/personalized');
        
        // this.setData({
        //     recommendList:result1.result
        // })
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