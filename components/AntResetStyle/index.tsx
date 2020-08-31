import React, { useMemo } from 'react'
import { generate, blue } from '@ant-design/colors' // https://www.npmjs.com/package/@ant-design/colors
import antStyleString from './antResetStyle'
import { hexToRgb } from '../../utils/color'

/**
 * 格式化自定义主题函数
 * @param primaryColor
 */
function formatStyle(primaryColor: string) {
  let colors = blue.concat()
  const styleString = antStyleString
  if (primaryColor && /^#[0-9a-f]{6}$/i.test(primaryColor)) {
    colors = generate(primaryColor) // 生成 primaryColor 对应的颜色色板
  }
  colors.push(hexToRgb(colors[5])) // 下标5为主色调, 也就是 primaryColor

  // 覆盖原本 antd @primary10 变量为rgb格式的 primaryColor
  let style = styleString.replace(/@primary10/g, (a, b) => {
    return colors[10]
  })

  // 将其它的 @primary* 变量替换为对应的 primaryColor 的其它色板上的颜色
  style = style.replace(/@primary([0-9])/g, (a, b) => {
    // eg: a = "@primary6", b = "6"
    return colors[b]
  })

  return style
}

const AntResetStyle = ({ primaryColor }: { primaryColor: string }) => {
  const memoryStyle = useMemo(() => formatStyle(primaryColor), [primaryColor])

  // 此时 style 这个样式字符串中已经不存在 primary 字眼，全部被替换成 primaryColor 色板的其它颜色
  return <style dangerouslySetInnerHTML={{ __html: memoryStyle }} />
}
export default AntResetStyle
