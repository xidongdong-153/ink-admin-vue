<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column :label="$t('msg.role.index')" type="index" width="120">
        </el-table-column>
        <el-table-column :label="$t('msg.role.name')" prop="title">
        </el-table-column>
        <el-table-column :label="$t('msg.role.desc')" prop="describe">
        </el-table-column>
        <el-table-column
          :label="$t('msg.role.action')"
          prop="action"
          width="260"
          #default="{ row }"
        >
          <el-button
            v-permission="['distributePermission']"
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
          >
            {{ $t('msg.role.assignPermissions') }}
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission-dialog
      v-model="distributePermissionVisible"
      :roleId="selectRoleId"
    ></distribute-permission-dialog>
  </div>
</template>

<script setup>
import { roleList } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'
import DistributePermissionDialog from './components/DistributePermissionDialog.vue'

const allRoles = ref([])
const getRoleList = async () => {
  allRoles.value = await roleList()
}
getRoleList()
watchSwitchLang(getRoleList)

const distributePermissionVisible = ref(false)
const selectRoleId = ref('')
/**
 * 分配权限
 */
const onDistributePermissionClick = (row) => {
  distributePermissionVisible.value = true
  selectRoleId.value = row.id
}
</script>

<style lang="scss" scoped></style>
