<template>
  <div class="hello">
    hello
    <button @click="handleClick">修改msg</button>
  </div>
</template>

<script>
import { ref ,defineExpose} from 'vue';

export default {
  name: 'HelloWorld'
}
</script>
<script setup>

const childName = ref('HelloWorld');

const handleClick = ()=>{
  console.log('handleClick')
}

defineExpose({
  handleClick
})
console.log('111',childName.value)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
