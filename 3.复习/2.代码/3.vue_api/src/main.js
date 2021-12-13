import Vue from 'vue'
import App from './App.vue'

import router from './router';

Vue.config.productionTip = false

// Vue.config.devtools = true

// Vue.config.optionMergeStrategies.a=function(a,b,c){
//   console.log(a,b,c)
//   return b+=2
// }

/*
  面试题:请问你是如何捕获项目中出现的错误的？
    答:try...catch(e)...

  面试题升级:请问你是如何捕获项目上线之后出现的错误的?
    拆解:
      1.如何知道用户端出现的错误?
        使用Vue.config.errorHandler可以捕获到用户整个项目运行出现的错误
      2.如何将错误收集到?
        在错误回调函数中,将错误信息发送ajax至公司服务器,后端人员将收集到的错误汇总成表交给我们

    如果是在没使用到框架的情况下,想要捕获出现的错误
      window.onerror=function(){}

*/

// Vue.config.errorHandler=function(a,b,c){
//   console.log(a,b,c)
// }

// Vue.filter('myFilter',function(value){
//     console.log(value)
//     return value+"1"
// })

// Vue.mixin({
//   mounted(){
//     console.log(this.$options.name)
//   }
// })


/*
  控制Vue页面显示内容的方式:
    1.给根组件的配置对象添加template属性(想使用该属性必须开启完整版Vue)
    2.给根组件的配置对象添加render方法
    3.给模版元素内部写入Vue的template代码(它可以被Vue识别)

    优先级:render>template>index.html模版

*/
new Vue({
  el:"#app",
  // template:"<div><span>{{ msg }}</span></div>",
  data: {
    msg: 'hello'
  },
  name:"Root",
  router,
  render: createElement => createElement(App),
}).$mount('#app')

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   el:"#app",
//   data: {
//     msg: 'hello'
//   },
//   render: res.render,
// })
