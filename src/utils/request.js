import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
import axios from 'axios'
import { ElMessage } from 'element-plus'
console.log('process.env', process.env)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(async (config) => {
  // 添加 icode
  config.headers.icode = process.env?.VUE_APP_IMOOC_CODE

  const token = store.getters['user/token']

  if (token) {
    if (await isCheckTimeout()) {
      // 登出操作
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers['Accept-Language'] = store.getters['app/language']

  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data

    if (success) {
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }

    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
