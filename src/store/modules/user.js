import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { getToken, removeToken, setToken, setTimeStamp } from '@/utils/auth'

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
  // 登录
  async login(context, data) {
    // 获取响应拦截器返回的token
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token

    setTimeStamp() // 设置当前的时间戳
  },
  // 用户基本信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    // console.log(baseResult)
    context.commit('setUserInfo', baseResult)
    return baseResult // 后期做权限控制的时候在用
  },
  // 登出  删除token 删除 用户基本信息
  logout(context) {
    context.commit('removeToken')
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
