import { getUserInfo, login } from '@/api/system'
import { TOKEN } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import md5 from 'md5'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {},
  }),
  mutations: {
    /**
     * 设置Token
     */
    setToken(state, token) {
      state.token = token
    },
    /**
     * 设置用户信息
     */
    setUserInfo(state, userInfo) {
      if (Object.keys(userInfo).length === 0) {
        state.userInfo = {}
      } else {
        state.userInfo = {
          ...userInfo,
          avatar: 'https://avatars.githubusercontent.com/u/78343897?v=4',
        }
      }
    },
  },
  actions: {
    /**
     * 用户登录
     */
    async login({ commit }, userInfo) {
      const { username, password } = userInfo

      try {
        const data = await login({
          username,
          password: md5(password),
        })
        setTimeStamp()
        setItem(TOKEN, data.token)
        commit('setToken', data.token)
      } catch (error) {
        throw new Error(error.message)
      }
    },
    /**
     * 获取用户信息
     */
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      commit('setUserInfo', res)
      return res
    },
    /**
     * 用户退出登录
     */
    logout({ commit }) {
      resetRouter()
      commit('setToken', '')
      commit('setUserInfo', {})
      removeAllItem()
      router.push('/login')
    },
  },
  getters: {
    token: (state) => state.token,
    userInfo: (state) => state.userInfo,
  },
}
