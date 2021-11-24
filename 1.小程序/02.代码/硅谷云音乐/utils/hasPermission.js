export default function(){
    
    // 如果用户没有登录,后续代码不需要执行
    // 同时弹出模态对话框,提示用户并引导用户跳转登录
    // 1.判断用户是否已经登录   

    if(!wx.getStorageSync('cookie')){
        wx.showModal({
            title:"请先登录",
            content:"该功能需要登陆才能使用",
            confirmText:"去登录",
            cancelText:"回到首页",
            success({confirm}){
                // 无论是点击确定还是取消都会来到成功回调
                // console.log('success',data)

                if(confirm){
                    // 能进入当前判断,说明用户点击了确定按钮
                    wx.navigateTo({
                      url: '/pages/login/login',
                    })
                }else{
                    // 能进入当前判断,说明用户点击了取消按钮
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                }
            },
            fail(){
                console.log('fail')
            }
        })

        return false;
    }
    return true;
}