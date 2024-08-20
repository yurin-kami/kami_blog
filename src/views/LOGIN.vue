<template>
  <el-container class="login-page" :style="{ backgroundImage: `url(${bgImageUrl})` }">
    <el-main>
      <div class="login-form">
        <h2 class="title">LOGIN FOR KAMI</h2>
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="Username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="Password"></el-input>
          </el-form-item>
        </el-form>
        <div class="button-wrapper">
          <el-button type="primary" class="glass-btn" @click="handleLogin">login</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import axios from '@/untils/axios.js'; // 导入预设好的 axios 实例
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const loginForm = ref({
  username: '',
  password: ''
});

const router = useRouter();

const bgImageUrl = '/public/preview.jpg'; // 替换为你的背景图片URL

const rules = ref({
  username: [
    { required: true, message: 'input kami_name', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'input kami_power', trigger: 'blur' },
    { min: 6, max: 40, message: '长度在 6 到 40 个字符', trigger: 'blur' }
  ]
});

onMounted(() => {
  // 移除了获取 CSRF token 的部分
});

async function handleLogin() {
  try {
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('username', loginForm.value.username);
    formData.append('password', loginForm.value.password);

    // 添加日志记录，打印出发送的数据
    console.log('Sending data:', Object.fromEntries(formData.entries()));

    const response = await axios.post('/admin', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // 确保使用正确的 Content-Type
      },
    });

    console.log('Response:', response.data);
    ElMessage.success('kami power!!!');

    // 成功登录后，导航到 Dashboard
    router.push('/writeblog');
  } catch (error) {
    console.error('Error:', error);
    ElMessage.error('登录错误，请检查 kami_name 和 kami_power！');
  }
}
</script>

<style scoped>
.login-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
}

.login-form {
  width: 500px;
  padding: 60px;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 0px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: rgb(231, 112, 225);
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

.el-form-item {
  font-size: 16px;
}

.el-form .el-input__inner,
.el-form .el-button {
  height: 40px;
  line-height: 40px;
}

.el-form .el-button {
  font-size: 18px;
}

.el-form-item-error-message {
  color: red; /* 更改错误消息颜色 */
}

.el-form-item-is-validating .el-form-item__content::after {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  vertical-align: middle;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiPgo8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMCAwaDIwdjJoLTJ2LTFoMTh2LTRoLTE4di0yaC0yek0wIDRoMjB2NGgtMnYtMWgxOHYxaC0ydi0zaC0xOHYyaC0yeiIvPgo8L3N2Zz4K);
  background-repeat: no-repeat;
  background-size: contain;
}

.glass-btn {
  background-color: transparent !important;
  color: #d077e2;
  border: none;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;
  height: 30px; /* 修改高度 */
  line-height: 40px; /* 修改行高 */
  font-size: 20px; /* 修改字体大小 */
}

.glass-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>