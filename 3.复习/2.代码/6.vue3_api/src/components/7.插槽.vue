<template>
  <div class="hello">
    hello
    <slot name="default"></slot>
    <slot name="header"></slot>
    <slot name="footer" title="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>
<script setup>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
