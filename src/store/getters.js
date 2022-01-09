const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  commonInfo: state => state.app.commonInfo,
  curUserInfo: state => state.app.curUserInfo || {},
  token: state => state.user.token,
  utoken: state => state.user.utoken,
  avatar: state => state.user.avatar,
  logined: state => state.user.logined,
  permissionRoutes: state => state.app.routes,
  permissionAuths: state => state.app.permissions
}
export default getters
