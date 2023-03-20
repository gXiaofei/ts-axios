import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  // 处理url
  config.url = transformURL(config)
  // 这里 headers 处理需要放在 data 处理之前
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 转换 URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 转换 data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 转换 headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 转化data为string时尝试转成对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)

  return res
}
