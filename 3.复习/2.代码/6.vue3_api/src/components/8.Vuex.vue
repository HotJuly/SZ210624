<template>
  <div class="hello">
    hello
    {{store.state.msg}}
  </div>
</template>

<script>
import {useStore} from "vuex";
export default {
  name: 'HelloWorld'
}
</script>
<script setup>
const store = useStore();
store.commit('CHANGEMSG',"我是hello组件的数据")
// console.log(store)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
