<template>
    <div>
        <!-- 实现的是双向数据绑定 （v-model）  相当于v-bind：value v-on：input -->
        <input :type="type" :value="inputVal" @input="handleInput">
    </div>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            default:'text'
        },
        value:{
            type:String,
            default:''
        }
    },
    data(){
        return {
            inputVal:this.value
        }
    },
    methods:{
        handleInput(e){
            //赋值
            this.inputVal = e.target.value
            //双向数据绑定
            this.$emit('input',this.inputVal)
            //通知父组件值的校验
            this.parent.$emit('validate',this.inputVal)
        }
    }
}
</script>