import formula from '@/constant/formula.json'
import axios from 'axios'
import color from 'css-color-function'
import rgbHex from 'rgb-hex'

/**
 * 根据主色值，生成最新的样式表
 */
export const generateNewStyle = async (primaryColor) => {
  const colors = generateColors(primaryColor)
  let cssText = await getOriginalStyle()

  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  return cssText
}

/**
 * 根据主色生成色值表
 */
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary,
  }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(/primary/g, primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表
 */
const getOriginalStyle = async () => {
  const { version } = await import('element-plus/package.json')
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 * 返回 style 的 template
 */
const getStyleTemplate = (data) => {
  // element-plus 默认色值
  const colorMap = {
    '#409eff': 'primary',
    '#79bbff': 'light-3',
    '#a0cfff': 'light-5',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9',
    '#337ecc': 'dark-2',
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach((key) => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

/**
 * 写入新样式到 style
 * @param {*} elNewStyle element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = (elNewStyle, isNewStyleTag = false) => {
  // 定义一个特定的 id 用于标识我们的 style 标签
  const styleId = 'override-element-plus-style'

  // 尝试获取已存在的 style 标签
  let style = document.getElementById(styleId)

  // 如果不存在或者需要新的 style 标签，则创建新的
  if (!style || isNewStyleTag) {
    style = document.createElement('style')
    style.id = styleId // 设置 id，方便下次直接获取
    document.head.appendChild(style)
  }

  // 设置新样式，覆盖之前的样式
  style.innerText = elNewStyle
}
