import app from '@/store/modules/app'
import user from '@/store/modules/user'
import variables from '@/styles/variables.module.scss'
import { createStore } from 'vuex'

export default createStore({
  state: {},
  getters: {
    cssVar: (state) => variables,
  },
  mutations: {},
  actions: {},
  modules: {
    user,
    app,
  },
})
