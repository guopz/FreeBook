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
interface actionType {
  browserHeaderTitle?: String
  show?: Boolean
}

const mutations = {
  changeTitle(state: any, action: actionType) {
    state.header.browserHeaderTitle = action.browserHeaderTitle;
  },
  flagLoading(state: any, action: actionType) {
    state.loading = action.show;
  },
  showMenuRight(state: any) {
    state.header.headerBack = false,
    state.header.headerMenu = true
  },
  showMenuLeft(state: any) {
    state.header.headerBack = true,
    state.header.headerMenu = false
  },
  hideMenu(state: any) {
    state.header.headerBack = false,
    state.header.headerMenu = false
  }
};
const getters = {
  LOADING: (state: any) => {
    return state.loading;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});
