<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!store.getters['app/sidebarOpened']"
    :uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="store.getters.cssVar.menuBg"
    :text-color="store.getters.cssVar.menuText"
    :active-text-color="store.getters.cssVar.menuActiveText"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import SidebarItem from './SidebarItem.vue'

const store = useStore()

const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

const route = useRoute()

const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
