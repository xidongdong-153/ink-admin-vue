import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  const token = store.getters['user/token'] // 判断是否有token
  const hasUserInfo = store.getters['user/userInfo'] // 判断是否有token

  const isLoginPage = to.path === '/login' // 判断是否是登录页
  const isInWhiteList = whiteList.includes(to.path) // 判断是否在白名单中

  if (token) {
    // 如果用户已登录且访问登录页，则重定向到主页，否则正常访问
    if (Object.keys(hasUserInfo).length === 0) {
      // 触发获取用户信息的 action
      await store.dispatch('user/getUserInfo')
    }
    if (isLoginPage) {
      next('/')
    } else {
      next()
    }
  } else {
    // 如果用户未登录，且访问的路径不在白名单中，则重定向到登录页，否则正常访问
    next(isInWhiteList ? undefined : '/login')
  }
})
