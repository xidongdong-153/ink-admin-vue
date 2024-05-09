<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'

import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { computed } from 'vue'
import { useStore } from 'vuex'

import { watchSwitchLang } from '@/utils/i18n'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()
const locale = computed(() => {
  if (store.getters['app/language'] === 'en') {
    return en
  }
  if (store.getters['app/language'] === 'zh') {
    return zhCn
  }

  return zhCn
})

async function initTheme() {
  const newStyleText = await generateNewStyle(store.getters['theme/mainColor'])
  writeNewStyle(newStyleText)
}
initTheme()

/**
 * 监听 语言变化，重新获取个人信息
 */
watchSwitchLang(() => {
  if (store.getters['user/token']) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
