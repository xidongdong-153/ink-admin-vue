import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
/**
 * 获取时间戳
 */
export async function getTimeStamp() {
  const timeStamp = await getItem(TIME_STAMP)
  return timeStamp
}
/**
 * 设置时间戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export async function isCheckTimeout() {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = await getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
