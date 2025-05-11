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
      { path: '/members', name: '乐队成员' },
      { path: '/discuss', name: '讨论区' },
      { path: '/about', name: '关于我们' },
    ]);

    const isActive = (path: string): boolean => {
      return route.path === path;
    };

    const navTop = ref(0);
    let lastScrollTop = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollTop = window.scrollY;
      if (!ticking) {
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
  background: linear-gradient(to right, #f44336, #3f51b5);
  /* 水平渐变背景 */
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  /* 固定导航栏 */
  z-index: 999;
  /* 确保导航栏在顶部组件下方 */
  transition: top 0.0s ease;
  /* 添加过渡效果 */
  height: 60px; /* 默认高度 */
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
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%; /* 与 .nav-bar 高度一致 */
}

.nav-bar li {
  margin: 0 10px;
}

.nav-item {
  display: block;
  color: white;
  text-align: center;
  padding: 22px 16px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  font-family: Hiragino Sans GB;
  height: 100%; /* 与 .nav-bar 高度一致 */
  box-sizing: border-box;
}

.nav-item.active {
  background: linear-gradient(to right, #3f51b5, #f44336);
  /* 相反的水平渐变背景 */
  padding: 22px 16px;
  height: 100%; /* 与 .nav-bar 高度一致 */
  box-sizing: border-box;
}

/* 媒体查询 */
@media (max-width: 1200px) {
  .nav-bar {
    height: 55px; /* 减少高度 */
  }

  .nav-container {
    padding: 0 15px; /* 减少内边距 */
  }

  .nav-item {
    font-size: 14px; /* 减少字体大小 */
    padding: 18px 14px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }

  .nav-item.active {
    padding: 20.5px 14px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }
}

@media (max-width: 768px) {
  .nav-bar {
    height: 50px; /* 减少高度 */
  }

  .nav-container {
    padding: 0 10px; /* 减少内边距 */
  }

  .nav-item {
    font-size: 12px; /* 减少字体大小 */
    padding: 15px 12px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }

  .nav-item.active {
    padding: 19px 12px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }
}

@media (max-width: 570px) {
  .nav-bar {
    height: 45px; /* 减少高度 */
  }

  .nav-container {
    padding: 0 5px; /* 减少内边距 */
  }

  .nav-item {
    font-size: 10px; /* 减少字体大小 */
    padding: 12px 10px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }

  .nav-item.active {
    padding: 17.5px 10px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }
}

@media (max-width: 500px) {
  .nav-bar {
    height: 40px; /* 减少高度 */
  }

  .nav-container {
    padding: 0 5px; /* 减少内边距 */
  }

  .nav-item {
    font-size: 8px; /* 减少字体大小 */
    padding: 8px 8px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }

  .nav-item.active {
    padding: 15px 8px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }
}

@media (max-width: 480px) {
  .nav-bar {
    height: 45px; /* 减少高度 */
  }

  .nav-container {
    padding: 0 5px; /* 减少内边距 */
  }

  .nav-item {
    font-size: 10px; /* 减少字体大小 */
    padding: 12px 10px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }

  .nav-item.active {
    padding: 12.5px 10px; /* 减少内边距 */
    height: 100%; /* 与 .nav-bar 高度一致 */
  }
}
</style>