import axios from 'axios'
import { Config } from './config'
import { Toast } from 'vant'

/**
 * 使用方法 this.request()
 * 里面的 fail 这里是为了抛出后台的异常，因为我们的业务比较简单，所以所以的错误都在这里抛出
 * 若是后台没有抛出具体错误 则可以用 error.response.status 来取得状态码，再根据restful api 设计规范来返回错误码
 * @param options
 * @returns {Promise<any>}
 */
function request (options) {
  return new Promise((resolve, reject) => {
    axios.request(options).then(response => {
      return resolve(response)
    }).catch(error => {
      if (error && error.response) {
        Toast.fail({
          message: error.response.data.msg,
          duration: 1500
        })
        setTimeout(() => {
          reject(error)
        }, 1500)
      }
    })
  })
}

/**
 * 定义一个 post 方法因为也经常用，可以按照这个仿写 其他方法
 * @param options
 * @returns {Promise<any>}
 */
function post (options) {
  return new Promise((resolve, reject) => {
    options.method = 'post'
    request(options).then(resolve).catch(reject)
  })
}

// 一般会在这里定义一个请求的根目录的
axios.defaults.baseURL = Config.restUrl
// 设置默认请求头
// token放置在header中
axios.defaults.headers = {
  'Content-Type': 'application/json',
  'token': localStorage.getItem('token')
}
axios.defaults.timeout = 30 * 1000

/**
 * 对于相关的操作可以放到一个对象里面，扩展其他的对象也是同样的道理
 * @type {{func1(): void}}
 */
let obj = {
  func1: function () {
    alert('这是对象1')
  }
}

export default{
  obj,
  request,
  post
}
