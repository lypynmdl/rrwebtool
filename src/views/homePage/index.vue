<template>
  <div class="content">Welcome to Apple Paradise!</div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomePage',
  setup() {

  }
});
</script>
<style lang="scss" scoped>
@mixin flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
.content{
  @include flex;
  width:100%;
  height: 100%
}
</style>
