App({
    globalData:{
        msg:"我是全局的初始化数据",
        audioId:null,
        playState:false
    },
    onLaunch(){
        function PageInit(page){
            Object.keys(page).forEach((key)=>{
                console.log('key',key)
            })
            return Page1(page);
        }
        let Page1 = Page
        Page = PageInit
    }
})