<template>
  <div class="hello">
    hello
    <button @click="handleClick">修改msg</button>
  </div>
</template>

<script>
import {defineProps,defineEmits} from 'vue';
export default {
  name: 'HelloWorld'
}
</script>
<script setup>
const props = defineProps(["msg"]);
console.log(props.msg)

// const emits = defineEmits(["update:msg"]);
const emits = defineEmits();

const handleClick = ()=>{
  emits("update:msg",666)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
