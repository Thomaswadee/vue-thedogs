<template>
    <div class="login-prompt">
        <h2>
            项目仓库：<a href="https://github.com/Thomaswadee/vue-thedogs" target="_blank"
                style="color: black;">https://github.com/Thomaswadee/vue-thedogs</a>
        </h2>
        <h2>
            BUG反馈、网站相关请联系
            <el-tooltip class="box-item" effect="dark" content="站长qq：919331952" placement="top">
                <el-button>站长</el-button>
            </el-tooltip>。
        </h2>
        <h2>
            特别感谢：所有乐队成员
        </h2>
        <h2>
            友情链接：
                <a href="https://sanyier312.github.io/" target="_blank"
                style="color: black;">https://sanyier312.github.io/</a>
                <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="http://video.gach1koi.site" target="_blank"
                style="color: black;">http://video.gach1koi.site</a>
        </h2>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.login-prompt {
    margin-top: 20px;
    margin: 20px auto;
    text-align: center;
    max-width: 600px;
}

.login-prompt h2 {
    font-size: 1.1rem;
    color: #333;
    line-height: 1.8;
    margin: 20px auto;
    max-width: 800px;
    text-align: center;
}

:deep(.el-button, .el-button.is-round) {
    padding: 2px 7px;
}
</style>