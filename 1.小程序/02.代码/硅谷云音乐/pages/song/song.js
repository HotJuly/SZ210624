// pages/song/song.js
import PubSub from 'pubsub-js';
import moment from 'moment';
import axios from '../../utils/axios';

let appInstance = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

        // 用于存储当前页面歌曲详细信息
        songObj:{},

        // 用于存储当前页面歌曲Id,
        songId:null,

        // 用于存储当前页面的播放状态
        isPlay:false,

        // 用于存储当前页面歌曲的音频链接
        musicUrl:"",

        // 用于存储当前歌曲播放时间
        currentTime:"00:00",

        // 用于存储当前歌曲总时长
        durationTime:"--:--",

        // 用于存储当前歌曲进度条宽度
        currentWidth:0
    },

    // 用于绑定与背景音频相关的事件
    addEvent(){
        // 用于监视背景音频播放事件
        this.backgroundAudioManager.onPlay(()=>{
            // console.log('onPlay')

            // 缓存当前背景音频的歌曲播放状态,留作后续进入页面判断使用
            appInstance.globalData.playState = true;

            this.setData({
                isPlay:true
            })
        })

        // 用于监视背景音频暂停事件
        this.backgroundAudioManager.onPause(()=>{
            // console.log('onPause')

            // 缓存当前背景音频的歌曲播放状态,留作后续进入页面判断使用
            appInstance.globalData.playState = false;
            this.setData({
                isPlay:false
            })
        })

        // 用于监视背景音频进度更新事件
        this.backgroundAudioManager.onTimeUpdate(()=>{
            // console.log('onTimeUpdate',moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss"))

            const currentTime = this.backgroundAudioManager.currentTime*1000;

            const durationTime = this.data.songObj.dt;

            const currentWidth = currentTime/durationTime*100;
            this.setData({
                currentTime:moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss"),
                currentWidth
            })
        })
    },

    // 专门用于请求当前歌曲的音频链接
    async getMusicUrl(){
        const result1 = await axios("/song/url",{id:this.data.songId});

        this.setData({
            musicUrl:result1.data[0].url
        })
    },

    // 专门用于请求当前歌曲的详细信息
    async getMusicDetail(){
        const result = await axios("/song/detail",{ids:this.data.songId});
        // console.log(result)

        this.setData({
            songObj:result.songs[0],
            durationTime:moment(result.songs[0].dt).format("mm:ss")
        })

        // 由于当前的页面标题,只有等到请求成功之后才能确定,所以需要使用动态注入的方法实现
        wx.setNavigationBarTitle({
            title:this.data.songObj.name
        })
    },

    // 用于监视用户点击上下首操作,并实现切歌功能
    switchType(event){

        // 获取到当前用户的操作标识
        const type = event.currentTarget.id;
        PubSub.publish('switchType',type);
    },

    // 用于监视用户点击播放按钮操作
    async handlePlay(){
        // console.log('handlePlay')

        if(!this.data.musicUrl){
            await this.getMusicUrl();
        }
        
            
        // 1.获取到全局唯一的背景音频管理器
        // const backgroundAudioManager = wx.getBackgroundAudioManager();

        // 需要判断当前处于什么播放状态
        // 如果正在播放,那么暂停音频播放
        // 如果处于暂停状态,那么播放音频
        if(this.data.isPlay){
            // 能进入该判断,说明当前页面正在播放音频
            this.backgroundAudioManager.pause(); 

            // 缓存当前背景音频的播放歌曲Id,留作后续进入页面判断使用
            appInstance.globalData.playState = false;
        }else{
            // 2.给背景音频管理器对象添加src属性,就可以实现自动播放歌曲功能
            this.backgroundAudioManager.src  = this.data.musicUrl
            this.backgroundAudioManager.title  = this.data.songObj.name

            // 缓存当前背景音频的播放状态,留作后续进入页面判断使用
            appInstance.globalData.audioId = this.data.songId;
            // 缓存当前背景音频的播放歌曲Id,留作后续进入页面判断使用
            appInstance.globalData.playState = true;
        }

        this.setData({
            isPlay:!this.data.isPlay
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad:async function (options) {
        // options就是路由传参的query对象
        // query传参是将数据拼接在url中,但是url具有长度限制
        // console.log(options)

        // let {song} = options;
        // song = JSON.parse(song)

        // 从options对象中获取到query传参传递过来的歌曲id
        const {songId} = options;

        this.setData({
            songId
        })

        
        this.backgroundAudioManager = wx.getBackgroundAudioManager();

        this.getMusicDetail();


        // console.log('appInstance1',appInstance.a.msg)
        // appInstance.a.msg = "我是全局修改之后的数据"
        // console.log('appInstance2',appInstance.a.msg)

        // 如果背景音频正在播放的歌曲和当前显示的歌曲是同一首歌
        const {audioId,playState} = appInstance.globalData;
        // console.log(audioId,this.data.songId)
        if(playState&&audioId==this.data.songId){
            this.setData({
                isPlay:true
            })
        }

        // console.log('PubSub',PubSub)
        
        this.token = PubSub.subscribe('sendId',async (msg,songId)=>{
            // console.log('sendId',msg,songId)
            this.setData({
                songId
            })

            // 根据最新的歌曲id,请求最新的歌曲详情和歌曲链接,并进行播放
            this.getMusicDetail();

            await this.getMusicUrl();

            // 2.给背景音频管理器对象添加src属性,就可以实现自动播放歌曲功能
            this.backgroundAudioManager.src  = this.data.musicUrl
            this.backgroundAudioManager.title  = this.data.songObj.name

            appInstance.globalData.audioId = this.data.songId;
            appInstance.globalData.playState = true;

            this.setData({
                isPlay:true
            })
        })

        this.addEvent();
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
        PubSub.unsubscribe(this.token)
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