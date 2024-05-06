import { getUserInfo, login } from '@/api/system'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {},
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
  },
  actions: {
    async login({ commit }, userInfo) {
      const { username, password } = userInfo

      try {
        const data = await login({
          username,
          password: md5(password),
        })
        setTimeStamp()
        await setItem(TOKEN, data.token)
        commit('setToken', data.token)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async loadLocal({ commit }) {
      const token = await getItem(TOKEN)
      commit('setToken', token)
    },
    async getUserInfo(context) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    logout() {
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      removeAllItem()
      router.push('/login')
    },
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
  },
}
