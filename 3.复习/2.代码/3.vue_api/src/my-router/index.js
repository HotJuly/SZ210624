import Vue from 'vue';
import install from './install';

function deepMapRoutes(routes){
    routes.forEach((routeObj)=>{
        this[routeObj.path] = routeObj.component;
        if(routeObj.children?.length){
            deepMapRoutes.call(this,routeObj.children);
        }
    })
}

class VueRouter{
    constructor(options){
        this.$options = options;

        this.routes = options.routes;

        /*
            routes是个数组,在数组中找到某个匹配路径的对象的component属性,速度太慢了
            所以需要处理数据结构
            原先的数据结构:
                [
                    {
                        path:"/Home",
                        component:Home,
                        children:[{
                            path:"/Home/xixi",
                            component:Xixi
                        }]
                    },
                    {
                        path:"/About",
                        component:About
                    }
                ]
            
            想要的数据结构:
                {
                    "/home":Home,
                    "/about":About,
                    "/home/xixi":xixi
                }
        
        */

        this.mapRoutes= {};

        deepMapRoutes.call(this.mapRoutes,this.routes);

        // console.log(this.mapRoutes);

        Vue.prototype.$router = this;

        Vue.prototype.$route = Vue.observable({
            path:window.location.pathname
        })

    }

    push(path){
        /*
            1.控制浏览器历史记录栈变化
            2.控制页面展示最新的组件
        */
        window.history.pushState({},'',path);

        Vue.prototype.$route.path = path;
    }

    replace(path){
        /*
            1.控制浏览器历史记录栈变化
            2.控制页面展示最新的组件
        */
        window.history.replaceState({},'',path);

        Vue.prototype.$route.path = path;
    }
}
// new VueRouter({
//     mode:"history",
//     routes:[
//         {
//             path:"/Home",
//             component:'home'
//         },
//         {
//             path:"/About",
//             component:'about'
//         }
//     ]
// })
VueRouter.install = install;

export default VueRouter