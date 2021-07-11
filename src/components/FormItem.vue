<template>
    <div>
        <label v-if="label">{{label}}</label>
        <!-- 槽的作用：为FormElement提供空间 -->
        <slot></slot>
        <!-- 显示校验的错误信息 -->
        <p v-if="validateStatus==='error'" class="error">{{errorMessage}}</p>
    </div>
</template>
<script>
import schema from 'async-validator'
/**
 * 1.获取当前输入框的规则
 * 2.如果输入框和rule不匹配，显示错误信息
 * 3.Input组建中用户输入内容时，通知FormItem做校验（校验的方法）
 * 4.使用async-validtor做校验
 * npm i async-validator -S 下载
 * 以管理员身份下载 
 */
export default {
    data(){
        return{
            errorMessage:'',//显示错误信息
            validateStatus:''//校验的状态值
        }
    },
    inject:['from'],
    //判断是否校验完成
    mounted(){
        if(this.prop){//必须判断，因为FROM组件的子组件可能不是formItem
            this.$parent.$emit('formItemAdd',this)
        }
    },
    methods:{
        validate(value){
            //使用promise来返回结果拿到是否错误信息给到From.vue
            return new Promise(resolve=>{
              console.log(value);//输入框的值
            let descriptor={};//此对象要存储校验规则
            //获取校验对象 ==>From组件对象=>rules[this.prop]
            console.log(this.from.rules[this.prop]);
            descriptor[this.prop]=this.from.rules[this.prop];
            const validator = new schema(descriptor);
            let obj ={};
            obj[this.prop] =value;
            validator.validate({obj},errors=>{
                if(errors){
                    //显示错误信息
                    this.validateStatus='error';
                    this.errorMessage=errors[0].message;
                    resolve(false)
                }else{
                    //错误置空
                    this.validateStatus='';
                    this.errorMessage='';
                    resolve(true)
                }
            })
            })
            
        }
    },
    created(){
        this.$on('validate',this.validate)
    },
    //prop可以用来校验
    props:{
        label:{
            type:String,
            default:''
        },
        prop:{
            type:String,
            default:''
        }
    }
}
</script>
<style scoped>
.error{
    color: red;
}
</style>