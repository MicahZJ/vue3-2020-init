import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  },
  getters: {
    count: state => state.count,
  },
  mutations: {
    increment (state) {
      state.count++;
      console.log(store.state.count)
    }
  },
  actions: {
  },
  modules: {
  }
});

export default store
