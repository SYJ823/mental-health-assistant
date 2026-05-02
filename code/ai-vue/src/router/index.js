import { createRouter, createWebHistory } from "vue-router";
import BackendLayout from "@/components/BackendLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";
import FrontendLayout from "@/components/FrontendLayout.vue";

//配置路由

//后台路由
const backendRoutes = [
  {
    path: "/back",
    redirect: "/back/dashboard",
    component: BackendLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        component: () => import("@/views/login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];

//前台路由
const frontendRoutes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "",
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "/consultation",
        component: () => import("@/views/consultation.vue"),
        meta: {
          title: "AI咨询",
        },
      },
      {
        path: "/emotion-diary",
        component: () => import("@/views/emotionDiary.vue"),
        meta: {
          title: "情绪日记",
        },
      },
      {
        path: "/knowledge",
        component: () => import("@/views/FrontendKnowledge.vue"),
        meta: {
          title: "知识库",
        },
      },
      {
        path: "/knowledge/article/:id",
        component: () => import("@/views/articleDetail.vue"),
        meta: {
          title: "知识文章详情",
        },
        props: true,
      },
    ],
  },
];


//创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [...backendRoutes, ...frontendRoutes]
});

//路由前置守卫
router.beforeEach((to, form, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.userType === 2) {
      //管理员账户只能访问后台路由
      if (to.path.startsWith("/back")) {
        next();
      } else {
        next({ path: "/back/dashboard" });
      }
    } else if (userInfo.userType === 1) {
      //用户端账户只能访问用户端路由
      if (to.path.startsWith("/back")||to.path.startsWith("/auth")) {
        next({ path: "/" }); //跳转到首页
      } else {
        next();
      }
    }
  } else {
    // 未登录
    if (to.path.startsWith("/back")) {
      next({ path: "/auth/login" });
    } else {
      // 未登录
      if (to.path.startsWith("/back")) {
        // 如果是访问后台路由，跳转到登录页
        next({ path: "/auth/login" });
      } else {
        next();
      }
    }
  }
});

//导出路由实例
export default router;
