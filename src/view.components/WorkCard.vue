<template>
    <div v-if="work" class="card">
        <div class="left-section">
            <a :href="work.link" target="_blank">
                <img :src="work.cover" alt="作品封面" class="cover-image" />
            </a>
        </div>
        <div class="right-section">
            <div class="title-section">
                <a :href="work.link" target="_blank">
                    <h2>{{ work.title }}</h2>
                </a>
            </div>
            <div class="description-section">
                <el-dropdown>
                    <el-button type="primary">
                        <el-icon>
                            <View />
                        </el-icon>参演成员
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="member in work.members" :key="member">
                                {{ member }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <el-button type="primary">
                        <el-icon>
                            <View />
                        </el-icon>巡演曲目
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item v-for="track in work.tracks" :key="track">
                                {{ track }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>
    </div>
    <div v-else>
        <p>作品信息未找到</p>
    </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import { useWorksStore } from '../stores/worksStore';
import { View } from '@element-plus/icons-vue';

// 定义组件的 props
const props = defineProps<{
    workId: number;
}>();

// 使用 Pinia store 获取作品数据
const worksStore = useWorksStore();
const work = ref(worksStore.getWorkById(props.workId));
// 调试信息
console.log(work.value);
</script>

<style scoped>
/* 样式部分无需修改 */
.card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    padding: 20px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border: 1px dotted;
}

.card:hover {
    transform: translateY(-5px);
}

.left-section {
    flex: 3;
    padding-right: 20px;
}

.right-section {
    flex: 7;
    display: flex;
    flex-direction: column;
}

.cover-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.cover-image:hover {
    transform: translateY(-10px);
}

.title-section {
    margin-bottom: 20px;
}

.title-section h2 {
    padding-top: 25px;
    margin: 0;
    font-weight: bold;
    font-size: 24px;
    cursor: pointer;
}

.description-section p {
    margin: 5px 0;
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    text-decoration: underline;
}

.placeholder {
    color: #ccc;
    font-style: italic;
}

.loading {
    text-align: center;
    color: #999;
}

/* 自定义成员介绍按钮样式 */
.el-dropdown :deep(.el-button) {
    background-color: #000000;
    /* 自定义背景颜色 */
    border-color: transparent;
    /* 移除边框颜色 */
    color: #ffffff;
    /* 自定义文字颜色 */
    border: none;
    /* 移除边框 */
    outline: none;
    /* 移除聚焦时的边框 */
    box-shadow: none;
    /* 移除阴影 */
}

.el-dropdown :deep(.el-button:hover) {
    background-color: #000000;
    /* 自定义悬停背景颜色 */
    border-color: transparent;
    /* 移除悬停边框颜色 */
    color: #ffffff;
    /* 自定义文字颜色 */
    border: none;
    /* 移除边框 */
    outline: none;
    /* 移除聚焦时的边框 */
    box-shadow: none;
    /* 移除阴影 */
}

.el-dropdown :deep(.el-button:active) {
    background-color: #000000;
    /* 自定义激活背景颜色 */
    border-color: transparent;
    /* 移除激活边框颜色 */
    color: #ffffff;
    /* 自定义文字颜色 */
    border: none;
    /* 移除边框 */
    outline: none;
    /* 移除聚焦时的边框 */
    box-shadow: none;
    /* 移除阴影 */
}

.el-dropdown :deep(.el-button:focus) {
    background-color: #000000;
    /* 自定义聚焦背景颜色 */
    border-color: transparent;
    /* 移除聚焦边框颜色 */
    color: #ffffff;
    /* 自定义文字颜色 */
    border: none;
    /* 移除边框 */
    outline: none;
    /* 移除聚焦时的边框 */
    box-shadow: none;
    /* 移除阴影 */
}

.description-section .el-dropdown {
    margin-top: 35px;
    /* 调整按钮的上边距 */
    margin-left: 30px;
    /* 调整按钮的左边距 */
}
</style>