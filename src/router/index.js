<<<<<<< HEAD
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
=======
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
>>>>>>> master
export default router