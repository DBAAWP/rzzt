import { login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

const state = {
  token: getToken() // 用户token
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
  }
}
const actions = {
  async login(context, data) {
    // 获取响应拦截器返回的token
    const token = await login(data)
    console.log(data)
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
