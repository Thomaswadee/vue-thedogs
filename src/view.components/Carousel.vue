<template>
    <div class="carousel-container">
        <el-carousel :height="carouselHeight" indicator-position="outside" :pause-on-hover="true" type="card" arrow="never" motion-blur ref="carouselRef" @change="onCarouselChange">
            <el-carousel-item v-for="(item, index) in images" :key="index" @click="handleClick(item.link)">
                <div class="carousel-item-content" @mouseenter="showInfo(index)" @mouseleave="hideInfo">
                    <img :src="item.src" :class="{ 'blur-effect': isBlurred(index) }" />
                    <div v-if="activeInfoIndex === index || activeInfoIndex === -1" class="info-overlay">
                        {{ item.info }}
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
        <button class="custom-arrow custom-arrow--left" @click="prev">
            <span></span>
        </button>
        <button class="custom-arrow custom-arrow--right" @click="next">
            <span></span>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useCarouselStore } from '../stores/carousel';
import { ElCarousel } from 'element-plus';

// 使用 Pinia store
const carouselStore = useCarouselStore();
const images = carouselStore.images;

// 响应式高度
const carouselHeight = ref('378px');

// 计算轮播图高度
const updateCarouselHeight = () => {
    const width = window.innerWidth;
    if (width < 600) {
        carouselHeight.value = '200px'; // 小屏幕
        activeInfoIndex.value = -1; // 显示所有图片的信息
    } else if (width < 1024) {
        carouselHeight.value = '300px'; // 中等屏幕
        activeInfoIndex.value = null; // 隐藏信息
    } else {
        carouselHeight.value = '378px'; // 大屏幕
        activeInfoIndex.value = null; // 隐藏信息
    }
};

// 监听窗口大小变化
onMounted(() => {
    window.addEventListener('resize', updateCarouselHeight);
    updateCarouselHeight(); // 初始化高度
});

onUnmounted(() => {
    window.removeEventListener('resize', updateCarouselHeight);
});

// 点击图片时的处理函数
const handleClick = (link: string) => {
    window.open(link, '_blank'); // 在新窗口中打开链接
};

// 显示信息
const activeInfoIndex = ref<number | null>(null);
const showInfo = (index: number) => {
    activeInfoIndex.value = index;
};

// 隐藏信息
const hideInfo = () => {
    if (window.innerWidth >= 600) {
        activeInfoIndex.value = null;
    }
};

// 获取 el-carousel 实例
const carouselRef = ref<InstanceType<typeof ElCarousel>>();

// 上一张
const prev = () => {
    carouselRef.value?.prev();
};

// 下一张
const next = () => {
    carouselRef.value?.next();
};

// 当前激活的索引
const activeIndex = ref(0);

// 监听轮播图切换事件
const onCarouselChange = (newIndex: number, oldIndex: number) => {
    activeIndex.value = newIndex;
    console.log(oldIndex);
};

// 判断图片是否需要虚化
const isBlurred = (index: number) => {
    return index !== activeIndex.value;
};
</script>

<style scoped>
.carousel-container {
    position: relative; /* 确保轮播图有相对定位 */
    z-index: 1; /* 设置较低的 z-index */
    margin-top: 0px; /* 确保轮播图在顶部导航栏下方 */
    width: 100%; /* 确保父容器宽度足够 */
}

.el-carousel {
    width: 100%; /* 使用相对单位 */
    margin: 0 auto; /* 使轮播图居中 */
}

.el-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s; /* 添加过渡效果 */
}

.carousel-item-content {
    position: relative;
    width: 100%;
    height: 100%;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 确保图片在容器内完整显示 */
    object-position: center;
    background-color: rgb(255, 255, 255);
    border-radius: 6px; /* 设置图片边框圆角 */
    transition: filter 0.5s ease; /* 添加过渡效果 */
}

img.blur-effect {
    filter: blur(5px); /* 虚化效果 */
}

.info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* 半透明背景 */
    color: white;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: opacity 0.3s; /* 添加过渡效果 */
    opacity: 1;
    font-size: 16px; /* 默认字体大小 */
}

.info-overlay.hidden {
    opacity: 0;
}

/* 媒体查询 */
@media (max-width: 600px) {
    .info-overlay {
        font-size: 10px; /* 减小字体大小 */
    }
}

/* 自定义箭头样式 */
.custom-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    cursor: pointer;
    z-index: 10;
}

.custom-arrow:hover {
    background-color: rgba(0, 0, 0, 0.7);
}

.custom-arrow--left {
    left: 20px;
}

.custom-arrow--right {
    right: 20px;
}

.custom-arrow::before {
    content: '';
    width: 12px;
    height: 12px;
    border-top: 2px solid white;
    border-left: 2px solid white;
    position: absolute;
}

.custom-arrow--left::before {
    transform: rotate(-45deg);
}

.custom-arrow--right::before {
    transform: rotate(135deg);
}

/* 修改 el-carousel 指示器样式 */
:deep(.el-carousel__indicators) {
    bottom: 20px; /* 调整指示器位置 */
}

:deep(.el-carousel__indicator) {
    button {
        width: 20px; /* 调整指示器按钮宽度 */
        height: 20px; /* 调整指示器按钮高度 */
        background-color: #a4a3a3; /* 调整指示器按钮颜色 */
        border-radius: 50%; /* 设置指示器按钮为圆形 */
    }
}

/* 添加边框效果 */
:deep(.el-carousel__item) {
    border: 3px solid #000000; /* 边框颜色 */
    border-radius: 8px; /* 边框圆角 */
    padding: 0px; /* 减少内边距以缩小边框所包含的面积 */
    box-sizing: border-box; /* 确保 padding 和 border 包含在元素的宽度和高度内 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>