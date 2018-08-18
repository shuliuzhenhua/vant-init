import axios from 'axios'
import Vue from 'vue'
import router from './router'
import { Config } from './config'
import { Dialog, Toast } from 'vant'

const global = new Vue({
  router
})

axios.defaults.baseURL = Config.restUrl
axios.defaults.timeout = 30 * 1000

/**
 * 使用方法 this.request()
 * 里面的 fail 这里是为了抛出后台的异常，因为我们的业务比较简单，所以所以的错误都在这里抛出
 * 若是后台没有抛出具体错误 则可以用 error.response.status 来取得状态码，再根据restful api 设计规范来返回错误码
 * @param options
 * @returns {Promise<any>}
 */
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 创建实例
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token') // 设置header 默认值，根据自己情况而定
      }
    })
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 请求开始之前做的事
      // 例子：例如请求默认带上token，也可以在这里做判断或其他需要函数处理的参数
      // let token = localStorage.getItem('token')
      // if (token === null) {
      //   // 跳的登录页面
      // }
      return config
    })
    instance.interceptors.response.use(res => {
      // 请求成功时的处理
      return res
    }, err => {
      // 1、绕过拦截器，完全自己处理
      if (options.handle === true) {
        return Promise.reject(err)
      }
      console.log(JSON.stringify(err.response, null, 4))
      // 如果返回的是自己网站的错误应该是有这个data的
      if (err.response.data) {
        // 2、特殊异常，当检测到时采取对应的操作，例如这个表示一定要先登录才可以使用
        if (err.response.data.error_code === 10003) {
          // 需要重新登录
          Toast('身份已过期，需要重新登录')
          setTimeout(() => {
            localStorage.clear()
            global.$router.push('/user/login')
          }, 2000)
          console.log('跳转到登录页面')
          return Promise.reject(err.response.data)
        }
        // 3、普通异常，比如参数错误或者其他，直接弹出错误就可以的
        // 这里可以用一个弹出提示
        Dialog.alert({
          message: err.response.data.msg
        })
      }
      // 请求失败时的处理
      return Promise.reject(err)
    })
    instance.request(options)
      .then(res => {
        return resolve(res.data) // 直接放回的是后台返回的数据
      })
      .catch(err => {
        return reject(err.response.data)
      })
  })
}

/**
 * 定义一个 post 方法因为也经常用，可以按照这个仿写 其他方法
 * @param options
 * @returns {Promise<any>}
 */
const post = (options) => {
  options.method = 'post'
  return new Promise((resolve, reject) => {
    request(options).then(resolve).catch(reject)
  })
}

const get = (options) => {
  options.method = 'post'
  return new Promise((resolve, reject) => {
    request(options).then(resolve).catch(reject)
  })
}

const put = (options) => {
  options.method = 'put'
  return new Promise((resolve, reject) => {
    request(options).then(resolve).catch(reject)
  })
}

const del = (options) => {
  options.method = 'delete'
  return new Promise((resolve, reject) => {
    request(options).then(resolve).catch(reject)
  })
}

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
  post,
  get,
  put,
  del
}
