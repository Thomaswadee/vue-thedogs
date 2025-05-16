<template>
    <div v-if="work" class="card">
        <!--左半部分，但屏幕尺寸小时会改为上半部分-->
        <div class="left-section">
            <a :href="work.link" target="_blank">
                <img :data-src="work.cover" alt="作品封面" class="cover-image" v-lazy />
            </a>
        </div>
        <!--右半部分，同上-->
        <div class="right-section">
            <div class="title-section">
                <a :href="work.link" target="_blank">
                    <h2>{{ work.title }}</h2>
                </a>
            </div>
            <!--下拉菜单部分-->
            <div class="description-section">
                <!--下拉菜单-参演成员-->
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
                <!--下拉菜单-巡演曲目-->
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
import { ref, onMounted } from 'vue'
import { useWorksStore } from '../stores/worksStore'
import { View } from '@element-plus/icons-vue'

interface Work {
    id: number;
    cover: string;
    title: string;
    link: string;
    members: string[];
    tracks: string[];
}

const props = defineProps<{
    workId: number
}>()

// 获取作品数据
const worksStore = useWorksStore()
const work = ref<Work | null>(worksStore.getWorkById(props.workId) || null)
console.log(work.value)
const isLoading = ref(false)

// 自定义v-lazy指令，实现卡片内的图片懒加载
const vLazy = {
    mounted(el: HTMLImageElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const src = el.dataset.src
                    if (src) {
                        el.src = src
                        observer.unobserve(el)
                    }
                }
            })
        }, { rootMargin: '0px 0px 200px 0px' })

        observer.observe(el)
    }
}

// 卡片内的数据懒加载
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !work.value && !isLoading.value) {
                isLoading.value = true
                worksStore.fetchWorkById(props.workId).then(data => {
                    if (data) {
                        work.value = data
                    }
                    isLoading.value = false
                })
                observer.unobserve(entry.target)
            }
        })
    }, { rootMargin: '0px 0px 200px 0px' })

    observer.observe(document.querySelector('.card')!)
})

</script>

<style scoped>
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
    border-color: transparent;
    color: #ffffff;
    border: none;
    outline: none;
    box-shadow: none;
}

.el-dropdown :deep(.el-button:active) {
    background-color: #000000;
    border-color: transparent;
    color: #ffffff;
    border: none;
    outline: none;
    box-shadow: none;
}

.el-dropdown :deep(.el-button:focus) {
    background-color: #000000;
    border-color: transparent;
    color: #ffffff;
    border: none;
    outline: none;
    box-shadow: none;
}

.description-section .el-dropdown {
    margin-top: 35px;
    margin-left: 30px;
}

@media (max-width: 510px) {
    .card {
        flex-direction: column;
    }
}
</style>