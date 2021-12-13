<template>
  <div id="app" class="B">
    <ul>
      <li v-for="(item,index) in arr" :key="index">
        <label>{{item}}</label>
        <input type="text">
      </li>
    </ul>
    <button @click="add">添加</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      arr:[1,2,3,4,5]
    }
  },
  methods: {
    add(){
      this.arr.splice(2,0,6);
    }
  },
}
</script>

<style>
</style>
