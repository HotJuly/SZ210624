import Vue from 'vue';
// import VueRouter from '../my-router';
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

const router = new VueRouter({
    mode:"history",
    routes:[
        {
            path:"/home",
            component:Home,
            beforeEnter(to,from,next){
                console.log('beforeEnter',to,from);
                next();
            }
        },
        {
            path:"/about",
            component:About
        }
    ]
});

router.beforeEach((to,from,next)=>{
    console.log('beforeEach',to,from);
    next();
})
export default router;