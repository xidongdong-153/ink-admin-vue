import path from 'path'

/**
 * 返回所有子路由
 */
const getChildrenRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = (routes) => {
  const childrenRoutes = getChildrenRoutes(routes)

  return routes.filter(
    (route) =>
      !childrenRoutes.find((childrenRoute) => childrenRoute.path === route.path)
  )
}

/**
 * 判断数据是否为空值
 */
function isNull(data) {
  if (data == null) return true // 检查 null 或 undefined
  if (typeof data === 'object' && Object.keys(data).length === 0) return true // 检查空对象或空数组
  if (data === '') return true // 检查空字符串
  return false
}

/**
 * 生成路由菜单
 */
export function generateMenus(routes, basePath = '') {
  const result = []

  routes.forEach((route) => {
    // 1.不存在children 和 meta 返回
    if (isNull(route.meta) && isNull(route.children)) return
    // 2.存在children 不存在 meta 继续迭代
    if (isNull(route.meta) && !isNull(route.children)) {
      result.push(...generateMenus(route.children))
    }

    // 3.合并Path
    const routePath = path.resolve(basePath, route.path)

    // 4.处理同名路由
    let currentRoute = result.find(
      (resultRoute) => resultRoute.path === routePath
    )

    if (!currentRoute) {
      currentRoute = {
        ...route,
        path: routePath,
        children: [],
      }

      // 5.icon和title 必须同时存在
      if (currentRoute.meta.icon && currentRoute.meta.title) {
        result.push(currentRoute)
      }
    }

    // 6.路由存在 children 迭代children
    if (route.children) {
      currentRoute.children.push(
        ...generateMenus(route.children, currentRoute.path)
      )
    }
  })

  return result
}
