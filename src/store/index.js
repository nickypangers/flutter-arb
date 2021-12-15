import { createStore } from "vuex";

const store = createStore({
  state: {
    files: [],
  },
  mutations: {
    setFiles: (state, files) => {
      state.files = files;
    },
  },
  actions: {
    loadFiles: ({ commit }, files) => {
      commit("setFiles", files);
    },
    clearFiles: ({ commit }) => {
      commit("setFiles", []);
    },
  },
});

export default store;
