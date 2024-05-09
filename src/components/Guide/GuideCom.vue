<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import steps from '@/utils/steps'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

// eslint-disable-next-line no-unused-vars
let driverInstance = null
onMounted(() => {
  // eslint-disable-next-line new-cap
  driverInstance = driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    doneBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
  })
})

const onClick = () => {
  driverInstance.setSteps(steps(i18n))
  driverInstance.drive()
}
</script>

<style scoped></style>
