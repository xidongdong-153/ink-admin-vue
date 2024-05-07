<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.screenfull')" :effect="effect">
      <svg-icon
        :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="onToggle"
      />
    </el-tooltip>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    },
  },
})

// 是否全屏
const isFullscreen = ref(false)

// 监听变化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换事件
const onToggle = () => {
  screenfull.toggle()
}

// 设置侦听器
onMounted(() => {
  screenfull.on('change', change)
})

// 删除侦听器
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
