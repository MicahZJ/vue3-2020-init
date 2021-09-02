import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

// 绑定axios到Vue原型链
import HttpAxios from './utils/httpTool'
app.config.globalProperties.$Http = HttpAxios;

// element ui
import installElementPlus from './plugins/element'
installElementPlus(app);



// 路由
import router from "./router";

// vuex
import store from './store/index';

app.use(store).use(router).mount('#app');
