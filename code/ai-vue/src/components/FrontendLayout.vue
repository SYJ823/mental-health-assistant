<template>
    <div class="frontend-layout">
        <div class="navbar-container">
            <div class="brand-section">
                <el-image :src="robotIconUrl" alt="机器人" class="robot-icon" style="width: 50px; height: 50px;"></el-image>
                <div class="brand-name"> 心理健康AI助手</div>
            </div> 
            <div class="nav-section">
                <router-link to="/" class="nav-link">首页</router-link>
                <router-link to="/consultation" class="nav-link" v-if="isLoggedIn">AI咨询</router-link>
                <router-link to="/emotion-diary" class="nav-link" v-if="isLoggedIn">情绪日记</router-link>
                <router-link to="/knowledge" class="nav-link">知识库</router-link>
                <el-button  class="nav-link" v-if="isLoggedIn" @click="handleLogout" >退出登录</el-button>
                <template v-else>
                    <router-link to="/auth/login" class="nav-link">登录</router-link>
                    <router-link to="/auth/register" class="nav-link" >
                        <el-button type="primary">注册</el-button>
                    </router-link>
                </template>
            </div>
        </div>           
        <div class="main-content">
            <router-view></router-view>
        </div>
        <div class="footer-container">
            <p class="footer-bottom">&copy; 2026 心理健康AI助手. All rights reserved</p>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { logout } from "@/api/admin";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

// 登录状态判断
const isLoggedIn = ref(false);
isLoggedIn.value = localStorage.getItem('token') !== null;

// 退出登录
const handleLogout = () => {
    // 调用退出登录接口
    logout().then(() => {
        // 退出登录成功后，清除本地存储
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        isLoggedIn.value = false;
        // 退出登录成功后，跳转到登录页
        ElMessage.success("退出登录成功");
        router.push('/auth/login');
    });
   }


const robotIconUrl = new URL("@/assets/images/机器人.png", import.meta.url).href;

</script>
<style scoped lang="scss">
.frontend-layout {
        background-color: #fff;
        .navbar-container {
            max-width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .brand-section {
                display: flex;
                align-items: center;
                .brand-name {
                    margin-left: 10px;
                    font-size: 24px;
                    font-weight: 600;
                    color: #333;
                }
            }
            .nav-section {
                display: flex;
                align-items: center;
                gap: 40px;
                .nav-link {
                    color: #4b5563;
                    font-size: 16px;
                    font-weight: 500;
                    &:hover {
                        color: #4A90E2;
                    }
                }
            }
        }

        .footer-container {
            background: #1f2937;
            color: white;
            padding: 15px 0;
            margin-top: auto;
            .footer-bottom {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 10px;
                text-align: center;
            }
        }
    }
</style>