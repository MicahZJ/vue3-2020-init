# vue3-2020-init
## 1.安装vue3
### 下载最新的vue-cli
```
yarn global add @vue/cli@next
```
### 安装vue3
```
vue create vue3-2020-init
```
## 2.新建vue.config
```
const path = require("path");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  // 基本路径
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  //   compiler: false,
  runtimeCompiler: true, //关键点在这
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      var optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        },
        minimizer: [
          new UglifyPlugin({
            uglifyOptions: {
              compress: {
                warnings: false,
                drop_console: true, // console
                drop_debugger: false,
                pure_funcs: ["console.log"] // 移除console
              }
            }
          })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
      var optimization2 = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
    }
    Object.assign(config, {
      // 开发生产共同配置
      
      // externals: {
      //   'vue': 'Vue',
      //   'element-ui': 'ELEMENT',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex'
      // } // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
      resolve: {
        extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          "@u": path.resolve(__dirname, "./src/utils"),
          "@s": path.resolve(__dirname, "./src/service")
        }, // 别名配置
        plugins: []
      },
      optimization: optimization2
    });
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, //注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",	// 需要转换的单位，默认为"px"
            viewportWidth: 1920,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            // viewportHeight:667,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 3,		// 单位转换后保留的精度
            propList: [		// 能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw",		// 希望使用的视口单位
            fontViewportUnit: "vw",		// 字体使用的视口单位
            selectorBlackList: [],	// 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1,		// 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,		// 媒体查询里的单位是否需要转换单位
            replace: true,		// 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/,		// 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    // host: "192.168.0.137",
    host: "0.0.0.0", //局域网和本地访问
    //host: "192.168.1.137",
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        // target: "http://192.168.0.106:8080/",
        target: "http://192.168.1.126:8080/", //阳洋
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: () => {}
  },
  // 第三方插件配置
  pluginOptions: {}
};
```
## 3.安装包
### 3-1.压缩js
在vue.config中配置
```
npm i -D uglifyjs-webpack-plugin
```

### 3-2.stylus
不用配置
```
npm i -D stylus stylus-loader
```

### 3-3.pug
不用配置
```
npm i -D pug-plain-loader pug
```

### 3-4. vw布局
#### 下包
```
npm i -D postcss-px-to-viewport
```
##### 在vue.config中配置
找到css下的loaderOptions属性
```
css: {
    // 是否使用css分离插件 ExtractTextPlugin
    // extract: true, //注释css热更新生效
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",	// 需要转换的单位，默认为"px"
            viewportWidth: 1920,   // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            // viewportHeight:667,// 视窗的高度，对应的是我们设计稿的高度
            unitPrecision: 3,		// 单位转换后保留的精度
            propList: [		// 能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw",		// 希望使用的视口单位
            fontViewportUnit: "vw",		// 字体使用的视口单位
            selectorBlackList: [],	// 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1,		// 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false,		// 媒体查询里的单位是否需要转换单位
            replace: true,		// 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/,		// 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          })
        ]
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },
```

### 3-5.vue-router
#### 查看vue-router版本
```
npm info vue-router versions
```
#### 选择最后的rc版本
```
npm i -D uglifyjs-webpack-plugin
```
#### 在src下新建router文件夹，并建立index.js
```
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'

// 构建我们的页面路由配置，可以看到，这里和原来的写法并无二致。
const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  // {
  //   path: '/about',
  //   component: () => import('@/views/About.vue'),
  // }
];

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  // history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  history: createWebHistory(),
  routes
});
export default router
```
#### 导入路由
在main.js中使用
```
import { createApp } from 'vue'
import App from './App.vue'

// 导入路由配置
import router from "./router";

const app = createApp(App);
// 使用路由
app.use(router);
app.mount('#app');
```

### 3-6.配置axios
vue3不适用把axios绑定到原型链，在src下创建utils文件夹
#### 新建httpTool
```
import axios from "axios";
import webConfig from "./webConfig";

class HttpAxios {
  constructor () {
  }
  
  axiosGet(url, params) {
    // 设置token
    // axios.defaults.headers.common["Authorization"] = "token " + localStorage.getItem("token");
    
    // 配置接口地址
    url = webConfig.apiPath + url;
    
    // 返回一个promise的get请求
    return axios
      .get(url, params)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(ERR => {
        // alert(ERR);
        console.log("接口报错", ERR);
      });
  }
  
  axiosPost(url, params) {
    // 设置token
    // axios.defaults.headers.common["Authorization"] = "token " + localStorage.getItem("token");
    
    // 配置接口地址
    url = webConfig.apiPath + url;
    
    // 返回一个promise的post请求
    return axios
      .post(url, params)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(ERR => {
        // alert(ERR);
        console.log("接口报错", ERR);
      });
  }
}

export default new HttpAxios()

```
#### 新建webConfig
```
let api;
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  // 生产环境api接口地址
  api = {
    apiURL: "/",
    publicPath: "/",
    apiPath: "/",
    staticPath: "/"
  };
} else if (process.env.NODE_ENV === "development") {
  // 开发环境
  api = {
    apiURL: "/",
    publicPath: "/",
    apiPath: "/",
    staticPath: "/"
  };
}

const config = {
  api: api,
  publicPath: api.publicPath,
  staticPath: api.staticPath,
  apiPath: api.apiPath
};

export default config;

```
#### 在main.js中使用
```
import { createApp } from 'vue'
import App from './App.vue'

// 绑定axios到Vue原型链
import HttpAxios from './utils/httpTool'

const app = createApp(App);

// 绑定
app.config.globalProperties.$Http = HttpAxios;
app.mount('#app');

```

