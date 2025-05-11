<template>
    <div>
        <div v-if="userStore.isLoggedIn">
            <h1>讨论区</h1>
            <!-- 讨论内容 -->
            <div class="discussion-content">
                <p>讨论内容</p>
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
            <br>
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
import { ElMessage } from 'element-plus';

let userStore = useUserStore();

const commentForm = reactive({
    comment: '',
});

const formLabelWidth = '100px';

const commentFormRef = ref<FormInstance>();

const commentRules = {
    comment: [
        { required: true, message: '请输入评论', trigger: 'blur' },
    ],
};

const submitComment = async () => {
    const valid = await commentFormRef.value?.validate().catch(() => false);
    if (!valid) return;

    console.log('评论提交:', commentForm);

    ElMessage.success('评论成功');
    commentForm.comment = '';
};

const showLoginForm = () => {
    userStore.setVisible(true);
};
</script>

<style scoped>
.discussion-content {
    margin-top: 20px;
    text-align: center;
}

.comment-section {
    margin-top: 20px;
    margin: 0 auto;
    text-align: center;
    max-width: 600px;
}

.input-width {
    width: 100%;
}

.comment_form {
    margin-top: 20px;
}

.login-prompt {
    margin-top: 20px;
    margin: 20px auto;
    text-align: center;
    max-width: 300px;
}
</style>