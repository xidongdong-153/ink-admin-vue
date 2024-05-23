<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      >
      </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <render-markdown
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></render-markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <editor-article
            :title="title"
            :detail="detail"
            @onSuccess="onSuccess"
          ></editor-article>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { articleDetail } from '@/api/article'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import EditorArticle from './components/EditorArticle.vue'
import RenderMarkdown from './components/RenderMarkdown.vue'

const activeName = ref('markdown')
const title = ref('')

// 处理编辑相关
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 标题赋值
  title.value = detail.value.title
}
if (articleId) {
  getArticleDetail()
}

// 创建成功
const onSuccess = () => {
  title.value = ''
}
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
