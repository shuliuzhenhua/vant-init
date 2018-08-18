// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import util from './util'

import 'styles/reset.css'
import 'styles/border.css'

require('./common') // 需要引入切直接执行的js 代码

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.prototype.$request = util.request
Vue.prototype.$get = util.get
Vue.prototype.$post = util.post
Vue.prototype.$put = util.put
Vue.prototype.$delete = util.del
Vue.prototype.obj = util.obj

Vue.use(util)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
