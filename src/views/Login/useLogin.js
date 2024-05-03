import router from '@/router'
import { ref } from 'vue'
import { useStore } from 'vuex'

export function useLogin({ loginForm, loginFormRef }) {
  const store = useStore()

  const loginLoading = ref(false)

  const handleLogin = () => {
    loginFormRef.value.validate(async (validate) => {
      if (!validate) return

      loginLoading.value = true

      try {
        await store.dispatch('user/login', loginForm.value)
        loginLoading.value = false
        // 登录后操作
        router.push('/')
      } catch (error) {
        loginLoading.value = false
        console.log(error)
      }
    })
  }

  return {
    loginLoading,
    handleLogin,
  }
}
