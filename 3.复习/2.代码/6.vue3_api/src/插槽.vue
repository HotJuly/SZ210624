<template>
  <div>
    <HelloWorld>
      <!-- <template v-slot:default>
        <h1>我是默认插槽</h1>
      </template> -->
      <template #default>
        <h1>我是默认插槽</h1>
      </template>
      <template #header>
        <h1>我是具名插槽</h1>
      </template>
      <template #footer="{title}">
        <h1>我是作用域插槽,{{title}}</h1>
      </template>
    </HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"
// import {ref} from 'vue';
export default {
  name: 'App',
  components:{
    HelloWorld
  }
}
</script>

<script setup>
</script>


<style></style>
