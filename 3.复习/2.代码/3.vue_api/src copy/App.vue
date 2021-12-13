<template>
  <div id="app" class="B">
    <!-- <HelloWorld :value="msg" @input="data=>msg=data" /> -->
    <!-- <HelloWorld ref="hello" :msg.sync="msg" /> -->
    <!-- <HelloWorld ref="hello" :msg="msg" @update:msg="data=>msg=data" /> -->
    <!-- <input type="text" v-model="msg"> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"> -->
    <!-- <h1 ref="h1" @click="handleClick">{{msg}}</h1> -->
    <!-- <h2 v-once>{{user.name}}</h2> -->

    <!-- <A v-if="flag"></A>
    <B v-if="!flag"></B> -->
    <!-- <component :is="showComponent"></component>
    <button @click="handleClick">切换</button> -->
    <A>
      <template>
        <h1>我是默认插槽1</h1>
      </template>
      <template v-slot:header>
        <h1>我是具名插槽header</h1>
      </template>
      <template #footer="{title}">
        <h1>我是作用域插槽footer,{{title}}</h1>
      </template>
    </A>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import A from './components/A.vue'
// import B from './components/B.vue'

export default {
  name: 'App',
  components: {
  //   // HelloWorld
    A,
  //   B
  },
  data(){
    return{
      msg:"我是初始化数据",
      phone:"18888888",
      user:{
        name:"123"
      },
      flag:true,
      showComponent:A
    }
  },
  methods:{
    handleClick(){
      // this.user.name=123;
      // this.$forceUpdate();
      // this.$destroy();
      // console.log(123)
      // this.user.name=222222;
      // console.log(123)
  // var arr= [];
  // arr.push();
      // this.flag=!this.flag
      // this.showComponent= B;
    }
  },
  // beforeCreate(){
  //   // console.log('beforeCreate',this,this.$data,this.msg,this.$el)
  //   console.log('beforeCreate',this.$vnode,this._vnode)
  // },
  // created(){
  //   // console.log('created',this,this.$data,this.msg,this.$el)
  //   console.log('created',this.$vnode,this._vnode)
  // },
  // beforeMount(){
  //   // console.log('beforeMount',this,this.$data,this.msg,this.$el)
  //   console.log('beforeMount',this.$vnode,this._vnode)
  // },
  // mounted(){
  //   // console.log('mounted',this,this.$data,this.msg,this.$el)
  //   console.log('mounted',this.$vnode,this._vnode)
  // },
}
</script>

<style>
</style>
