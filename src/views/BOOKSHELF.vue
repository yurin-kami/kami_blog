<script setup>
import axios from '@/untils/axios.js'
import { onMounted, ref } from 'vue'
const posts = ref(null)
onMounted(async () => {
  try {
    const response = await axios.get('/bookshelf')
    posts.value = response.data
    // console.log(posts.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
    <div class="container">
        <div class="grid-container">
            <article v-for="(post , index) in posts" :key="index" class="item">
                <a :href="post.book_url" target="_blank">
                    <img :src=post.cover_image :alt="post.title" />
                </a>
                <h3>{{ post.title }}</h3>
                <p>{{ post.author }}</p>
            </article>
        </div>
    </div>
</template>

<style scoped>
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