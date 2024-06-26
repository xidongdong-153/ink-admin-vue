import i18n from '@/i18n'
import store from '@/store'
import { watch } from 'vue'

export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters['app/language'],
    () => {
      cbs.forEach((cb) => cb(store.getters['app/language']))
    }
  )
}
