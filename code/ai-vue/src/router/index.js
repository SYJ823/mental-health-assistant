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
          component: () => import('@/views/dashboard.vue'),
          meta: {
            title: '数据分析',
            icon: 'PieChart'
          }
        },
        {
          path: 'knowledge',
          component: () => import('@/views/knowledge.vue'),
          meta: {
            title: '知识文章',
            icon: 'ChatLineSquare'
          }
        },
        {
          path: 'consultations',
          component: () => import('@/views/consultations.vue'),
          meta: {
            title: '咨询记录',
            icon: 'Message'
          }
        },
        {
          path: 'emotional',
          component: () => import('@/views/emotional.vue'),
          meta: {
            title: '情绪日志',
            icon: 'User'
          }
        },
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
