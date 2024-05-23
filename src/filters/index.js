import store from '@/store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import rt from 'dayjs/plugin/relativeTime'

dayjs.extend(rt)
function relativeTime(val) {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs()
    .locale(store.getters['app/language'] === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(val))
}

export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime,
  }
}
