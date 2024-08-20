<template>
  <div id="vditor" ref="editorRef"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});


const editorRef = ref(null);

onMounted(() => {
  const vditor = new Vditor(editorRef.value, {
    height: '50vh',
    width: '100%',
    value: props.modelValue, // 使用父组件传递的值作为初始值
    toolbar: ['emoji', 'br', 'bold', '|', 'line', 'quote', 'list', 'check'],
    cache: {
      id: 'vditor-editor', // 提供一个唯一的 id
    },
    // 其他配置选项...
  });

  // 保存 Vditor 实例以便后续操作
  editorRef.value.vditor = vditor;

});

// 监听父组件传入的值的变化
watch(
  () => props.modelValue,
  (newValue) => {
    const vditor = editorRef.value.vditor;
    if (vditor) {
      vditor.setValue(newValue);
    }
  }
);
</script>

<style scoped>
#vditor {
  border-radius: 10px; /* 添加圆角 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 0 0px rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8); /* 半透明背景色 */
}
</style>