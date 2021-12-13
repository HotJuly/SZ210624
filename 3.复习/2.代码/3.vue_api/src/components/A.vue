<template>
  <div>
    A
    <slot name="default"></slot>
    <slot name="footer" title="I'm Footer"></slot>
  </div>
</template>

<script>
export default {
  name: "A",
};
</script>

<style scoped>
</style>
