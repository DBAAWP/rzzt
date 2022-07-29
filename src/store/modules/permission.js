import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  routes: constantRoutes // 路由表, 表示 当前用户拥有的所有路由
}
const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 每次都在静态路由上添加路由
  }
}
const actions = {
  filterRoutes(context, menus) {
    const routes = []
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
