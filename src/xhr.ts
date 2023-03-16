import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // 返回promise
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    // 利用XMLHttpRequest
    const request = new XMLHttpRequest()

    //  设置responseType
    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLocaleUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      // 状态不等于 4 请求还没有完成
      if (request.readyState !== 4) {
        return
      }

      // 请求完成

      // 获取响应headers
      const responseHeaders = request.getAllResponseHeaders()
      // 响应数据
      const responseData = responseType !== 'text' ? request.response : request.responseText
      // 组装返回 response
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    // 设置 headers
    Object.keys(headers).forEach(name => {
      // 数据为空时, 可以去掉 content-type
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
