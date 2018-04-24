/**
 * vuex基本靠抄的，做实战的时候 好好弄明白流程，研究研究原理
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex)

const defaultState = {
  users: []
}

const inBrowser = typeof window !== 'undefined';

if (!inBrowser || process.env.NODE_ENV == "development") {
  Vue.use(Vuex);
}

/**
 * if in browser, use pre-fetched state injected by SSR
 * 上面的👆的英文是官网给的注释，自己去翻译
 * 因为ssr页面要跑到浏览器里，这里判断是跑在前端还是后端
 */
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

const mutations = {
  GET_USERS: (state, users) => {
      state.users = users
  },

}

export function createStore() {
  const store = new Vuex.Store({
      state,
      actions,
      mutations,
      getters
  });
  return store;
}
