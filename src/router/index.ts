import {createRouter,createWebHistory} from 'vue-router' ;

import Home from '../views/Home.vue';
import Works from '../views/Works.vue';
import Members from '../views/Members.vue';
import Discuss from '../views/Discuss.vue';
import About from '../views/About.vue';
//import Login from '../components/login/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/works', component: Works },
  { path: '/members', component: Members },
  { path: '/discuss', component: Discuss },
  { path: '/about', component: About },
//  { path: '/login', component: Login },
];
//首页
//作品
//乐队成员
//讨论区
//关于我们


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });
  export default router;