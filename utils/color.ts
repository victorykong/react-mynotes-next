/**
 * 十六进制颜色转换成 rgb 格式
 * @param hex
 */
export function hexToRgb(hex: string): string {
  if (!hex.includes('#') || !(hex.length === 7)) {
    throw new Error(`${hex} 格式错误，参考 #000000`)
  }
  return (
    parseInt('0x' + hex.slice(1, 3)) +
    ',' +
    parseInt('0x' + hex.slice(3, 5)) +
    ',' +
    parseInt('0x' + hex.slice(5, 7))
  )
}
