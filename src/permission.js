// 权限拦截在路由跳转,导航守卫
import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出,需要要让代码执行即可
// 前置守卫
// netx是前置守卫必须执行的钩子, next必须执行
// next()放过
// next(false) 跳转终止
// next(地址) 跳转某个地址
// 前置守卫有一个参数(回调函数), 这个回到函数里面有三个参数?????????
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条
  const whitelist = ['/login', '/404']
  if (store.getters.token) {
    // 如果有token
    // 访问登录,直接跳转到主页面
    if (to.path === '/login') {
      next('/')
      //   不是访问登录页,放过
    } else {
      // 如果没有id表示当前用户资料没有获取过,
      if (!store.getters.userId) {
        // 因为dispatch调用的是异步函数,如果不设为同步那么
        // 在还没有获取到用户信息的时候就会跳转页面
        // 后面有要用到用户信息的时候就会报错
        const { roles } = await store.dispatch('user/getUserInfo')
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
    }
    // 没有token
  } else {
    // 访问登陆页面或者404放过
    if (whitelist.indexOf(to.path) > -1) {
      next()
    } else {
      //   没有token, 也不是访问登录页面, 则跳转到登录页面
      next('/login')
    }
  }
  nprogress.done() // 解决手动切换地址时,进度条不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
