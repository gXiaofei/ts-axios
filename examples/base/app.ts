import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '$@:, '
//   }
// })

// let date = new Date()
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(1, res)
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json, text/plain, */*'
  },
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(2, res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
//Content-Type: application/x-www-form-urlencoded;charset=UTF-8
const searchParams = new URLSearchParams(paramsString) // formData

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})
