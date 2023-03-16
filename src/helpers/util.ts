const toString = Object.prototype.toString

// 判断是时间格式
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}
// 判断是对象
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
// 判断是普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
