import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

// element ui
import ElementPlus from 'element-plus';
// 样式加载失败，只能在CDN中引入，不解？
// import 'element-plus/lib/theme-chalk/index.css';
app.use(ElementPlus);

// 绑定axios到Vue原型链
import HttpAxios from './utils/httpTool'
import router from "./router";

app.config.globalProperties.$Http = HttpAxios;
app.use(router);

app.mount('#app');
