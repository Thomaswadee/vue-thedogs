<template>
    <div class="login_container">
        <el-dialog v-model="userStore.visible" title="用户登录/注册">
            <!-- 判断 isLogin 的值，决定显示登录组件还是注册组件 -->
            <div v-if="isLogin">
                <!-- 登录组件 -->
                <el-form :model="form" :rules="loginRules" ref="loginFormRef" class="login_form">
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off" class="input-width" placeholder="请输入邮箱" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off" class="input-width" placeholder="请输入密码"
                            show-password />
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                <!-- 注册组件 -->
                <el-form :model="registerForm" :rules="registerRules" ref="registerFormRef" class="login_form">
                    <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                        <el-input v-model="registerForm.email" autocomplete="off" class="input-width"
                            placeholder="请输入邮箱" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                        <el-input v-model="registerForm.password" autocomplete="off" class="input-width"
                            placeholder="请输入密码" show-password />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword" :label-width="formLabelWidth">
                        <el-input v-model="registerForm.confirmPassword" autocomplete="off" class="input-width"
                            placeholder="请确认密码" show-password />
                    </el-form-item>
                    <el-form-item label="验证码" prop="captcha" :label-width="formLabelWidth">
                        <el-input v-model="registerForm.captcha" autocomplete="off" class="input-width"
                            placeholder="请输入验证码" />
                        <el-button type="primary" @click="sendCaptcha" :disabled="isCaptchaSent">
                            {{ isCaptchaSent ? `${captchaCountdown}秒后重试` : '获取验证码' }}
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <div class="toggle-form-btn" v-if="isLogin">
                        没有账号？去<span class="link-text" @click="toggleForm">注册</span>
                    </div>
                    <div class="toggle-form-btn" v-else>
                        已有账号？去<span class="link-text" @click="toggleForm">登录</span>
                    </div>
                    <div>
                        <el-button @click="dialogFormVisible">
                            取消
                        </el-button>
                        <el-button type="primary" @click="submitForm">
                            确定
                        </el-button>
                    </div>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useUserStore from '../../stores/login.ts';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import request from '../../utils/request';

let userStore = useUserStore();

// 定义登录表单数据
const form = reactive({
    email: '',
    password: '',
});

// 定义注册表单数据
const registerForm = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    captcha: '',
});

// 定义状态变量，控制显示登录还是注册组件
const isLogin = ref(true);

// 定义表单标签宽度
const formLabelWidth = '100px';

// 定义验证码相关的状态变量
const captcha = ref(''); // 后端返回的实际验证码
const isCaptchaSent = ref(false);
const captchaCountdown = ref(60);

// 表单实例引用
const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();

// 验证规则
const validateConfirmPassword = (rule: any, value: string, callback: any) => {
    //rule必要，但是未被调用，所以在这里打印一下防止飘黄
    console.log(rule);
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
};

const loginRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度必须在6到12位之间', trigger: 'blur' }
    ]
};

const registerRules = {
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 12, message: '密码长度必须在6到12位之间', trigger: 'blur' }
    ],
    confirmPassword: [
        { validator: validateConfirmPassword, trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '验证码必须是6位数字', trigger: 'blur' }
    ]
};

// 关闭对话框的方法
const dialogFormVisible = () => {
    userStore.visible = false;

    // 清空所有表单数据
    form.email = '';
    form.password = '';
    registerForm.email = '';
    registerForm.password = '';
    registerForm.confirmPassword = '';
    registerForm.captcha = '';
};

// 提交表单的方法
const submitForm = async () => {
    if (!isLogin.value) {
        const valid = await registerFormRef.value?.validate().catch(() => false);
        if (!valid) return;

        // 处理注册逻辑
        console.log('注册表单提交:', registerForm);
        // 验证验证码逻辑
        if (registerForm.captcha !== captcha.value) {
            ElMessage.error('验证码错误'); // 弹窗显示验证码错误
            return;
        }

        // 使用封装好的 request 进行注册请求
        try {
            const response = await request.post('/register', registerForm);
            console.log('注册响应:', response);
            ElMessage.success('注册成功'); // 弹窗显示注册成功
            userStore.login(); // 更新登录状态
            dialogFormVisible(); // 关闭对话框
        } catch (error) {
            console.error('注册失败:', error);
            ElMessage.error(String(error));
        }
    } else {
        const valid = await loginFormRef.value?.validate().catch(() => false);
        if (!valid) return;

        // 处理登录逻辑
        console.log('登录表单提交:', form);
        // 使用封装好的 request 进行登录请求
        try {
            const response = await request.post('/login', form);
            console.log('登录响应:', response);
            ElMessage.success('登录成功'); // 弹窗显示登录成功
            userStore.login(); // 更新登录状态
            dialogFormVisible(); // 关闭对话框
        } catch (error) {
            console.error('登录失败:', error);
            ElMessage.error(String(error));
        }
    }
};

// 切换登录/注册的方法
const toggleForm = () => {
    isLogin.value = !isLogin.value;

    // 清空表单数据
    if (isLogin.value) {
        form.email = '';
        form.password = '';
    } else {
        registerForm.email = '';
        registerForm.password = '';
        registerForm.confirmPassword = '';
        registerForm.captcha = '';
    }
};

// 发送验证码的方法
const sendCaptcha = async () => {
    if (registerForm.email === '') {
        ElMessage.error('请输入邮箱');
        return;
    }

    // 使用封装好的 request 进行发送验证码请求
    try {
        const response = await request.post('/send-captcha', { email: registerForm.email });
        captcha.value = response.data.captcha; // 假设后端返回的验证码字段为 captcha
        console.log('验证码已发送:', captcha.value);

        // 设置验证码已发送状态
        isCaptchaSent.value = true;

        // 开始倒计时
        let countdown = captchaCountdown.value;
        const interval = setInterval(() => {
            countdown--;
            captchaCountdown.value = countdown;
            if (countdown <= 0) {
                clearInterval(interval);
                isCaptchaSent.value = false;
                captchaCountdown.value = 60;
            }
        }, 1000);
    } catch (error) {
        console.error('验证码发送失败:', error);
        ElMessage.error(String(error));
    }
};
</script>

<style scoped>
:deep(.el-dialog) {
    width: 500px;
}

:deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.input-width {
    width: 300px;
}

.login_form {
    margin-top: 20px;
}

.dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.toggle-form-btn {
    display: inline-block;
    font-size: 14px;
    color: #606266;
}

.link-text {
    color: #4070ff;
    cursor: pointer;
}

.login_container {
    position: relative;
    height: 100%;
}

.el-form-item__content .el-input+.el-button {
    margin-top: 10px;
}

@media (max-width: 510px) {
    .input-width {
        width: 150px;
    }

    :deep(.el-dialog) {
        width: 320px;
    }

}
</style>