<template>
  <div id="app">
    <input ref="input123" v-if="isEdit" type="text">
    <button v-else @click="changeShow">添加</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isEdit:false
    }
  },
  methods:{
    changeShow(){
      this.isEdit = true;
      this.isEdit = false;
      // for(var i=0;i<100000;i++){
      //   console.log(i)
      // }
      Promise.resolve().then(()=>{
        // 更新DOM
        console.log("更新DOM")
      })
      // console.log(this.isEdit)
      // debugger
      // console.log(this.$refs.input123)
      // this.$refs.input123.focus();
      // Promise.resolve().then(()=>{
      //   console.log(1)
      // })
      // console.log(2)
    }
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
