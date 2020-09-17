import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: "",
    camera_sn: "",
    caremeList: [],
    positionList: [],
    defaultId: "",
    forbidClick: "",
    snapshot1: "",
    snapshot2: "",
    snapshot3: "",
    snapshot4: ""
  },
  mutations: {
    changeUseId(state, id) {
      state.userId = id;
    },
    getCaremeList(state, data) {
      state.caremeList = data;
    },
    getPositionList(state, data) {
      state.positionList = data;
    },
    getSnapshot(state, id) {
      state.camera_sn = id;
    },
    defaultId(state, id) {
      state.defaultId = id;
    },
    getSnapshot1(state, data) {
      state.snapshot1 = data;
    },
    getSnapshot2(state, data) {
      state.snapshot2 = data;
    },
    getSnapshot3(state, data) {
      state.snapshot3 = data;
    },
    getSnapshot4(state, data) {
      state.snapshot4 = data;
    }
  },
  actions: {},
  modules: {}
});
