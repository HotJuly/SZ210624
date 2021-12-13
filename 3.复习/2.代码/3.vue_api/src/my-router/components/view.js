import Vue from 'vue';
export default {
    name:"RouterView",
    functional:true,
    render:(createElement, context)=>{
        // console.log(createElement, context)
        // 找到页面需要显示的组件,在这里创建虚拟DOM并且返回即可
        /*
            1.当前路由路径
            2.路由的映射对象
        
        */

        // 1.当前路由路径
        const path = Vue.prototype.$route.path;

        // 2.路由的映射对象
        const mapRoutes = Vue.prototype.$router.mapRoutes;

        const component = mapRoutes[path];

        console.log('path',path,component)



        return createElement(component)
    }
}