<template>
    <div class="displayer">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="320"
        height="520"
        :src="musicSrc"
      ></iframe>
    </div>
  </template>
  
  <script setup>
  const musicSrc = 'https://music.163.com/outchain/player?type=0&id=7213130386&auto=1&height=430';
  </script>
  
  <style scoped>
  .displayer {
    position: relative;
    top: 20px;
    right: 20px;
    z-index: 100;
  }
  </style>