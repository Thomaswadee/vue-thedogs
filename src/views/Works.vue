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
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>