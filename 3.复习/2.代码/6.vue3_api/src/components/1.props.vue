<template>
  <div class="hello">
    hello
    {{props.msg}}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>
<script setup>
  import {defineProps} from 'vue';
  const props = defineProps(["msg"]);
  console.log('props',props)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
