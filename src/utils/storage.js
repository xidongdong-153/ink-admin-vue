import localforage from 'localforage'

const inkLocal = localforage.createInstance({
  name: 'inkLocal',
  driver: localforage.LOCALSTORAGE,
})

/**
 * 存储数据
 */
export const setItem = async (key, value) => {
  try {
    const item = await inkLocal.setItem(key, value)
    return item
  } catch (error) {
    return error
  }
}

/**
 * 获取数据
 */
export const getItem = async (key) => {
  try {
    const data = await inkLocal.getItem(key)
    return data
  } catch (err) {
    return err
  }
}

/**
 * 删除数据
 */
export const removeItem = async (key) => {
  try {
    await inkLocal.removeItem(key)
  } catch (error) {
    return error
  }
}

/**
 * 删除所有数据
 */
export const removeAllItem = async () => {
  try {
    await inkLocal.clear()
  } catch (error) {
    return error
  }
}
