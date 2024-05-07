import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import variables from '@/styles/variables.module.scss'
import { getItem, setItem } from '@/utils/storage'

export default {
  namespaced: true,
  state: () => ({
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables,
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    },
  },
  getters: {
    mainColor: (state) => state.mainColor,
  },
}
