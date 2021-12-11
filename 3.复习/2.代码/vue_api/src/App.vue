<template>
  <div id="app">
    <!-- <HelloWorld :value="msg" @input="data=>msg=data" /> -->
    <HelloWorld ref="hello" a="1" b="2" v-model="msg" />
    <!-- <input type="text" v-model="msg"> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"> -->
    <h1 ref="h1">{{msg}}</h1>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"我是初始化数据",
      phone:"18888888"
    }
  },
  mounted(){
    // console.log('children',this.$children)
    // this.$children[0]

    console.log('hello',this.$refs.hello)
  }
}
</script>

<style>
</style>
