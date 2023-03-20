import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  // 返回promise
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    // 利用XMLHttpRequest
    const request = new XMLHttpRequest()

    //  设置responseType
    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLocaleUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      // 状态不等于 4 请求还没有完成
      if (request.readyState !== 4) {
        return
      }

      // 网络报错请求超时报错 status = 0, 后面处理过,这里直接return不处理
      if (request.status === 0) {
        return
      }

      // 请求完成

      // 获取响应headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
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

      handleResponse(response)
    }

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 超时处理
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
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

    // 处理不是 200 错误
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
