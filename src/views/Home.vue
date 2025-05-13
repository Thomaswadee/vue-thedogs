<template>
    <div class="block text-center">
        <Carousel />
    <h1 id="band-intro" @click="scrollToTop">乐队介绍</h1>
        <h2>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            The Dogs乐队创立于2021年末，初创成员仅四位，经过长时间的发展成长至十多位成员。
            乐队的每一位成员都带着对音乐的热爱和对梦想的追求，共同创作出一首首触动人心的作品，
            更在音乐风格和表演技巧上不断探索和进步。
        </h2>
        <h2>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            The Dogs乐队不需要门槛，乐队建立初衷就是给所有人一个可以表演的舞台，对音乐的热爱和坚持就是最好的基础。
        </h2>
        <h2>
            music forever , love forever !
        </h2>
    <h1 id="band-intro" @click="scrollToTop">录播</h1>
        <h2>
            剪辑师doge平台账号：<a href="https://space.bilibili.com/348962892" target="_blank">https://space.bilibili.com/348962892</a>
        </h2>
        <h2>
            更多相关请点击上方导航栏
        </h2>
    </div>
    
</template>

<script setup lang="ts">
import Carousel from '../view.components/Carousel.vue';

const scrollToTop = () => {
  const element = document.getElementById('band-intro');
  if (element) {
    const navBar = document.querySelector<HTMLElement>('.nav-bar')
    const navHeight = navBar ? navBar.offsetHeight : 0;
    // 计算目标滚动位置
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - navHeight,
      behavior: 'smooth',
    });
  }
};
</script>

<style scoped>
.block {
  position: relative;
  z-index: 1;
  margin-top: 0px;
  text-align: center;
}

.block h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  margin: 15px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
  
}
.block h1 {
  transition: border-color 0.3s ease, color 0.3s ease;
}

.block h1:hover {
  color: #4070ff;
  border-bottom-color: #4070ff;
  cursor: pointer;
}
.block h2 {
  font-size: 1.1rem;
  color: #333; 
  line-height: 1.8; 
  margin: 20px auto;
  max-width: 800px; 
  text-align: left; 
}
.block a {
    color: #000000;
    text-decoration: none;
    text-decoration: underline;
}
/* 移动端适配 */
@media (max-width: 796px) {
    .block h2{
          max-width:90%;
    }
}
</style>