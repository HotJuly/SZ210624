<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>我是obj3:{{obj3.name}}</h1>
    <button @click="handleClick">修改数据</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}


</script>
<script setup>
var obj = {
  name:"xiaoming",
  age:12
}
var obj2 = ref(obj)

var obj3 = obj2.value;
var handleClick=()=>{
  obj3.name="xiaoming666"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
