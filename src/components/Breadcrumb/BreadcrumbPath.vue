<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(route, index) in breadcrumbData"
        :key="route.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(route.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <a
          v-else
          :key="linkHoverColor"
          class="redirect"
          :style="{ color: linkHoverColor }"
          @click.prevent="onLinkClick(route)"
          >{{ generateTitle(route.meta.title) }}</a
        >
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { generateTitle } from '@/utils/i18n'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()

const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  }
)

const router = useRouter()
const onLinkClick = (route) => {
  router.push(route.path)
}

const store = useStore()

const linkHoverColor = computed(() => store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    color: v-bind('linkHoverColor');
  }
}
</style>
