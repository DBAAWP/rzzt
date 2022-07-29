const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // avatar: state => state.user.avatar,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId, // 用户id
  staffPhoto: state => state.user.userInfo.staffPhoto, // 用户头像
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.routes

}
export default getters
