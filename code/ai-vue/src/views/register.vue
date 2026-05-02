<template>
  <div class="container">
    <div class="flex-box"></div>
    <div class="title">
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>请填写注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        :model="formData"
        :rules="rules"
        ref="submitFormRef"
        label-position="top"
      >
        <el-form-item label="用户名和邮箱" prop="username">
          <el-input
            v-model="formData.username"
            size="large"
            placeholder="请输入用户名或邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            size="large"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="formData.nickname"
            size="large"
            placeholder="请输入昵称（可选）"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            size="large"
            placeholder="请输入手机号（可选）"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            size="large"
            placeholder="请输入密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="formData.confirmPassword"
            size="large"
            placeholder="请确认密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn" type="primary" @click="submitForm(submitFormRef)"
        >创建用户</el-button
      >
      <div class="footer">
        <p>还没有账号？<router-link to="/auth/login">去登录</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { register } from "@/api/admin";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

const formData = reactive({
  username: "",
  email: "",
  nickname: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: 0, //性别
  userType: 1, // 1为普通用户
});

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名或邮箱", trigger: "blur" },
  ],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  nickname: [{ message: "请输入昵称", trigger: "blur" }],
  phone: [{ message: "请输入手机号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
});

// 提交表单
const submitFormRef = ref(null);
const submitForm = async (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // 注册请求
      register(formData)
        .then((res) => {
            console.log("真实接口返回：", res);
          // 不直接解构，避免无data时报错
          const { id,data } = res || {};
          if (id) {
            // 注册成功
            ElMessage.success("注册成功");
            router.push("/auth/login");
          } else {
            // 安全获取错误信息
            const errMsg = data?.message || "注册失败，请稍后重试";
            ElMessage.error(errMsg);
          }
        })
    }
  });
};
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  .flex-box {
    display: flex;
    align-items: center;
  }
  .title {
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
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
