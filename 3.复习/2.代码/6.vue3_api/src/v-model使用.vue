<template>
  <div>
    <HelloWorld v-model:msg="msg"></HelloWorld>
    {{msg}}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import {ref} from 'vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>
  const msg = ref("123");
</script>


<style></style>
