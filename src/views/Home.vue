<template>
    <div class="block text-center">
        <Carousel />

    </div>
</template>

<script setup lang="ts">
import Carousel from '../view.components/Carousel.vue';
</script>

<style scoped>
.block {
    position: relative; /* 确保轮播图有相对定位 */
    z-index: 1; /* 设置较低的 z-index */
    margin-top: 0px; /* 确保轮播图在顶部导航栏下方 */
}
</style>