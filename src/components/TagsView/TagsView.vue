<template>
  <div class="tags-view-container">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="isActive(tag) ? 'active' : ''"
        v-for="(tag, index) in store.getters['app/tagsViewList']"
        :key="tag.fullPath"
        :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openMenu($event, index)"
      >
        {{ tag.title }}

        <div
          v-show="!isActive(tag)"
          class="tags-view-icon"
          @click.prevent.stop="onCloseClick(index)"
        >
          <el-icon>
            <CloseBold />
          </el-icon>
        </div>
      </router-link>
    </el-scrollbar>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectIndex"
    ></context-menu>
  </div>
</template>

<script setup>
import { CloseBold } from '@element-plus/icons'
import { computed, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import ContextMenu from './ContextMenu.vue'
const route = useRoute()
const store = useStore()

/**
 * 是否被选中
 */
const isActive = (tag) => {
  return tag.path === route.path
}
/**
 * 关闭 tag 的点击事件
 */
const onCloseClick = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index,
  })
}

// contextMenu 相关
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0,
})
/**
 * 展示 menu
 */
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}

/**
 * 关闭 menu
 */
const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

const bgColor = computed(() => store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  background: #fff;
  .tags-view-item {
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    border-radius: 3px;
    color: #495060;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    transition: all 0.5s;
    z-index: 1;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      // background-color: v-bind(bgColor);
      // border-color: v-bind(bgColor);
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to right,
        v-bind(bgColor) 50%,
        transparent 50%
      );
      background-size: 201% 100%;
      background-position: right bottom;
      transition: background-position 0.5s ease-out;
      z-index: -1;
    }

    &.active::after {
      background-position: left bottom;
    }

    .tags-view-icon {
      display: inline-flex;
      align-items: center;
      margin-left: 5px;
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
