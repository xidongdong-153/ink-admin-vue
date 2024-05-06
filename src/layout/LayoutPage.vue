<template>
  <div class="app-wrapper">
    <!-- 左侧 menu -->
    <ink-sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    ></ink-sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <ink-navibar></ink-navibar>
      </div>
      <!-- 内容区 -->
      <ink-app-main></ink-app-main>
    </div>
  </div>
</template>

<script setup>
import InkAppMain from '@/layout/components/InkAppMain/InkAppMain.vue'
import InkNavibar from '@/layout/components/InkNavibar/InkNavibar.vue'
import InkSidebar from '@/layout/components/InkSidebar/InkSidebar.vue'
import variables from '@/styles/variables.module.scss'
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
}
</style>
