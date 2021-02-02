import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import store from '../store/index'

import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

// 简单配置
NProgress.inc(2);
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false }); // 动作

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

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done();
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