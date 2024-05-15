import request from '@/utils/request'

export const getFeatureInfo = () => {
  return request({
    url: '/user/feature',
  })
}

export const getChapterInfo = () => {
  return request({
    url: '/user/chapter',
  })
}

/**
 * 获取用户列表数据
 */
export const getUserManageList = (data) => {
  return request({
    url: '/user-manage/list',
    params: data,
  })
}

/**
 * 批量导入
 */
export const userBatchImport = (data) => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data,
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/user-manage/detele/${id}`,
  })
}

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list',
  })
}

/**
 * 获取用户详情
 */
export const userDetail = (id) => {
  return request({
    url: `/user-manage/detail/${id}`,
  })
}

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list',
  })
}

/*
 * 获取所有权限
 */
export const permissionList = () => {
  return request({
    url: '/permission/list',
  })
}

/**
 * 获取指定用户角色
 */
export const userRoles = (id) => {
  return request({
    url: `/user-manage/role/${id}`,
  })
}

/**
 * 分用户分配角色
 */
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles,
    },
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = (roleId) => {
  return request({
    url: `/role/permission/${roleId}`,
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = (data) => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data,
  })
}
