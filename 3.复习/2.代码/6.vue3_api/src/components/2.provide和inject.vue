<template>
  <div class="hello">
    hello
  </div>
</template>

<script>
import {inject} from 'vue';
export default {
  name: 'HelloWorld'
}
</script>
<script setup>
  const msg = inject(["msg123"]);
  const msg666 = inject(["msg666"]);
  console.log('msg',msg,msg666)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
