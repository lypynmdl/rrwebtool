<template>
  <div id="editor" />
</template>
<script>
import { defineComponent, onMounted } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default defineComponent({
  setup() {
    const options = {
      theme: 'snow',
      placeholder: '发布沸点...',
      modules: {
        toolbar: {
          container: ['bold', 'italic', 'underline', 'strike', 'emoji'],
          handlers: {
            // 添加按钮的处理逻辑
            emoji() {
              console.log('插入表情');
            }
          }
        }
      }
    };
    const init = () => {
      const quill = new Quill('#editor', options);
      const icons = Quill.import('ui/icons');
      icons.emoji = 
    };
    onMounted(() => {
      init();
    });
  }
});
</script>
<style lang="sass" scoped>
</style>
