<template>
  <div>
    Hello
    <!-- <el-button>123</el-button> -->
    <h2>{{data.user.name}}</h2>
  </div>
</template>

<script>
import hooks from '/src/mixins';
export default {
  name: "HelloWorld",
  a:667,
  mounted(){
    // console.log(c)
  },
  inject:["data"],
  mixins:[hooks],
  created() {
    console.log('2',this.c,this.data.user.name)
  },
};
</script>

<style scoped>
</style>
