<template>
    <div class="timeline-container">
        <div class="gradient-background"></div>
        <div class="circle-mask"></div>
        <div class="timeline">
            <div class="timeline-item" v-for="(event, index) in events" :key="index" :style="{ transform: `rotateY(${index * (360 / events.length)}deg) translateZ(200px)` }">
                <div class="timeline-content">
                    <h3>{{ event.title }}</h3>
                    <p>{{ event.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义时间轴事件数组
const events = ref([
    { title: '2020-2024', description: 'Model for generating highly dimensional, mostly numeric, tabular data' },
    { title: '2017-2020', description: 'Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life\'s' },
    // 更多事件...
]);
</script>

<style scoped>
.timeline-container {
    position: relative;
    width: 100%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.gradient-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, rgba(158, 129, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.circle-mask {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 2;
}

.timeline {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%) rotateY(0deg);
    width: 50%;
    height: 400px;
    perspective: 1000px;
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from {
        transform: translateY(-50%) rotateY(0deg);
    }
    to {
        transform: translateY(-50%) rotateY(360deg);
    }
}

.timeline-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    width: 300px;
    height: 100px;
    display: flex;
    align-items: center;
}

.timeline-content {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    max-width: 300px;
}

.timeline-content h3 {
    margin: 0;
    font-size: 16px;
    color: #333;
}

.timeline-content p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
}
</style>