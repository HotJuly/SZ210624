// pages/recommendSong/recommendSong.js
import axios from '../../utils/axios';
import hasPermission from '../../utils/hasPermission';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day:"--",
        month:"--",

        // 用于存储显示页面的推荐歌曲列表
        recommendList:[]
    },

    // 用于跳转song页面操作
    toSong(event){

        // console.log(event.currentTarget.dataset.song)
        // const song = event.currentTarget.dataset.song;

        const songId = event.currentTarget.dataset.songid
        // 小程序只支持路由query传参
        wx.navigateTo({
          url: '/pages/song/song?songId='+songId,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        if(!hasPermission())return;

        const date = new Date();
        const day = date.getDate();
        // console.log(day)
        const month = date.getMonth() + 1;
        this.setData({
            month,
            day
        })

        const result = await axios("/recommend/songs");
        // console.log('result',result)
        this.setData({
            recommendList:result.recommend
        })
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