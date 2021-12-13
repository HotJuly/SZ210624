<template>
  <div>
    Home
  </div>
</template>

<script>
export default {
  name: "A",
  beforeRouteEnter(to,from,next){
    console.log('beforeRouteEnter',to,from);
    next();
  }
};
</script>

<style scoped>
</style>
