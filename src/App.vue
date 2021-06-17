<template>
<el-container>
  <el-header class="header flex">
    <header-self></header-self>
  </el-header>
  <el-container>
    <el-aside class="aside" width="250px">侧边导航</el-aside>
    <el-main class="main">
       <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <router-view></router-view>
    </el-main>
  </el-container>
  <el-footer class="footer">底部</el-footer>
</el-container>
 
</template>

<script>
import HeaderSelf from '@/components/header'
export default {
  name: 'App',
  components: {
    'header-self': HeaderSelf
  }
}
</script>

<style lang="scss" scoped>
.header{
  background-color: #909399;
}
.aside{
  background-color: #409EFF;
}
.main{
  background-color: #67C23A;
}
.footer{
  background-color: #E6A23C;
}
</style>
