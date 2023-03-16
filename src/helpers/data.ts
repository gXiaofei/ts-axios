import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 判断普通对象
  // 普通对象转换成string
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
