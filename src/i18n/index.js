import en from '@/i18n/lang/en'
import zh from '@/i18n/lang/zh'
import store from '@/store'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    msg: {
      ...en,
    },
  },
  zh: {
    msg: {
      ...zh,
    },
  },
}

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters['app/language']
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getLanguage(),
  messages,
})

export default i18n
