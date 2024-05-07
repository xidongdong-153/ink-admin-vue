import { MAIN_COLOR } from '@/constant'
import app from '@/store/modules/app'
import theme from '@/store/modules/theme'
import user from '@/store/modules/user'

import { getItem } from '@/utils/storage'
import { generateColors } from '@/utils/theme'
import { createStore } from 'vuex'

export default createStore({
  state: {},
  getters: {
    cssVar: (state) => {
      return {
        ...state.theme.variables,
        ...generateColors(getItem(MAIN_COLOR)),
      }
    },
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
    theme,
  },
})
