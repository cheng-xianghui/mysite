<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>{{title}}</h1>
    <ul>
    <li v-for='(item,index) in cartList' :key='item.id'>
      <h2>{{item.title}}</h2>
      <p>￥{{item.price}}</p>
      <el-button @click="AddCart(index)" type="success">添加购物车</el-button>
    </li>
    </ul>
    <my-cart  :title='title'></my-cart>
    <form-element></form-element>
  </div>
  
</template>

<script>
import MyCart from './components/cart';
import FormElement from './components/FormElement.vue';


export default {
  name: 'app',
  data() {
     return {
       cartList:[],
       title:'购物车'
     }
},
  methods:{
       AddCart(i){
         console.log(i);
         const good=this.cartList[i];
         this.$bus.$emit('AddCart',good)
       }
     },
 async  created(){
  // 方法一
  // this.$http.get('/api/cartList')
  // .then(res=>{
  //   // console.log(res);
  //   this.cartList = res.data.result;
  // }).catch(err=>{
  //   console.log(err);
  // });
  // 方法二
  try {
    const res= await this.$http.get('/api/cartList')
    this.cartList=res.data.result
} catch (error) {
    console.log(error);
  }
 
},
  components: {
    MyCart,
    FormElement
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
