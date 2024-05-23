import { articleEdit, createArticle } from '@/api/article'
import i18n from '@/i18n'
import { ElMessage } from 'element-plus'
const t = i18n.global.t

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(t('msg.article.createSuccess'))
  return res
}

export const editArticle = async (data) => {
  const res = await articleEdit(data)
  ElMessage.success(t('msg.article.editorSuccess'))
  return res
}
