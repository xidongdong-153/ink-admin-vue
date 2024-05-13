<template>
  <upload-excel :onSuccess="onSuccess"></upload-excel>
</template>

<script setup>
import { userBatchImport } from '@/api/user'
import UploadExcel from '@/components/UploadExcel/UploadExcel'
import { generateData } from '@/views/User/UserImport/utils'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const i18n = useI18n()

/**
 * 数据解析成功之后的回调
 */
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  ElMessage.success({
    message: results.length + i18n.t('msg.excel.importSuccess'),
    type: 'success',
  })
  router.push('/user/manage')
}
</script>
、
