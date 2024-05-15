import Layout from '@/layout/LayoutPage.vue'
import Article from '@/router/modules/Article'
import User from '@/router/modules/User'
import store from '@/store'
import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 私有路由表
 */
export const privateRoutes = [User, Article]

/**
 * 公开路由表
 */
export const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/Login/LoginPage'),
  },
  {
    path: '/',
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile/ProfilePage'),
        meta: {
          title: 'profile',
          icon: 'el-icon-User',
        },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/ErrorPage/NotFoundPage'),
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/ErrorPage/UnauthorizedPage'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes],
})

/**
 * 初始化路由表
 */
export function resetRouter() {
  if (
    store.getters['user/userInfo'] &&
    store.getters['user/userInfo'].permission &&
    store.getters['user/userInfo'].permission.menus
  ) {
    const menus = store.getters['user/userInfo'].permission.menus
    menus.forEach((menu) => {
      router.removeRoute(menu)
    })
  }
}

export default router
