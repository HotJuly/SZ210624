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
  import {defineProps,useAttrs} from 'vue';
  const props = defineProps(["a"]);
  console.log('props',props)

  const attrs = useAttrs();
  console.log('attrs',attrs)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
