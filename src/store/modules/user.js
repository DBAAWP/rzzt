import { login, getUserInfo } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken(), // 用户token
  userInfo: {} // 用户数据
}
const mutations = {
  // 用户token
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  removeToken(state) {
    state.token = undefined
    removeToken()
  },
  // 用户数据
  setUserInfo(state, result) {
    state.userInfo = result
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) {
    // 获取响应拦截器返回的token
    const result = await login(data)
    if (result) {
      context.commit('setToken', result)
    }
  },
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result // 后期做权限控制的时候在用
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
