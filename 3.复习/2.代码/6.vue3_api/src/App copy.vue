<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <h1>我是obj:{{obj.name}}</h1>
  <h1>我是obj2:{{obj2.name}}</h1> -->
  <h1>名字:{{user.name}}</h1>
  <h1>年龄:{{user.age}}</h1>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import { reactive} from 'vue'
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  // setup(){
  //   var obj = {
  //     name:"xiaoming",
  //     age:12
  //   }

  //   /*
  //     使用reactive会存在两个对象
  //       一个是目标对象
  //       一个是代理对象
  //       如果想要具有响应式效果,一定要通过代理对象进行操作
  //       直接操作目标对象,虽然值会发生修改,但是页面不会重新渲染

  //       reactive生成的是代理对象,对该对象的任何操作,都会导致页面渲染,也会同步修改目标对象

  //       ref生成的是ref对象,对象身上具有value属性,是个响应式属性,
  //         如果属性值是一个对象,会将该对象交给reactive加工

  //       注意:ref相比于reactive,它可以监视对象地址值的变化
  //   */
  //   var obj2 = reactive(obj)
  //   // console.log(obj,obj2)
  //   // var obj2 = ref(obj)
  //   // console.log(obj,obj2)

  //   var handleClick = ()=>{
  //     // obj2.name+="1"
  //     // console.log(obj,obj2)
  //     obj2={
  //       name:"xiaoming1",
  //       age:12
  //     }

  //     console.log(obj2)
  //   }

  //   return {
  //     obj,
  //     obj2,
  //     handleClick
  //   }
  // }
}
</script>


<style></style>
