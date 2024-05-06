<template>
  <el-icon v-if="icon.includes('el-icon')" class="sub-el-icon" size="14">
    <component :is="elIconName"></component>
  </el-icon>
  <svg-icon v-else :icon="icon"></svg-icon>
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