### 3-7.配置element
### 1.下包
第一种 `vue add element-plus`

第二种`npm install element-plus --save`/ 推荐用第二种

#### 2.在main.js中导入
```
import { createApp } from 'vue'
import App from './App.vue'

// element ui
import ElementPlus from 'element-plus';
// 样式加载失败，只能用CDN了
// import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(ElementPlus);

app.mount('#app');

```
### 3-8 配置vuex
#### 1.下包
`vue add vue-next` 或者 `npm install vuex@next --save`

#### 2.配置
在src下新建store文件夹，并建立index文件
```
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
```
在main文件中导入
```
// vuex
import store from './store/index';
app.use(store);
```
#### 3.使用
这边页面是分离的，所以js和html放在两个文件里面
```
import { useStore } from "vuex";
import { computed } from 'vue'

export default {
  data () {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    clickUp() {
      this.increment()
    }
  },
  components: {},
  setup() {
    // store
    const store = useStore ();
    return {
      // 定义一个 mutation
      increment: () => store.commit('increment'),
      // 在 computed 函数中定义一个 getter
      double: computed(() => store.getters.count)
    }
  }
};
```
在html中使用
```
<template>
  <div>
    <span class="test">VueX4测试用例{{double}}</span>
    <el-button type="primary" @click="clickUp">vuex按钮</el-button>
  </div>
</template>

<script src="./control.js"></script>
```
### 3-9 配置router
#### 1.下载
```
npm install vue-router -D
```
#### 2.配置
```
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import store from '../store/index'
// 构建我们的页面路由配置，可以看到，这里和原来的写法并无二致。
const routes = [
  {
    path: '/',
    component: HelloWorld
  },
  {
    path: '/vuex',
    component: () => import('@/views/vuex_page/index.vue'),
  }
];

const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  // history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  history: createWebHistory(),
  routes
});

// 路由守卫-方式一
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     // 当前组件需要登录权限
//     if (localStorage.getItem("token")) {
//       // 有权限
//       if (to.path === "/login") {
//         //登录状态下 访问login.vue页面 会跳到homepage.vue
//         next({ path: "/homepage" });
//       } else {
//         next();
//       }
//     } else {
//       // 没有权限 ,访问任何页面。都会进入到 登录页
//       console.log("进入1");
//       if (to.path === "/login") {
//         // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
//         console.log("进入2");
//         next();
//       } else {
//         // 否则 跳转到登录页面
//         console.log("进入3");
//         next({ path: "/" });
//       }
//     }
//   } else {
//     // 不需要
//     next();
//   }
// });

// 路由守卫-方式二
// router.beforeEach( async (to, from, next) => {
//   console.log('before路由', to);
//
//   let hasLogin = localStorage.getItem("Flag")
//
//   if (hasLogin) {
//     if (store.state.menuList.length === 0) {
//
//       // 进入到这一步用户已经登录过，但是又刷新了浏览器，导致路由清空了,所以要重新请求路由
//       // 请求数据列表
//       let resCode = await store.dispatch('getCompanyList')
//       if (resCode !== 200) {
//         return
//       }
//
//       // 请求路由列表
//       let res = await store.dispatch('getMenuList')
//       // code 不为200 时候，说明路由接口报错，需要重新登录
//       if (res !== 200) {
//         localStorage.clear();
//         MessageBox({
//           title: '警告',
//           message: '导航配置问题，请联系管理员',
//           callback: action => {
//             localStorage.clear();
//             next({path: '/login', replace: true })
//           }
//         })
//       } else {
//         // router.addRoutes是异步的，所以把全局的跳转 *也动态添加了，同时使用 next({ ...to, replace: true })重新载入
//         next({...to, replace: true })
//       }
//
//
//     }
//     // 已经登录过访问的是login，跳转至home
//     if (to.name === 'Login') {
//       next({
//         path: recursiveRouter(store.state.menuList[0]),
//       })
//     } else {
//       // 当匹配不到路由，则判断进入路由第一个页面
//       if (to.name === 'error') {
//         let path = recursiveRouter(store.state.menuList[0]);
//         next({
//           path: path
//         })
//       } else {
//         next()
//       }
//     }
//   } else {
//     console.log('to', to);
//     // 没有登录想访问其他页面，跳转至
//     if (to.name !== 'Login') {
//       next({
//         path: '/login',
//       })
//     } else {
//       next()
//     }
//   }
//   // next()
// });
//
// // 递归路由
// let recursiveRouter = (data) => {
//   if (data.children && data.children.length > 0) {
//     return recursiveRouter(data.children[0])
//   } else {
//     return data.path
//   }
// };

export default router
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
