import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// 自定义指令
import * as directives from '@/directives'
import * as filters from '@/filters'
import '@/icons' // icon
import '@/permission' // permission control

// 自定义组件
import components from '@/components'
import checkPermission from '@/mixin/checkPermission.js'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// Object.keys把自定义里面的对象全部遍历为数组,然后去遍历
Object.keys(directives).forEach(key => {
  // 注册自定义指令
  Vue.directive(key, directives[key])
})
// 自定义全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.mixin(checkPermission)
Vue.use(components)
Vue.config.productionTip = false
import Print from 'vue-print-nb'
Vue.use(Print)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
