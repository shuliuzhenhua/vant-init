# wap

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 在原有的基础上加入了 vant 框架，直接使用即可

新增 pages 目录用来存放页面
可直接使用 px 单位，为自动转为 vw
在assets目录下 新增 func.styl 放置函数 varibles.styl 用来放置变量
border.css 用来解决一像素边框问题
reset.css 初始化css

#axios 说明封装至 util.js 中还做了一个默认根目录，以后的请求会非常方便，另外需要注意的是 catch 错误处理，这个需要根据自己的情况来

例子1

this.request({
  url: 'xxxx'
}).then(res => {
  // 你的代码
})

例子2

this.request({
  url: 'xxxx'
}).then(res => {
  // 你的代码
},false).catch(error => {
  // 你的代码
})


即可构建一个简单的请求
