import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

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
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

export default store
