<template>
    <div class="home-page">
      <el-container class="home-page" :style="{ backgroundImage: `url(${bgImageUrl})` }">
        <el-aside class="sidebar-left-top" width="300px">
          <Sidebar />
        </el-aside>
        <el-main>
          <el-header class="sections">
            <router-link to="/music" class="section music">
              <FontAwesomeIcon icon="fa-solid fa-music" /> Music
            </router-link>
            <router-link to="/bookshelf" class="section bookshelf">
              <FontAwesomeIcon icon="fa-solid fa-book-open" /> Bookshelf
            </router-link>
          </el-header>
        </el-main>
      </el-container>
      <el-container class="blog-list-container">
        <el-header class="blog-list-header">Latest Blogs</el-header>
        <el-main class="blog-list">
          <div v-for="blog in blogs" :key="blog.id" class="blog-item">
            <router-link :to="`/blog/${blog}`" class="blog-button">
              {{ blog }}
            </router-link>
          </div>
        </el-main>
      </el-container>
      <div class="music-player-container">
        <MusicPlayer />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent, ref, onMounted } from 'vue';
  import axios from '@/untils/axios.js'; // 导入预设好的 axios 实例
  import { ElMessage } from 'element-plus';
  
  // 音乐播放器组件
  const MusicPlayer = defineAsyncComponent(() => import('./MusicPlayer.vue'));
  
  // 导航栏组件
  const Sidebar = defineAsyncComponent(() => import('./SidebarComponent.vue'));
  
  const bgImageUrl = '/public/preview.jpg'; // 替换为你的背景图片URL
  
  // 博客列表数据
  const blogs = ref([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get('/blogs'); // 使用正确的路径获取博客列表
      blogs.value = response.data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      ElMessage.error('Failed to fetch blog list.');
    }
  });
  </script>
  
  <style scoped>
  .home-page {
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
  
  .sidebar-left-top {
    position: absolute;
    top: 0;
    left: 0;
    height: 70%;
    width: 300px; /* 修改宽度 */
    z-index: 1;
  }
  
  .sections {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    height: 100%; /* 设置高度为窗口的高度 */
    width: 100%; /* 设置宽度为窗口的宽度 */
    padding: 20px; /* 内边距 */
    box-sizing: border-box; /* 包含内边距和边框 */
  }
  
  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%; /* 设置高度为窗口的三分之一 */
    width: 50%; /* 设置宽度为窗口的五分之一 */
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    color: white;
    background-color: transparent;
    transition: background-color 0.3s ease;
  }
  
  .section:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .section i {
    font-size: 50em; /* 增加图标的大小 */
    margin-bottom: 10px; /* 添加底部间距 */
  }
  
  /* 博客列表容器 */
  .blog-list-container {
    position: absolute;
    top: 0;
    right: 0;
    width: 30%; /* 设置宽度 */
    height: 100%; /* 设置高度 */
    padding: 20px; /* 内边距 */
    background-color: rgba(255, 255, 255, 0.6); /* 半透明背景色 */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 0px rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(6px);
  }
  
  /* 博客列表标题 */
  .blog-list-header {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  
  /* 博客列表 */
  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  /* 博客按钮 */
  .blog-button {
    display: inline-flex; /* 使用 inline-flex */
    padding: 10px 20px;
    background-color: rgb(138, 138, 228); /* 蓝色背景 */
    color: rgb(243, 204, 240); /* 白色文本 */
    border-radius: 5px; /* 圆角 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 阴影效果 */
    transition: all 0.2s ease-in-out;
  }
  
  .blog-button:hover {
    background-color: rgb(188, 188, 219); /* 悬停时加深背景色 */
    transform: translateY(-2px); /* 悬停时稍微向上移动 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 悬停时加深阴影 */
  }
  
  /* 博客项 */
  .blog-item {
    width: 10%;
  }
  
  /* 音乐播放器容器 */
  .music-player-container {
    position: fixed;
    bottom: 20px; /* 距离底部的距离 */
    left: 30px; /* 距离左边的距离 */
    z-index: 100;
  }
  
  /* 音乐播放器样式 */
  .displayer {
      position: relative;
      top: 20px;
      left: 18%;
      z-index: 0;
    }
  </style>