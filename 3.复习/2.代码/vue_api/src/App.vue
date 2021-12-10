<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="changeEdit" v-if="!isEdit">添加</button>
    <input ref="inputref" v-else type="text">
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    changeEdit(){
      /*
        Vue状态更新
          数据更新,是同步更新
          视图更新,是异步更新(有延迟)

      */
      this.$nextTick(()=>{
        this.$refs.inputref.focus();
        // console.log('nextTick1')
      })
      this.isEdit=true;
      // console.log(this.isEdit)
      // debugger

      // 有个无形的nextTick

      Promise.resolve().then(()=>{
        console.log('then1')
      })
      Promise.resolve().then(()=>{
        console.log('then2')
      })
      this.$nextTick(()=>{
        console.log('nextTick2')
      })
    }
  },
  data(){
    return {
      isEdit:false
    }
  },
  a:124,
  mounted(){
    // console.log('a',this.$options.a)
    /*
      nextTick可以开启异步效果
        他的原理是.then微任务
    
    */

  //  setTimeout(()=>{
  //    console.log('setTimeout')
  //  },0)
  //  Promise.resolve().then(()=>{
  //    console.log('then1')
  //  })
   
  //  this.$nextTick(()=>{
  //    console.log('nextTick1')
  //  })
  //  Promise.resolve().then(()=>{
  //    console.log('then2')
  //  })
   
  //  this.$nextTick(()=>{
  //    console.log('nextTick2')
  //  })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
