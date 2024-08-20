<template>
  <div class="box">
    <el-container class="write-blog-page" :style="{ backgroundImage: `url(${bgImageUrl})` }">
      <el-main class="write-blog-main">
        <h1 class="write-blog-title">Write Your Blog</h1>
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="Title" prop="title">
            <el-input v-model="form.title" placeholder="Enter the title of your blog"></el-input>
          </el-form-item>
          <MarkdownEditor v-model="form.content" />
          <el-form-item label="Tags" prop="tags">
            <div class="tag-list">
              <span
                v-for="tag in form.tags"
                :key="tag"
                class="tag"
                @click="handleTagClose(tag)"
              >
                {{ tag }}
                <i class="el-icon-close close-icon"></i>
              </span>
              <el-input
                v-if="inputVisible"
                v-model="inputValue"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else size="small" @click="showInput">+ New Tag</el-button>
            </div>
          </el-form-item>
          <el-form-item label="File">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="beforeUpload"
              :on-success="handleFileSuccess"
              :on-error="handleFileError"
              accept=".md" 
            >
            </el-upload>
          </el-form-item>
          <el-button type="primary" class="save-button" @click="saveBlog">Save Blog</el-button>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/untils/axios.js'; // 导入预设好的 axios 实例
import MarkdownEditor from '@/views/MarkdownEditor.vue'; // 使用正确的路径
import { ElMessage } from 'element-plus';

const formRef = ref(null);
const form = ref({
  title: '',
  content: null,
  tags: [],
  file: null, // 新增文件字段
});
const rules = ref({
  title: [
    { required: true, message: 'Please enter a title', trigger: 'blur' }
  ]
});
const bgImageUrl = '/public/preview.jpg'; // 替换为你的背景图片URL
const inputVisible = ref(false);
const inputValue = ref('');

function showInput() {
  inputVisible.value = true;
  inputValue.value = '';
}

function handleInputConfirm() {
  let tags = form.value.tags;
  if (inputValue.value && !tags.includes(inputValue.value)) {
    tags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
}

function handleTagClose(tag) {
  form.value.tags.splice(form.value.tags.indexOf(tag), 1);
}

function beforeUpload(file) {
  // 由于我们已经在 el-upload 中设置了 accept 属性，这里可以简化 beforeUpload 函数
  form.value.file = file; // 将文件存储在表单数据中
  return false; // 阻止默认上传行为
}

function handleFileSuccess(response) {
  console.log('File uploaded successfully:', response);
}

function handleFileError(error) {
  console.error('File upload failed:', error);
}

onMounted(() => {
  // 初始化操作
});

async function saveBlog() {
  try {
    // 获取 Markdown 内容
    const markdownContent = form.value.content;
    
    // 确保 tags 是一个列表
    let tagsList = form.value.tags;
    // 创建 FormData 对象
    const formData = new FormData();
    formData.append('title', form.value.title);
    formData.append('content', markdownContent);
    formData.append('tags', JSON.stringify(tagsList)); // 将 tags 列表转换为 JSON 字符串

    // 检查是否有文件上传
    if (form.value.file) {
      formData.append('file', form.value.file); // 这里实际使用了 file 变量
    }

    const response = await axios.post('/writeblog', formData, {
      headers: { 'Content-Type': 'multipart/form-data' } // 设置正确的 Content-Type
    });

    console.log('Blog saved:', response.data);
    ElMessage.success('Blog saved successfully!');
  } catch (error) {
    console.error('Error saving blog:', error);
    ElMessage.error('Failed to save blog.');
  }
}
</script>
  <style scoped>
  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .write-blog-page {
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
  
  .write-blog-main {
    width: 60%; /* 占三分之二宽度 */
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.6); /* 半透明背景色 */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.6), inset 0 0 0 0px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(6px);
  }
  
  .write-blog-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: rgb(231, 112, 225);
  }
  
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  
  .tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
  }
  
  .tag .close-icon {
    font-size: 12px;
    margin-left: 5px;
    cursor: pointer;
  }
  
  .save-button {
    display: block;
    margin: 20px auto; /* 居中按钮 */
  }
  </style>