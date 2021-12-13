import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/A.vue';
import About from '../components/B.vue';

Vue.use(VueRouter);

/*
    路由是什么?
        路由分为前端路由和后端路由
            前端路由就是路由路径和路由组件之间的映射关系
            后端路由就是路由路径+请求方法与路由回调函数之间的映射关系

            router.get('/getIndex',()=>{})
*/
export default new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/Home",
            component:Home
        },
        {
            path:"/About",
            component:About
        }
    ]
})