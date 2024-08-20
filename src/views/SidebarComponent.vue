<template>
  <div class="sidebar">
    <div class="profile">
      <img :src="avatarUrl" alt="Avatar" class="avatar" />
      <p class="name">箴黠</p>
    </div>
    <ul class="links">
      <li>
        <a href="https://github.com/yurin-kami?tab=repositories" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-github" /> GitHub Repos
        </a>
      </li>
      <li>
        <a href="https://space.bilibili.com/388419468" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="fa-brands fa-bilibili" /> Bilibili Home
        </a>
      </li>
      <li>
        <FontAwesomeIcon icon="fa-solid fa-envelope" /> Contact Me
        <p>2063294262@qq.com</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const avatarUrl = '/public/头像.jpg'; // 替换为实际路径
</script>

<style scoped>
.sidebar {
  background-color: rgba(238, 189, 238, 0.7); /* 设置背景颜色和透明度 */
  padding: 20px;
  height: 100%;
  border-radius: 15px; /* 添加圆角 */
  backdrop-filter: blur(5px); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(5px); /* Safari 和 Chrome 支持 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.name {
  font-weight: bold;
}

.links li {
  margin-bottom: 10px;
}

.links a {
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
}

.links a i {
  margin-right: 10px;
}
</style>