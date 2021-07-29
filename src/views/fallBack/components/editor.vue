<template>
  <div class="quill-editor">
    <div id="editor" class="editor" />
    <span class="limit-tip">{{ limitWords }}/1000</span>
    <el-button type="primary" class="submit" @click="getContent">提交</el-button>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import 'quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import showPreview from './imgPreview';

export default defineComponent({
  setup() {
    let quill = null;
    const limitWords = ref(0);
    const toolOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean', 'link', 'image', 'video'],
      ['emoji'] // 表情
    ];
    const handleInsertImage = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.style.display = 'none';
      input.setAttribute('accept', 'image/png, image/jpg, image/jpeg');
      input.addEventListener('change', e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = e => {
          let index = quill.getSelection(true).index;
          quill.insertEmbed(index, 'image', e.target.result);
          // 将光标切换到图片后
          quill.setSelection(++index);
        };
        reader.readAsDataURL(file);
      });
      document.body.appendChild(input);
      input.click();
    };
    const options = {
      theme: 'snow',
      placeholder: '发布沸点...',
      modules: {
        toolbar: {
          container: toolOptions,
          handlers: {
            // 添加按钮的处理逻辑
            emoji() {
              console.log('插入表情');
            },
            image(e) {
              handleInsertImage();
              console.log('插入图片');
            }
          }
        },
        'emoji-toolbar': true,
        'emoji-textarea': false,
        'emoji-shortname': true
      }
    };
    const init = () => {
      // 先添加自定义表情，再初始化，否则不显示表情
      const icons = Quill.import('ui/icons');
      icons.emoji = '<svg t="1627291778617" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1424"><path d="M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448 448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384zM512 773.344A286.4 286.4 0 0 1 285.088 662.72a32 32 0 1 1 50.4-39.424A222.784 222.784 0 0 0 512 709.344a222.56 222.56 0 0 0 177.664-87.552 32 32 0 1 1 50.752 38.976A286.112 286.112 0 0 1 512 773.344zM368 515.2a48 48 0 0 1-48-48v-64a48 48 0 1 1 96 0v64a48 48 0 0 1-48 48z m288 0a48 48 0 0 1-48-48v-64a48 48 0 1 1 96 0v64a48 48 0 0 1-48 48z" fill="#333333" p-id="1425"></path></svg>';
      quill = new Quill('#editor', options);
      quill.on('text-change', function() {
        showPreview('editor');
        limitWords.value = quill.getLength();
      });
    };
    const getContent = () => {
      console.log(quill.container.firstChild.innerHTML);
      console.log(quill.getLength());
    };
    onMounted(() => {
      init();
    });
    return {
      limitWords,
      getContent
    };
  }
});
</script>
<style lang="scss" scoped>
@import '../../../assets/css/quill-editor.scss';

.quill-editor {
  position: relative;
}
.limit-tip{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.submit {
  position: absolute;
  bottom: -50px;
  right: 10px;
}
</style>
