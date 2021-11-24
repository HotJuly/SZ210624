// pages/song/song.js
import axios from '../../utils/axios';
Page({

    /**
     * 页面的初始数据
     */
    data: {

        // 用于存储当前页面歌曲详细信息
        songObj:{},

        // 用于存储当前页面的播放状态
        isPlay:false,

        // 用于存储当前页面歌曲的音频链接
        musicUrl:""
    },

    // 用于监视用户点击播放按钮操作
    handlePlay(){
        // console.log('handlePlay')
        
            
        // 1.获取到全局唯一的背景音频管理器
        const backgroundAudioManager = wx.getBackgroundAudioManager();

        // 需要判断当前处于什么播放状态
        // 如果正在播放,那么暂停音频播放
        // 如果处于暂停状态,那么播放音频
        if(this.data.isPlay){
            // 能进入该判断,说明当前页面正在播放音频
            backgroundAudioManager.pause(); 
        }else{
            // 2.给背景音频管理器对象添加src属性,就可以实现自动播放歌曲功能
            backgroundAudioManager.src  = this.data.musicUrl
            backgroundAudioManager.title  = this.data.songObj.name
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

        const result = await axios("/song/detail",{ids:songId});
        // console.log(result)

        this.setData({
            songObj:result.songs[0]
        })

        // 由于当前的页面标题,只有等到请求成功之后才能确定,所以需要使用动态注入的方法实现
        wx.setNavigationBarTitle({
            title:this.data.songObj.name
        })

        const result1 = await axios("/song/url",{id:songId});
        // console.log(result1)

        this.setData({
            musicUrl:result1.data[0].url
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