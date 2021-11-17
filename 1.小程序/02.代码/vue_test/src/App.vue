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
      console.log(this.isEdit)
      debugger
      this.$refs.input123.focus();
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
