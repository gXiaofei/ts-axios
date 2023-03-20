import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 空格
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  // 存在 params 时,拼接到 url 后
  if (!params) return url

  //  收集params键值对
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]

    // null and undefined 不添加
    if (val === null || val === undefined) {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // push 一个键值对
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    // 如果存在xxx#hash, 截取掉
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 这里再判断url上本来就存在 参数 xx?a=b 的处理
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
