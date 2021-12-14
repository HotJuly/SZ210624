<template>
  <div class="hello">
    hello
    <button @click="handleClick">修改msg</button>
  </div>
</template>

<script>
import {onUnmounted} from 'vue'
import myBus from '../mybus';
export default {
  name: 'HelloWorld'
}
</script>
<script setup>

const handleClick = ()=>{
  myBus.emit("change666",666)
}

onUnmounted(() => {
  myBus.off('change666')
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
