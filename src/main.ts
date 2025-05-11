import { createApp } from 'vue'
import { createPinia } from 'pinia';


import './reset.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Top from './components/top/index.vue'
import Bottom from './components/bottom/index.vue'
import NavBar from './components/navbar/index.vue'
import router from './router';
import login from './components/login/index.vue'
import { ElMessage } from 'element-plus';

const app = createApp(App);
const pinia = createPinia();
app.use(ElementPlus, {
    locale: zhCn,
  })
app.component('top', Top);
app.component('bottom', Bottom);
app.component('navbar', NavBar);
app.use(router);
app.component('login', login);
app.config.globalProperties.$message = ElMessage;

app.use(pinia);
app.mount('#app')
