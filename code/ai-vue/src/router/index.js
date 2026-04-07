import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'

//配置路由
const backendRoutes = [
    {
      path: '/back',
      component: BackendLayout,
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard.vue')
        }
      ]
    }
  ]

//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes: backendRoutes
})

//导出路由实例
export default router
