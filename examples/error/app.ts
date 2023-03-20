import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(1, res)
  })
  .catch(err => {
    console.log(1, err)
  })

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(2, err)
  })

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(5, res)
    })
    .catch(err => {
      console.log(5, err)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 1000
})
  .then(res => {
    console.log(3, res)
  })
  .catch((err: AxiosError) => {
    console.log(3, err.message)
    console.log(3, err.config)
    console.log(3, err.code)
    console.log(3, err.request)
    console.log(3, err.isAxiosError)
  })
