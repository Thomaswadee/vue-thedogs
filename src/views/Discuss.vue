<template>
    <div>
        <div v-if="userStore.isLoggedIn">
            <h1>讨论区</h1>
            <!-- 讨论内容 -->
            <div class="discussion-content">
                <!-- 这里放置讨论内容 -->
                <p>这里是讨论内容...</p>
            </div>
            <!-- 评论功能 -->
            <div class="comment-section">
                <h2>评论</h2>
                <el-form :model="commentForm" :rules="commentRules" ref="commentFormRef" class="comment_form">
                    <el-form-item label="评论" prop="comment" :label-width="formLabelWidth">
                        <el-input v-model="commentForm.comment" autocomplete="off" class="input-width" placeholder="请输入评论" type="textarea" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitComment">
                            发表评论
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div v-else class="login-prompt">
            <p>请登录后查看此板块</p>
            <el-button type="primary" @click="showLoginForm">
                登录/注册
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useUserStore from '../stores/login.ts';
import type { FormInstance } from 'element-plus';
// 导入 ElMessage
import { ElMessage } from 'element-plus';

let userStore = useUserStore();

// 定义评论表单数据
const commentForm = reactive({
    comment: '',
});

// 定义表单标签宽度
const formLabelWidth = '100px';

// 表单实例引用
const commentFormRef = ref<FormInstance>();

// 验证规则
const commentRules = {
    comment: [
        { required: true, message: '请输入评论', trigger: 'blur' },
    ],
};

// 提交评论的方法
const submitComment = async () => {
    const valid = await commentFormRef.value?.validate().catch(() => false);
    if (!valid) return;

    // 处理评论逻辑
    console.log('评论提交:', commentForm);
    // 弹窗显示评论成功
    ElMessage.success('评论成功');
    commentForm.comment = ''; // 清空评论框
};

// 显示登录表单的方法
const showLoginForm = () => {
    userStore.setVisible(true);
};
</script>

<style scoped>
.discussion-content {
    margin-top: 20px;
    text-align: center; /* 文本居中 */
}

.comment-section {
    margin-top: 20px;
    margin: 0 auto; /* 表单居中 */
    text-align: center; /* 文本居中 */
    max-width: 600px; /* 可选：设置最大宽度 */
}

.input-width {
    width: 100%;
}

.comment_form {
    margin-top: 20px;
}

.login-prompt {
    margin-top: 20px;
    margin: 20px auto; /* 内容块居中 */
    text-align: center; /* 文本居中 */
    max-width: 300px; /* 可选：设置最大宽度 */
}
</style>