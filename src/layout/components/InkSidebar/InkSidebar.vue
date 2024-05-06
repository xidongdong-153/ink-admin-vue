<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        size="44"
        shape="square"
        src="https://avatars.githubusercontent.com/u/78343897?v=4"
      />
      <h1 class="logo-title" v-if="store.getters['app/sidebarOpened']">
        Ink Admin
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import SidebarMenu from './SidebarMenu'

const store = useStore()
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
