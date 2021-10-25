import Cookies from 'js-cookie'

export function getToken() {
  // console.log(Cookies.get('token'));
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}

export function removeToken() {
  return Cookies.remove('token')
}

export function setUserInfo(userInfo) {
  return Cookies.set('user', userInfo)
}

export function getUserInfo() {
  // console.log(Cookies.get('user'));
  return Cookies.get('user')
}

// export function setUserMenus(menus) {
//   return Cookies.set('menus', menus)
// }

// export function getUserMenus() {
//   return Cookies.get('menus')
// }
