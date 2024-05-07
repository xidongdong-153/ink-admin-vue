// 定义前缀常量
const PREFIX = 'ink/'

/**
 * 存储数据，支持字符串、数组、对象等类型
 * @param {string} key - 存储数据使用的键，必须是非空字符串
 * @param {*} value - 需要存储的数据，不能为空
 */
export const setItem = (key, value) => {
  // 检查 key 是否为非空字符串
  if (typeof key !== 'string' || key.trim() === '') {
    throw new Error('Key must be a non-empty string')
  }

  // 检查 value 是否为 undefined 或 null
  if (value === undefined || value === null) {
    throw new Error('Value must not be undefined or null')
  }

  // 统一转换为 JSON 字符串进行存储
  const stringValue = JSON.stringify(value)
  // 添加前缀到 key
  window.localStorage.setItem(PREFIX + key, stringValue)
}

/**
 * 获取数据，自动处理 JSON 解析
 * @param {string} key - 存储数据使用的键
 */
export const getItem = (key) => {
  // 添加前缀到 key
  const data = window.localStorage.getItem(PREFIX + key)
  try {
    return JSON.parse(data)
  } catch (err) {
    console.error('JSON parse error:', err)
    return null
  }
}

/**
 * 删除数据
 * @param {string} key - 存储数据使用的键
 */
export const removeItem = (key) => {
  // 添加前缀到 key
  window.localStorage.removeItem(PREFIX + key)
}

/**
 * 删除所有与前缀相关的数据
 */
export const removeAllItem = () => {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(PREFIX))
    .forEach((key) => window.localStorage.removeItem(key))
}
