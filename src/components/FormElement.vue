<template>
<div>
    <!-- 自己的组件 -->
    <m-from :model='ruleFrom' :rules='rules'>
        <m-form-item label="密码" prop='pass'>
        <m-input v-model='ruleForm.pass'></m-input>
    </m-form-item>
    <m-form-item label="验证密码" prop="checkPass">
        <m-input type='password' v-model="ruleForm.checkPass"></m-input>
    </m-form-item>
    </m-from>


    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>

</template>

<script>
/**
 * From 定义数据 负责定义校验规则
 * FormItem 负责显示错误信息
 * Input 负责双向数据绑定
 * provide inject 内部共享数据
 */
import MInput from './Input.vue';
import MFormItem from './FormItem.vue' ;
import MFrom from './Form.vue'
  export default {
      name:"FormElement",
      components:{
          MInput,
          MFormItem,
          MFrom
      },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
          
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>