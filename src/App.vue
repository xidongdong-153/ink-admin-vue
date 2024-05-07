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
</script>

<style></style>
