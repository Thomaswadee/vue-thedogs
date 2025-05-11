<template>
   <div class="top">
      <div class="content">
         <div class="left">
            <img src="../../assets/logo.png" alt="图片无法显示">
            <p>The Dogs乐队官网</p>
         </div>
         <div class="right">
            <button class="login" @click="Loginx">登录/注册</button>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import useUserStore from '../../stores/login';

let userStore = useUserStore();

const Loginx = () => {
  userStore.visible = true;
}
</script>

<style scoped>
.top {
   width: 100%;
   height: 100px;
   background: #FFFFFF;
   display: flex;
   justify-content: center;
   align-items: center;
   transition: top 0.3s ease; /* 添加过渡效果 */
}

.top.hidden {
   top: -100px; /* 隐藏顶部组件 */
}

.content {
   width: 100%;
   max-width: 1500px; /* 设置最大宽度 */
   height: 100%;
   background: #FFFFFF;
   display: flex;
   justify-content: space-between;
   padding: 10px 20px; /* 使用相对单位 */
   box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */
}

.left {
   display: flex;
   justify-content: center;
   align-items: center;
   font-family: STCaiyun;
}

.left img {
   width: 88px;
   height: 88px;
   margin-right: 10px;
   max-width: 100%; /* 确保图片在小屏幕上不会超出容器 */
   height: auto; /* 保持图片比例 */
}

.left p {
   font-size: 2rem; /* 使用相对单位 */
   font-weight: bold;
}

.right {
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1rem; /* 使用相对单位 */
}

.login {
   border: 2px solid #000000; /* 添加边框 */
   background-color: #ffffff; /* 添加背景色 */
   color: #000000; /* 设置文字颜色 */
   padding: 10px 20px; /* 添加内边距 */
   border-radius: 5px; /* 添加圆角 */
   cursor: pointer; /* 设置鼠标悬停效果 */
   font-size: 1rem; /* 使用相对单位 */
   transition: background-color 0.3s ease, border-color 0.3s ease; /* 添加过渡效果 */
}

.login:hover {
   background-color: rgb(0, 0, 0); /* 悬停时改变背景色 */
   color: rgb(255, 255, 255); /* 设置文字颜色 */
   border-color: rgb(255, 255, 255); /* 悬停时改变边框颜色 */
}

/* 媒体查询 */
@media (max-width: 1200px) {
   .content {
      padding: 10px 15px; /* 减少内边距 */
   }

   .left p {
      font-size: 1.8rem; /* 减少字体大小 */
   }

   .right {
      font-size: 0.9rem; /* 减少字体大小 */
   }

   .login {
      font-size: 0.9rem; /* 减少字体大小 */
   }
}

@media (max-width: 768px) {
   .content {
      padding: 10px 10px; /* 减少内边距 */
   }

   .left img {
      width: 70px;
      height: 70px; /* 减少图片大小 */
   }

   .left p {
      font-size: 1.6rem; /* 减少字体大小 */
   }

   .right {
      font-size: 0.8rem; /* 减少字体大小 */
   }

   .login {
      font-size: 0.8rem; /* 减少字体大小 */
   }
}

@media (max-width: 480px) {
   .content {
      flex-direction: column; /* 列布局 */
      align-items: flex-start; /* 对齐方式 */
      padding: 10px 5px; /* 减少内边距 */
   }

   .left {
      margin-bottom: 10px; /* 添加底部间距 */
   }

   .left img {
      width: 50px;
      height: 50px; /* 减少图片大小 */
   }

   .left p {
      font-size: 1.4rem; /* 减少字体大小 */
   }

   .right {
      font-size: 0.7rem; /* 减少字体大小 */
   }

   .login {
      font-size: 0.7rem; /* 减少字体大小 */
   }
}
</style>