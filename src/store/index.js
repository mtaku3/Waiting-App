import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket: null
  },
  mutations: {
    register(state, socket) {
      state.socket = socket;
    }
  },
  actions: {
  },
  modules: {
  }
})
