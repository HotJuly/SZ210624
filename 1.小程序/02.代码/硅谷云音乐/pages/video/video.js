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
        navId:null,

        // 用于存储视频列表数据
        videoList:[],

        // 用于控制scroll-view组件下拉刷新动画的状态
        isTrigger:false,

        // 用于控制video组件的显示
        currentId:null
    },

    // 用于监视用户点击图片操作,自动切换显示对应的video组件
    handleChange(event){
        const currentId = event.currentTarget.id;
        // console.log(id)
        // setData可以传入第二个实参,数据类型为函数
        // 这个函数会在视图更新之后,才会调用,类似于Vue的$nextTick
        this.setData({
            currentId
        },()=>{
            
            // 1.创建获得video上下文对象
            const videoContext = wx.createVideoContext(currentId);
            
            // 2.调用暂停视频的API
            videoContext.play()
        })

    },

    // 用于监视用户上拉视频列表区域触底操作
    handleReachBottom(){
        // console.log('handleReachBottom')
        if(this.flag)return;
        this.flag=true;
        setTimeout(()=>{
            this.setData({
                videoList:[...this.data.videoList,...this.data.videoList.slice(0,8)]
            })
            this.flag=false;
        },1000);
    },

    // 用于监视用户下拉视频列表区域操作
    async handlePullDown(){
        // console.log('handlePullDown')
        await this.getVideoList();

        this.setData({
            isTrigger:false
        })
    },

    // 用于测试暂停视频播放API
    testAPI(){
        // console.log('testAPI')

        // 1.创建获得video上下文对象
        const videoContext = wx.createVideoContext("656BE6E5FA6FE13BC80EDA7C3FCDAEBB");


        // 调用暂停视频的API
        videoContext.pause()
    },

    // 用于监视用户播放视频操作
    handlePlay(event){
        // console.log('handlePlay',this.oldVid)


        // 获取到当前视频的id
        const vid = event.currentTarget.id;

        if(this.oldVid&&vid!==this.oldVid){
            // 1.创建上一个视频的video上下文对象
            const videoContext = wx.createVideoContext(this.oldVid);
            
            // 2.调用暂停视频的API
            videoContext.pause();
        }
        
        this.oldVid = vid;
    },

    // 专门用于请求对应分组视频列表
    async getVideoList(){
        this.setData({
            videoList:[]
        })

        const result2 = await axios('/video/group',{id:this.data.navId})
        
        // console.log('result2',result2)
        this.setData({
            videoList:result2.datas.map((item)=>{
                return item.data
            })
        })
        console.log(2)
    },

    // 用于监视用户点击导航选项,控制下划线切换
    async changeNavId(event){
        /*
        currentTarget->代表的是事件源对象(绑定事件的组件,永远不会发生变化)
        target->代表的是最内层触发者(这个可能根据用户操作发生变化)
        
        */
        // console.log(event.currentTarget.dataset.id,event.target.dataset.id)
        const navId = event.currentTarget.dataset.id
        this.setData({
            navId
        })

        wx.showLoading({
            title:"加载中,请稍等"
        })
        console.log(1)

        await this.getVideoList();

        console.log(3)
        wx.hideLoading();
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
            navList:result.data.slice(0,14),
            navId:result.data[0].id
        })

        // console.log('navId',this.data.navId)
        // const result2 = await axios('/video/group',{id:this.data.navId})
        // // console.log('result2',result2)
        // this.setData({
        //     videoList:result2.datas.map((item)=>{
        //         return item.data
        //     })
        // })

        this.getVideoList();
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
    onPullDownRefresh:async function () {
        console.log('onPullDownRefresh')
        // 在此处请求最新数据即可
        const result = await axios('/video/group/list');

        this.setData({
            navList:result.data.slice(0,14),
            navId:result.data[0].id
        })

        this.getVideoList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('onReachBottom')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})