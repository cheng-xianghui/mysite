<template>
    <div>
        <h2>{{title}}</h2>
         <el-table
    ref="multipleTable"
    :data="cart"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection" width="55">
    </el-table-column>
    <el-table-column
      prop="title" label="课程" width="120">
    </el-table-column>
    <el-table-column
      prop="price" label="单价" width="120">
    </el-table-column>
    <el-table-column
      label="数量" width="220">
      <template slot-scope="scope">
          <el-input-number v-model="scope.row.count"  :min="1" :max="100" label="描述文字"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column
      prop="total" label="总价" width="120">
       <template slot-scope="scope">
         {{scope.row.count*scope.row.price}}
      </template>
    </el-table-column>
    
  </el-table>
        <table border="1">
            <tr>
                <th>#</th>
                <th>课程</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价</th>
                
            </tr>
            <tr v-for="(c,index) in cart" :key="c.id">
                <td>
                    <input type="checkbox" v-model="c.active">
                </td>
                <td>{{c.title}}</td>
                <td>{{c.price}}</td>
                <td>
                    <button @click="handleLess(index)">-</button>
                    {{c.count}}
                    <button @click="handleAdd(index)">+</button>
                </td>
                 <td>￥{{c.price*c.count}}</td>
            </tr>
            <tr>
                <td></td>
                <td colspan="2">{{activeCount}}/{{count}}</td>
                <td colspan="2">￥{{total}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name:'cart',
    props:['title'],
    data(){
       return {
          
        //   JSON.parse（）：将数据转化为javascript对象  getItem:获得记录 
           cart:JSON.parse(localStorage.getItem('cart')) || [],
           multipleSelection:[]
       } 
    },
    watch:{
        cart:{
          deep:true,
          handler(n,o){
              console.log(n);
              console.log(o);
              this.setLocalData(n);
          },
         
        }
    },
    created(){
        this.$bus.$on('AddCart',good=>{
            const ret = this.cart.find(v=>v.id===good.id)
            console.log(ret);
            if(!ret){
                //购物车没有数据
                this.cart.push(good);
            }else{
                console.log(ret);
                ret.count +=1
            }
        })
    },
    methods:{
         toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    ,
        setLocalData(n){
            //setItem:设置记录   localStorage:本地存储  JSON.stringify(n)将json值转化为字符串
            console.log(n);
            localStorage.setItem('cart',JSON.stringify(n))
        },
        remove(i){
            if(window.confirm('确定是否删除?')){
             this.cart.splice(i,1)
            }
        },
         handleLess(i){
             let count = this.cart[i].count;
            count > 1 ? this.cart[i].count -=1:this.remove(i)
           
        },
         handleAdd(i){
                 this.cart[i].count++
        },
    },
    computed:{
       
        count(){
            return this.cart.length
        },
        activeCount(){
            return this.multipleSelection.filter(v=>v.active).length
        },
        total(){
            // 方法一:foreach()方法用于调用数组的每个元素，并将元素传递给回调函数
            // let sum=0;
            // this.cart.forEach(c => {
            //     if(c.active){
            //         sum +=c.price*c.count;
            //     }
            // });
            // return sum
            // 方法二reduce(回调函数，原始值)
            return this.cart.reduce((sum,c)=>{
                if(c.active){
                    sum +=c.price*c.count
                }
                return sum
            },0)

        }
    }
}
</script>
<style scoped>

</style>