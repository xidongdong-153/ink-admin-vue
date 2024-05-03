import { login } from '@/api/system'
import { TOKEN } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    token: '',
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
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
        await setItem(TOKEN, data.token)
        commit('setToken', data.token)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async loadToken({ commit }) {
      const token = await getItem(TOKEN)
      commit('setToken', token)
    },
  },
  getters: {
    token: (state) => state.token,
  },
}
