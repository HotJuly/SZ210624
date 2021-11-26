// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js';
import axios from '../../../utils/axios';
import hasPermission from '../../../utils/hasPermission';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day:"--",
        month:"--",

        // 用于存储显示页面的推荐歌曲列表
        recommendList:[],

        // 用于存储当前用户进入的歌曲下标
        currentIndex:null
    },

    // 用于跳转song页面操作
    toSong(event){

        // console.log(event.currentTarget.dataset.song)
        // const song = event.currentTarget.dataset.song;

        const songId = event.currentTarget.dataset.songid;

        // 记录当前用户点击的是哪一首歌,用于后续切歌功能
        const currentIndex = event.currentTarget.dataset.index;

        this.setData({
            currentIndex
        })

        // 小程序只支持路由query传参
        wx.navigateTo({
          url: '/songs/pages/song/song?songId='+songId,
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

        PubSub.subscribe("switchType",(msg,type)=>{
            // PubSub订阅函数的第一个参数一定是消息名称,第二个才是传递的数据
            // console.log('switchType',msg,type)

            let {recommendList,currentIndex} = this.data;
            if(type==="next"){
                // 能进入该判断,说明用户点击了下一首
                // 如果当前已经是最后一首歌,那么回到第一首
                if(currentIndex===recommendList.length-1){
                    currentIndex=0;
                }else{
                    currentIndex++;
                }
            }else{
                // 能进入该判断,说明用户点击了上一首
                if(currentIndex===0){
                    currentIndex=recommendList.length-1;
                }else{
                    currentIndex--;
                }
            }

            // 通过下标配合推荐列表成功找到对应歌曲id
            const songId = recommendList[currentIndex].id;
            console.log('songId',songId)

            PubSub.publish('sendId',songId)

            this.setData({
                currentIndex
            })
            // console.log('switchType',recommendList[currentIndex].id)
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