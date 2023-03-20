import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  // 判断普通对象
  // 普通对象转换成string
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }

  return data
}
