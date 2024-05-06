<template>
  <el-icon size="14" color="#409efc">
    <component v-if="icon.includes('el-icon')" :is="elIconName"></component>
    <svg-icon v-else :icon="icon"></svg-icon>
  </el-icon>
  <span>{{ title }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})

const elIconName = computed(() => {
  if (props.icon.includes('el-icon')) {
    return props.icon.replace('el-icon', '')
  }

  return props.icon
})
</script>
