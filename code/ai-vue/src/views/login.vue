<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon><Back /></el-icon>
                <span>返回首页</span>
            </div>
            <div class="title-text">
                <h2>登陆您的账户</h2>
                <p>请输入您的登录信息</p>
            </div>  
        </div>
        <div class="form-container">
            <el-form :model="formData" :rules="rules" ref="formRef" label-position="top">
                <el-form-item label="用户名和邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名或邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
            </el-form>
            <el-button class="btn" type="primary" @click="submitForm(formRef)">登录</el-button>
        </div>
        <div class="footer">
            <p>还没有账号？<router-link to="/auth/register">去注册</router-link></p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const formRef = ref()

const formData = ref({
    username: '',
    password: ''
})

const rules = ref({
    username: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})

const submitForm = (formRef) => {
    formRef.value.validate((valid) => {
        if (valid) {
            console.log('submit!');
        } else {
            console.log('校验失败');
        }
    })
}
</script>
<style scoped lang="scss">
 .container {
    width: 384px;
    .title {
       .back-home {
        margin-bottom: 60px;
       }
       .title-text {
        text-align: center;
        h2{
            font-size: 36px;
            margin-bottom: 10px;
        }
        p{
            font-size: 18px;
            color: #6b7280;
        }
       }
    }
    .form-container {
        margin-top: 30px;
        .btn {
            margin-top: 40px;
            width: 100%;
        }
        .footer {
            padding: 30px;
            text-align: center;
        }
    }
 }
</style>
