<template>
  <nav class="nav-bar" :style="{ top: navTop + 'px' }">
    <div class="nav-container">
      <ul>
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-item" :class="{ active: isActive(item.path) }">
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const route = useRoute();
    const menuItems = ref([
      { path: '/', name: '首页' },
      { path: '/works', name: '作品' },
      /*  { path: '/members', name: '成员' }, */
      { path: '/discuss', name: '讨论' },
      { path: '/about', name: '关于' },
    ]);

    const isActive = (path: string): boolean => {
      return route.path === path;
    };

    const navTop = ref(0);

    let lastScrollTop = 0;
    let ticking = false;
    //监听滚动事件，控制导航栏置顶功能
    const handleScroll = () => {
      lastScrollTop = window.scrollY;
      if (!ticking) {//使用节流机制，只有上次动画帧执行完才能再次执行，防止高频触发滚动事件
        window.requestAnimationFrame(() => {
          navTop.value = lastScrollTop > 110 ? 0 : 110 - lastScrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // 手动调用一次以初始化 navTop 的值
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      menuItems,
      isActive,
      navTop,
    };
  }
});
</script>

<style scoped>
.nav-bar {
  background: #000;
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 999;
  transition: top 0.0s ease, box-shadow 0.0s ease;
  /*暂不设置过渡动画持续时间*/
  height: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 70%;
}

.nav-bar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;/*重置默认样式*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav-bar li {
  margin: 0 10px;
}

.nav-item {
  display: block;
  color: white;
  text-align: center;

  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  font-family: Hiragino Sans GB;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 0px;
}

.nav-item.active {
  transform: translateY(-4px);
}

.nav-item:hover {
  transform: translateY(-2px);
}


.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 120%;/* 下划线比文字宽 20% */
  max-width: 200px;
  height: 2px;
  background-color: white;
}
</style>