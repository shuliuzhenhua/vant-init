import axios from 'axios'
import { Config } from './config'
import { Dialog } from 'vant'

function request (options, handler = true) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token') // token放置在header中
      },
      baseURL: Config.restUrl, // 一般会在这里定义一个请求的根目录的
      timeout: 30 * 1000
    })
    instance(options).then(response => {
      return resolve(response)
    }).catch(error => {
      console.log('请求异常信息' + error)
      console.log(error.response)
      exceptionHandler(error.response, handler)
      return reject(error)
    })
  })
}

/**
 *
 * 自己写的一个错误，因为我们网站很多操作都是直接把后台的错误抛出就可以了的，所以就这样了。就不用再项目中判断了。
 * 这里做了一个处理，默认是会弹出错误，若是不想弹出错误则在第二个参数传入 false
 * @param response
 * @param handler
 */
function exceptionHandler (response, handler) {
  if (handler) {
    Dialog.alert({
      message: response.data.msg
    })
  }
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
  request
}
