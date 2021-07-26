<template>
  <el-aside class="aside">
    <el-menu
      :default-openeds="[0]"
      :default-active="$route.name"
      background-color="rgb(238, 241, 246)"
      active-text-color="#2395f1"
    >
      <el-submenu v-for="menu in menus.filter(menu => menu.visible)" :key="menu.id" :index="menu.id">
        <template #title><i :class="menu.icon" />{{ menu.title }}</template>
        <el-menu-item-group>
          <!-- <template #title>分组一</template> -->
          <el-menu-item v-for="item in menu.children.filter(item => item.visible)" :key="item.id" :index="item.id" @click="goPage(item)">{{ item.title }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
import { defineComponent, reactive, onMounted } from 'vue';
import MENU_CONF from './menuConf';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Aside',
  setup() {
    const menus = reactive(MENU_CONF);
    const router = useRouter();
    const goPage = (path) => {
      router.push(path);
    };
    // const setAsideStyle = () => {
    //   const { clientHeight } = document.body;
    //   const aside = document.querySelector('.aside');
    //   if (aside) {
    //     aside.style.height = `${clientHeight - 60 * 2}px`;
    //   }
    // };

    onMounted(() => {
      // setAsideStyle();
    });
    return {
      menus,
      goPage
    };
  }
});
</script>
<style lang="scss" scoped>
.aside{
  width: 250px !important;;
  ul{
    height: 100%;
    }
}
</style>
