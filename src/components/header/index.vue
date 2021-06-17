<template>
  <div>icon</div>
  <el-dropdown>
    <i class="el-icon-setting el-icon--right mr10"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>重置密码</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <span>Derrick Rose</span>
  </el-dropdown>
  
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter} from 'vue-router'
export default defineComponent({
  name: 'HeaderSelf',
  setup() {
    const router = useRouter();
    const loginOut = () => {
      router.push({
        path: '/homePage'
      })
    }
    
    return {
      loginOut
    }
  },
})
</script>
<style lang="scss" scoped>
</style>
