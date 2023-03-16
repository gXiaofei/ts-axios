import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

// 处理config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 这里 headers 处理需要放在 data 处理之前
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 转换 URL
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
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

export default axios
