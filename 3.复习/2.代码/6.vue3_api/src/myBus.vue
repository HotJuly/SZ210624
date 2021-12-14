<template>
  <div>
    <HelloWorld></HelloWorld>
    {{msg}}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
import myBus from './mybus';
// import {ref} from 'vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>
  myBus.on('change666',(data)=>{
    console.log('change666',data)
  })
</script>


<style></style>
