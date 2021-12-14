<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import {provide} from 'vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>
  provide("msg123","heihei")
  provide("msg666","heihei666")
</script>


<style></style>
