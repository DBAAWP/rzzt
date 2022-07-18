const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // avatar: state => state.user.avatar,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 用户名
  userId: state => state.user.userInfo.userId // 用户id

}
export default getters
