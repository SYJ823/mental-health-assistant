<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        
        <el-menu-item v-for="item in routes.options.routes[0].children" :key="item.path" :index="item.path">
          <el-icon component="item.meta.icon"></el-icon>
          <span>{{ item.meta.title }}</span>
        </el-menu-item>
      </el-menu>
</template>

<script setup>
import { useRouter } from 'vue-router'

const routes = useRouter()
console.log(routes);


const handleOpen = () =>{
   
}
const handleClose = () =>{
   
}
</script>