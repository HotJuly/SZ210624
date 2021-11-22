// pages/login/login.js
import axios from '../../utils/axios';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone:"17688197777",
        password:""
    },

    // 用于监视用户点击登录按钮,实现登录功能
    async handleLogin(){
        /*
            1.收集数据
            2.处理数据格式
            3.表单验证
                前端表单验证
                后端表单验证
            4.发送请求
            5.成功做什么,失败做什么

        */
        // console.log('handleLogin')
        // 1.收集数据
        const {phone,password} = this.data;

        // 3.表单校验
        if(!phone.trim()){
            wx.showToast({
                title:"请输入手机号",
                icon:"error"
            })
            return;
        }
        if(!password.trim()){
            wx.showToast({
                title:"请输入密码",
                icon:"error"
            })
            return;
        }

        // 4.发送请求
        const result = await axios("/login/cellphone",{phone,password});

        // 5.成功做什么,失败做什么
        /*
            状态码:
                400 ->  手机号错误
                501 ->  手机号不存在
                502 ->  密码错误
                200 ->  登录成功
        */

        const code = result.code;
    //    console.log('result',result)
        // if(code===200){
        //     wx.showToast({
        //         title:"登陆成功"
        //     });
        //     return;
        // }else if(code===400){
        //     wx.showToast({
        //         title:"手机号错误",
        //         icon:"error"
        //     });
        //     return;
        // }else if(code===501){
        //     wx.showToast({
        //         title:"手机号不存在",
        //         icon:"error"
        //     });
        //     return;
        // }else if(code===502){
        //     wx.showToast({
        //         title:"密码错误",
        //         icon:"error"
        //     });
        //     return;
        // }

        // 策略模式写法
        const codeFn = {
            200(){
                wx.showToast({
                    title:"登陆成功"
                });
                wx.switchTab({
                  url: '/pages/personal/personal',
                })
                wx.setStorage({
                    key:"userInfo",
                    data:result.profile
                })
            },
            400(){
                wx.showToast({
                    title:"手机号错误",
                    icon:"error"
                });
            },
            501(){
                wx.showToast({
                    title:"手机号不存在",
                    icon:"error"
                });
            },
            502(){
                wx.showToast({
                    title:"密码错误",
                    icon:"error"
                });
            },
        }
        codeFn[code]&&codeFn[code]();
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