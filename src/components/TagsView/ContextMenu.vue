<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">
      {{ $t('msg.tagsView.refresh') }}
    </li>
    <li :class="{ disabled: isSingleTag }" @click="onCloseRightClick">
      {{ $t('msg.tagsView.closeRight') }}
    </li>
    <li :class="{ disabled: isSingleTag }" @click="onCloseOtherClick">
      {{ $t('msg.tagsView.closeOther') }}
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
})

const router = useRouter()
const store = useStore()

const tagsViewList = computed(() => store.getters['app/tagsViewList'])
const isSingleTag = computed(() => tagsViewList.value.length === 1)

const onRefreshClick = () => {
  router.go(0)
}

const onCloseRightClick = () => {
  if (!isSingleTag.value) {
    const tag = tagsViewList.value[props.index]
    router.push({ path: tag.path })

    store.commit('app/removeTagsView', {
      type: 'right',
      index: props.index,
    })
  }
}

const onCloseOtherClick = () => {
  if (!isSingleTag.value) {
    const tag = tagsViewList.value[props.index]
    router.push({ path: tag.path })

    store.commit('app/removeTagsView', {
      type: 'other',
      index: props.index,
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.module.scss';

.context-menu-container {
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  transition: background 0.3s;
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }
    &:hover {
      background: #eee;
      transition: background #{$sideBarDuration};
    }
  }
}
</style>
