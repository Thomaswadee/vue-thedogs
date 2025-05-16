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

const carouselStore = useCarouselStore();
const images = carouselStore.images;

const carouselHeight = ref('378px');

// 节流函数：保证某个函数在指定时间间隔内只执行一次，可以在后面多次调用
const throttle = (fn: Function, delay: number) => {
  let lastTime = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastTime > delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
};

// 计算轮播图高度
const updateCarouselHeight = () => {
    const width = window.innerWidth;
    if (width < 511) {
        carouselHeight.value = '200px';
        activeInfoIndex.value = -1; // 小屏幕则显示所有图片的信息
    } else if (width < 1024) {
        carouselHeight.value = '300px';
        activeInfoIndex.value = null;
    } else {
        carouselHeight.value = '378px';
        activeInfoIndex.value = null;
    }
};

// 监听窗口大小变化
onMounted(() => {
    window.addEventListener('resize', updateCarouselHeight);
    updateCarouselHeight();
});

onUnmounted(() => {
    window.removeEventListener('resize', updateCarouselHeight);
});

// 点击图片时的处理函数，跳转链接
const handleClick = (link: string) => {
    window.open(link, '_blank');
};

// 显示信息函数，可以写在调用此函数之后
const activeInfoIndex = ref<number | null>(null);

//启用节流函数，限制函数触发频率，每200ms只触发一次
const showInfo = throttle((index: number) => {
  activeInfoIndex.value = index;
}, 200);

const hideInfo = throttle(() => {
  if (window.innerWidth >= 600) {
    activeInfoIndex.value = null;
  }
}, 200);

const carouselRef = ref<InstanceType<typeof ElCarousel>>();

//启用节流函数，每500ms只执行一次轮播图切换，不管用户点击几次按钮
const prev = throttle(() => {
  carouselRef.value?.prev();
}, 500);

const next = throttle(() => {
  carouselRef.value?.next();
}, 500);
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
    position: relative;
    z-index: 1;
    margin-top: 0px;
    width: 100%;
}

.el-carousel {
    width: 100%;
    margin: 0 auto;
}

.el-carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s;
}

.carousel-item-content {
    position: relative;
    width: 100%;
    height: 100%;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    background-color: rgb(255, 255, 255);
    border-radius: 6px;
    transition: filter 0.5s ease;
}

img.blur-effect {
    filter: blur(5px);
}

.info-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: opacity 0.3s;
    opacity: 1;
    font-size: 16px;
}

.info-overlay.hidden {
    opacity: 0;
}

@media (max-width: 600px) {
    .info-overlay {
        font-size: 10px;
    }
}

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

:deep(.el-carousel__indicators) {
    bottom: 20px;
}

:deep(.el-carousel__indicator) {
    button {
        width: 20px;
        height: 20px;
        background-color: #a4a3a3;
        border-radius: 50%;
    }
}

:deep(.el-carousel__item) {
    border: 3px solid #000000;
    border-radius: 8px;
    padding: 0px;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>