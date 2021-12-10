import Vue from 'vue'
import App from './App.vue'

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

new Vue({
  name:"Root",
  render: h => h(App),
}).$mount('#app')

// var res = Vue.compile('<div><span>{{ msg }}</span></div>')

// new Vue({
//   el:"#app",
//   data: {
//     msg: 'hello'
//   },
//   render: res.render,
// })
