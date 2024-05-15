<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Author from './components/AuthorInfo'
import Chapter from './components/ChapterInfo'
import Feature from './components/FeatureInfo'
import ProjectCard from './components/ProjectCard'

import { getFeatureInfo } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
const activeName = ref('feature')

const featureData = ref([])

const getFeatureData = async () => {
  featureData.value = await getFeatureInfo()
}
getFeatureData()
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
