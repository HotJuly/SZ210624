<template>
  <!-- <h1>名字:{{user.name}}</h1>
  <h1>年龄:{{user.age}}</h1>
  <button @click="handleClick">公开年龄</button>
  <button @click="handleClick1">+1</button> -->

  <ul>
    <li v-for="item in arr2" :key="item">{{item}} -- 1</li>
  </ul>
  <button @click="handleClick">修改数据</button>
</template>

<script>
import { reactive } from "vue"
export default {
  name: 'App',
  // setup() {
  //   var obj = {
  //     name:"xiaoming"
  //   };
  //   var user = reactive(obj);
  //   var handleClick =()=>{
  //     user.age = 18;
  //   }
  //   var handleClick1 =()=>{
  //      Vue2->Vue.set(user,"age",4)
  //     user.age +=1;
  //   }

  //   return {
  //     user,
  //     handleClick,
  //     handleClick1
  //   }
  // }
  setup(){
    var arr = [1,2,3,4,5];
    var arr2 = reactive(arr);

    var handleClick =()=>{
      // arr2.splice(2,1,4);
      arr2[2]=4;
    }

    return {
      arr2,
      handleClick
    }
  }
}
</script>


<style></style>
