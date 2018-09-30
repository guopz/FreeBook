import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  header: {
    browserHeaderTitle: '',
    headerBack: false,
    headerMenu: true
  },
  loading: false
};
const mutations = {
  changeTitle(state, action) {
    state.header.browserHeaderTitle = action.browserHeaderTitle;
  },
  flagLoading(state, action) {
    state.loading = action.show;
  },
  showMenuRight(state) {
    state.header.headerBack = false,
    state.header.headerMenu = true
  },
  showMenuLeft(state) {
    state.header.headerBack = true,
    state.header.headerMenu = false
  },
  hideMenu(state) {
    state.header.headerBack = false,
    state.header.headerMenu = false
  }
};
const getters = {
  LOADING: state => {
    return state.loading;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});
