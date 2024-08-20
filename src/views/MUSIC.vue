<template>
    <div class="grid-container">
        <article v-for="(post, index) in posts" :key="index">
            <a :href="'https://music.163.com/song?id='+ post.external_id" target="_blank">
            <img :src="post.img_url" :alt="post.title" />
            </a>
            <h2>{{ post.title }}</h2>
            <p>{{ post.artist }}</p>
            <!-- <p>{{ post.external_id }}</p> -->
        </article>
    </div>
    <div class="displayer">
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=320 height=520 src="//music.163.com/outchain/player?type=0&id=7213130386&auto=1&height=430"></iframe>
    </div>
  </template>
  
  <script setup>
  import axios from '@/untils/axios.js';
  import { onMounted, ref } from 'vue'
  
  const posts = ref(null)
  
  onMounted(async () => {
    try {
      const response = await axios.get('/music')
      posts.value = response.data
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  })
  </script>
  
  <style scoped>
.displayer {
  position: fixed; /* 设置绝对定位 */
  top: 0;
  left: 0;
  width: 320px;
  height: 210px;
}
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, minmax(90%, 1fr));
    gap: 1rem;
    justify-items: center;
    align-items: center;
  }
  
  article {
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #ffffff91;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1rem;
    overflow: hidden;
  }
  
  img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  </style>