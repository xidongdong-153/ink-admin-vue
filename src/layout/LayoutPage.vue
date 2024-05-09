<template>
  <div
    class="app-wrapper"
    :class="[
      store.getters['app/sidebarOpened'] ? 'openSidebar' : 'hideSidebar',
    ]"
  >
    <!-- 左侧 menu -->
    <!-- <el-scrollbar> -->
    <ink-sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: store.getters.cssVar.menuBg }"
    ></ink-sidebar>
    <!-- </el-scrollbar> -->
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <ink-navibar></ink-navibar>
        <!-- tags -->
        <tags-view></tags-view>
      </div>
      <!-- 内容区 -->
      <ink-app-main></ink-app-main>
    </div>
  </div>
</template>

<script setup>
import TagsView from '@/components/TagsView/TagsView'
import InkAppMain from '@/layout/components/InkAppMain/InkAppMain'
import InkNavibar from '@/layout/components/InkNavibar/InkNavibar'
import InkSidebar from '@/layout/components/InkSidebar/InkSidebar'
import { useStore } from 'vuex'

const store = useStore()
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
