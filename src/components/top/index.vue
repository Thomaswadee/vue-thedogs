<template>
   <div class="top">
      <div class="content">
         <div class="left">
            <img src="../../assets/logo.png" alt="图片无法显示">
            <p>
               <span class="line1">The Dogs</span>
               <span class="line2">乐队官网</span>
            </p>
         </div>
         <div class="right">
            <button class="login" @click="Loginx">登录</button>
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
   display: flex;
   justify-content: center;
   align-items: center;
}

.content {
   width: 100%;
   max-width: 1500px;
   height: 100%;
   display: flex;
   justify-content: space-between;
   padding: 10px 20px;
   box-sizing: border-box;
}

.left {
   display: flex;
   justify-content: center;
   align-items: center;
   font-family: STCaiyun;
   white-space: nowrap;/* 禁止文字换行 */
}

.left img {
   width: 88px;
   height: 88px;
   margin-right: 10px;
   max-width: 100%;
   height: auto;
}

.left p {
   font-size: 2rem;
   font-weight: bold;
}

.right {
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1rem;
}

.login {
   border: 2px solid #000000;
   background-color: #ffffff;
   color: #000000;
   padding: 10px 20px;
   border-radius: 5px;
   cursor: pointer;
   font-size: 1rem;
   transition: background-color 0.3s ease, border-color 0.3s ease;

}

.login:hover {
   background: #000;
   color: #fff;
   border-color: #fff;
}

@media (max-width: 510px) {
   .left p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 0 0 0px;
      font-size: 1.8rem;
      font-weight: bold;
      line-height: 1.2;
   }

   .login {

      font-size: 0.75rem;
      padding:5px 10px;
   }
}
</style>