<template>
    <div id="blog">
      <div class="post" v-if="blogByDemoTitle">
        <h2>{{ blogByDemoTitle.title }}</h2>
        <div v-html="renderedMarkdown(blogByDemoTitle.content)"></div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted, computed } from 'vue';
    import MarkdownIt from 'markdown-it';
    import axios from '@/untils/axios.js';
    import { useRoute } from 'vue-router';
  
    const route = useRoute();
  
    const posts = ref([]);
    const demoTitle = route.params.demoTitle; // 从路由参数中获取标题
  
    const md = new MarkdownIt(); // 创建一个新的 markdown-it 实例
  
    const renderedMarkdown = (content) => {
      content=String(content);
      if (!content) return '';
      content=md.render(content);
      return content; // 使用 markdown-it 解析 Markdown 文本
    };
    onMounted(async () => {
      try {
        const response = await axios.get(`/blog/${demoTitle}`);
        posts.value = response.data;
      } catch (error) {
        console.error(error);
      }
    });
  
    const blogByDemoTitle = computed(() => {
      return posts.value.find((post) => post.title === demoTitle);
    });
  </script>