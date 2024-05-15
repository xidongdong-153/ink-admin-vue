import Layout from '@/layout/LayoutPage.vue'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/manage',
  name: 'userManage',
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
  ],
}
