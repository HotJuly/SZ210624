<template>
  <div>
    <Suspense>
      <template #default>
        <HelloWorld></HelloWorld>
      </template>

      <template #fallback>
        <h1>Loading....</h1>
      </template>
    </Suspense>
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
