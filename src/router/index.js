import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/',
    component: () => import('@/layout/LayoutPage.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login/LoginPage.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
})

export default router
