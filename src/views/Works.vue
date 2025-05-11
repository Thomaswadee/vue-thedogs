<template>
    <div class="works-container">
        <WorkCard :workId="1" />
        <WorkCard :workId="2" />
        <WorkCard :workId="3" />
        <WorkCard :workId="4" />
        <WorkCard :workId="5" />
        <WorkCard :workId="6" />
        <WorkCard :workId="7" />
        <WorkCard :workId="8" />
        <!-- 后期可以更方便的添加作品 -->
    </div>
</template>

<script setup lang="ts">
import WorkCard from '../view.components/WorkCard.vue';
</script>

<style scoped>
.works-container {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
    /* 添加上下内边距 */
    display: flex;
    /* 使用 flex 布局 */
    flex-direction: column;
    /* 垂直排列 */
    gap: 30px;
    /* 使用 gap 属性增加间距 */
}
</style>