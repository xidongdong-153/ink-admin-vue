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
