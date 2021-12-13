<template>
  <div>
    Hello
    <h2>{{msg}}</h2>
    <input type="text" @input="changeMsg">
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props:["msg"],
  methods: {
    changeMsg(event){
      // console.log(event.target.value)
      // this.$emit('input666',event.target.value)
      this.$emit('update:msg',event.target.value)
    }
  }
  // mounted(){
  //   console.log('parent',this.$parent.phone)
  // }
};
</script>

<style scoped>
</style>
