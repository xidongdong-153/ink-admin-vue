import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = process.env?.VUE_APP_IMOOC_CODE
  // 必须返回 config
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
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
