import Layout from '@/layout/LayoutPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 私有路由表
 */
const privateRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    meta: {
      title: 'user',
      icon: 'personnel',
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/User/UserManage/UserManage'),
        meta: {
          title: 'userManage',
          icon: 'personnel-manage',
        },
      },
      {
        path: '/user/role',
        component: () => import('@/views/User/RoleList/RoleList'),
        meta: {
          title: 'roleList',
          icon: 'role',
        },
      },
      {
        path: '/user/permission',
        component: () => import('@/views/User/PermissionList/PermissionList'),
        meta: {
          title: 'permissionList',
          icon: 'permission',
        },
      },
      {
        path: '/user/info/:id',
        name: 'userInfo',
        component: () => import('@/views/User/UserInfo/UserInfo'),
        props: true,
        meta: {
          title: 'userInfo',
        },
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/User/UserImport/UserImport'),
        meta: {
          title: 'excelImport',
        },
      },
    ],
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/ranking',
    meta: {
      title: 'article',
      icon: 'article',
    },
    children: [
      {
        path: '/article/ranking',
        component: () =>
          import('@/views/Article/ArticleRanking/ArticleRanking'),
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking',
        },
      },
      {
        path: '/article/:id',
        component: () => import('@/views/Article/ArticleDetail/ArticleDetail'),
        meta: {
          title: 'articleDetail',
        },
      },
      {
        path: '/article/create',
        component: () => import('@/views/Article/ArticleCreate/ArticleCreate'),
        meta: {
          title: 'articleCreate',
          icon: 'article-create',
        },
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/Article/ArticleCreate/ArticleCreate'),
        meta: {
          title: 'articleEditor',
        },
      },
    ],
  },
]

/**
 * 公开路由表
 */
const publicRoutes = [
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
  routes: [...publicRoutes, ...privateRoutes],
})

export default router
