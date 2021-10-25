import {
  login,
  // logout,
  // getInfo
} from '@/api/modules/user'
import {
  getToken,
  getUserInfo,
  setToken,
  setUserInfo,
  removeToken,
  // setUserMenus,
  // getUserMenus
} from '@/utils/auth'
// import {
//   resetRouter
// } from '@/router'
// import router from '@/router'
import formRules from '@/utils/formRules'
// import {
//   filterAsyncRouter,
//   componentViews
// } from '@/router/filterRouter'
// import Layout from '@/layout'
// import {
//   recursiveMenus
// } from '@/utils/menu'

const loginOther = {
  client_id: "test",
  client_secret: "test",
  grant_type: "password",
  scope: "server",
}
// console.log(JSON.parse(getUserInfo()));
// console.log(getToken());
// console.log(getUserMenus());
const getDefaultState = () => {
  return {
    token: getToken() ? getToken() : '',
    name: '',
    avatar: getUserInfo() ? JSON.parse(getUserInfo()).icon_url : '',
    userInfo: getUserInfo() ? JSON.parse(getUserInfo()) : {},
    menus: [],
    formRules: formRules
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.userInfo = user
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, menus) => {
    // console.log(menus);
    if (menus) {
      state.menus = menus
    }
  }
}

const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      verificationCode
    } = userInfo
    let swaggerName = ''
    if (username.indexOf('swagger@') === -1) {
      swaggerName = `swagger@${username.trim()}`
    }
    return new Promise((resolve, reject) => {
      login(Object.assign(loginOther, {
        username: swaggerName,
        password: password,
        verificationCode: verificationCode
      })).then(response => {
        // const {
        //   data
        // } = response
        console.log(response);
        if (!response.license) {
          return this.$message.error(response.msg)
        }
        commit('SET_TOKEN', response.license)
        commit('SET_USER', response)
        // commit('SET_NAME', response.username)
        setToken(response.license)
        setUserInfo(response)
        resolve()
      }).catch(error => {
        console.log(error);
        reject(error)
      })
    })
  },

  // get user info
  // getUserInfoData({
  //   commit,
  //   state
  // }) {
  //   return new Promise((resolve, reject) => {
  //     // console.log(state);
  //     getInfo({
  //       userId: state.userInfo.user_id
  //     }).then(async response => {
  //       const {
  //         data
  //       } = response
  //       // console.log(response);
  //       if (response.code === '401') {
  //         removeToken()
  //         commit('RESET_STATE')
  //       }
  //       if (!data) {
  //         return reject(response)
  //       }
  //       const {
  //         username,
  //         iconUrl
  //       } = data
  //       // const menus = await getUserMenuData()
  //       // const menuTreeList = menus.data && menus.data[0] && menus.data[0].children || []
  //       // let menuList = filterAsyncRouter(menuTreeList)
  //       commit('SET_NAME', username)
  //       commit('SET_AVATAR', iconUrl)

  //       // menuList.unshift({
  //       //   path: '/',
  //       //   component: Layout,
  //       //   redirect: '/index',
  //       //   children: [{
  //       //     path: 'index',
  //       //     name: 'Index',
  //       //     component: componentViews('admin/home/index'),
  //       //     meta: {
  //       //       title: '系统首页',
  //       //       icon: 'icon-shouye',
  //       //       affix: true
  //       //     }
  //       //   }]
  //       // }, {
  //       //   path: '/redirect',
  //       //   component: Layout,
  //       //   hidden: true,
  //       //   children: [{
  //       //     path: '/redirect/:path(.*)',
  //       //     component: componentViews('redirect/index')
  //       //   }]
  //       // })
  //       // menuList.push(
  //       //   //   {
  //       //   //   path: '/404',
  //       //   //   component: componentViews('404'),
  //       //   //   hidden: true
  //       //   // }, 
  //       //   {
  //       //     path: '*',
  //       //     redirect: '/404',
  //       //     hidden: true
  //       //   })
  //       // resetRouter()
  //       // router.addRoutes(menuList) // 2.动态添加路由
  //       // console.log(menuList);
  //       // setUserMenus(menuList)
  //       // commit('SET_MENUS', menuList)
  //       // // global.antRouter = menuList // 3.将路由数据传递给全局变量，做侧边栏菜单渲染工作
  //       resolve(data)
  //     }).catch(error => {
  //       removeToken() // must remove  token  first
  //       commit('RESET_STATE')
  //       console.log(error);
  //       console.log(error.response.status);
  //       reject(error)
  //     })
  //   })
  // },

  // user logout
  // logout({
  //   commit,
  //   state
  // }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}