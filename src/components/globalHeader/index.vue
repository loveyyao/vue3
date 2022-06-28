<template>
  <header class="y-global-header">
    <div class="y-header-left">
      <img class="logo" src="@/assets/logo.png" />
      <div class="title">后台管理系统</div>
      <el-icon style="cursor: pointer" @click="switchMenu">
        <Expand v-if="$store.state.app.collapsed" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="y-header-right">
      <el-badge is-dot>
        <el-icon :size="25"><Bell /></el-icon>
      </el-badge>
      <el-avatar style="margin: 0 16px" :size="35" src="https://empty">
        <img src="@/assets/avatar.jpg"/>
      </el-avatar>
      <el-dropdown trigger="click">
        <span class="user-name">
          五更琉璃
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'

const store = useStore()
// 菜单展开收起
const switchMenu = () => {
  const collapsed = store.state.app.collapsed
  store.commit('app/switchMenu', !collapsed)
}
</script>

<style lang="scss" scoped>
  .y-global-header{
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #242f42;
    color: #fff;
  }
  .y-header-left{
    display: flex;
    font-size: 22px;
    align-items: center;
    .logo{
      height: 50px;
      margin-right: 16px;
    }
    .title{
      margin-right: 16px;
    }
  }
  .y-header-right{
    display: flex;
    align-items: center;
    height: 100%;
    .user-name{
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
    }
  }
  ::v-deep{
    .el-badge{
      height: 25px;
      cursor: pointer;
    }
  }
</style>
