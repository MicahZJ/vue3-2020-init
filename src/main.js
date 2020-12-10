import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

// 绑定axios到Vue原型链
import HttpAxios from './utils/httpTool'
app.config.globalProperties.$Http = HttpAxios;

// element ui
import ElementPlus from 'element-plus';
// 样式加载失败，只能在CDN中引入，不解？
// import 'element-plus/lib/theme-chalk/index.css';

// 路由
import router from "./router";

// vuex
import store from './store/index';

app.use(store).use(router).use(ElementPlus).mount('#app');
