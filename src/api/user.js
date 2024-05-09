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
