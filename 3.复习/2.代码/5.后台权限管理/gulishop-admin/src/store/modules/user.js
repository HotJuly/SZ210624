import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, anyRoutes, constantRoutes } from '@/router'
import router from '@/router'
import filterAsyncRoutes from '@/utils/filterAsyncRoutes'
import mapButtons from '@/utils/mapButtons'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',

    // 权限管理相关
    roles: [],

    // 此数组实际上用于存储info.routes
    routeNames: [],
    // 此数组实际上用于存储所有能够访问的路由对象
    routes: [],
    // 此对象用于存储info.buttons
    buttons: {}
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
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PERMISSION: (state, info) => {
    // console.log('info', info)
    const {roles, routes, buttons } = info;
    state.roles = roles;
    state.routeNames = routes;

    // 这个就是当前账号有权限访问的异步路由组成的数组
    const selectedAsyncRoutes = filterAsyncRoutes(asyncRoutes,routes)

    router.addRoutes([...selectedAsyncRoutes, ...anyRoutes]);

    state.routes = constantRoutes.concat(selectedAsyncRoutes, anyRoutes);

    // 由于已经获取到用户的权限信息,所以需要开始动态注入路由
    // state.routes = roles;

    // info.buttons存储这用户的按钮级权限信息
    // buttons是一个数组,可以用来查找是否具有权限,但是速度较慢,每次都需要遍历
    // 此处最好转换数据结构,变为对象,方便查找
    state.buttons = mapButtons(buttons);
  }
}

const actions = {
  // user login
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //     .then(response => {
  //       const { data } = response
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    try {
      const response = await login({ username: username.trim(), password: password });
      const { data } = response
      // 将请求回来的token存入Vuex的state中(相当于存储于内存中)
      commit('SET_TOKEN', data.token)
      // 将请求回来的token存入cookie中(相当于存储于硬盘中)
      // cookie相对localStorage的好处:每次发送请求会自动携带该token
      setToken(data.token)
    } catch (error) {
      console.log('error')
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_PERMISSION', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  // 开启命名空间,相当于是对所有的state,action,mutation进行模块化管理(类似作用域)
  //  dispatch('user/login')
  namespaced: true,
  state,
  mutations,
  actions
}

