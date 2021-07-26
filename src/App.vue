<template>
  <el-container class="app-main">
    <header-self />
    <el-container class="container">
      <aside-self />
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
    <el-footer class="footer">欢迎来到自助管理系统！</el-footer>
  </el-container>

</template>

<script>
import Header from '@/components/header';
import Aside from '@/components/aside';
export default {
  name: 'App',
  components: {
    'header-self': Header,
    'aside-self': Aside
  }
};
</script>
<style>
body, html {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
}
#app{
  height: 100%
}
</style>
<style lang="scss" scoped>
.app-main{
  height: 100%;
}
.main{
  width: calc(100% - 250px);
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3px;
}
.container{
  margin-top: 60px;
  margin-bottom: 60px;
}
.footer{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #fff;
  background-color: #545c64;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}
</style>
