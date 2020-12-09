import { createApp } from 'vue'
import App from './App.vue'

// 插件相关
import './plugins/index'

// 绑定axios到Vue原型链
import HttpAxios from './utils/httpTool'
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$Http = HttpAxios;
app.use(router);

app.mount('#app');
