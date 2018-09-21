import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  header: {
    browserHeaderTitle: '限时免费',
    headerBack: false,
    headerMenu: true,
    show: true
  }
};
const mutations = {
  changeTitle(state, action) {
    state.header = action;
    if (!state.headerheaderBack && !state.headerMenu) {
      state.header.show = false;
    }
  }
};

export default new Vuex.Store({
  state,
  mutations
});
