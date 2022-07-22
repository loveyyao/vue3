<template>
  <div>
    <global-header />
    <div class="y-global-container">
      <global-aside-menu />
      <div
        class="y-global-view-main"
        :class="{'y-collapsed-view': $store.state.app.collapsed}"
      >
        <view-tags />
        <div class="y-view-main-container">
          <global-router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 配置组件自动引入，components下的组件也将会自动引入
// import GlobalHeader from '@/components/globalHeader'
// import GlobalAsideMenu from '@/components/globalAsideMenu'
// import ViewTags from '@/components/viewTags'
import GlobalRouterView from '@/layouts/GlobalRouterView.vue'
</script>

<style lang="scss" scoped>
  .y-global-container{
    width: 100%;
    height: calc(100vh - 70px);
    .y-global-view-main{
      display: block;
      background-color: #f0f0f0;
      position: absolute;
      top: 70px;
      left: 200px;
      right: 0;
      bottom: 0;
      transition: left .3s ease-in-out;
      &.y-collapsed-view{
        left: 65px;
      }
    }
    .y-view-main-container{
      width: 100%;
      height: calc(100% - 30px);
      padding: 16px;
      overflow: auto;
    }
  }
</style>
