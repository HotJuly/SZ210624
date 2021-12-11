<template>
  <div id="app">
    <!-- <HelloWorld :value="msg" @input="data=>msg=data" /> -->
    <!-- <HelloWorld ref="hello" :msg.sync="msg" /> -->
    <HelloWorld ref="hello" :msg="msg" @update:msg="data=>msg=data" />
    <!-- <input type="text" v-model="msg"> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"> -->
    <h1 ref="h1" @click="handleClick">{{msg}}</h1>
    <h2 v-once>{{user.name}}</h2>
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
      phone:"18888888",
      user:{
        name:"123"
      }
    }
  },
  mounted(){
    // console.log('children',this.$children)
    // this.$children[0]

    console.log('hello',this.$refs.hello)
  },
  methods:{
    handleClick(){
      // this.user.name=123;
      // this.$forceUpdate();
      // this.$destroy();
      // console.log(123)
      this.user.name=222222;
      console.log(123)
    }
  }
}
</script>

<style>
</style>
