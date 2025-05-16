import { createRouter, createWebHistory } from 'vue-router';


//import Login from '../components/login/index.vue'

//启用路由懒加载和路由缓存
const routes = [
  { path: '/', component: () => import('../views/Home.vue'), meta: { keepAlive: true }},
  { path: '/works', component: () => import('../views/Works.vue'), meta: { keepAlive: true }},
  { path: '/members', component: () => import('../views/Members.vue'), meta: { keepAlive: true }},
  { path: '/discuss', component: () => import('../views/Discuss.vue'), meta: { keepAlive: true }},
  { path: '/about', component: () => import('../views/About.vue'), meta: { keepAlive: true }}
];
//  { path: '/login', component: Login },

//首页
//作品
//乐队成员
//讨论区
//关于我们 , meta: { keepAlive: true }


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;