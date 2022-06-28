<template>
  <div>
    <global-header />
    <div class="y-global-container">
      <global-aside-menu />
      <div class="y-global-view-main">
        <view-tags />
        <div class="y-view-main">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from '@/components/globalHeader'
import GlobalAsideMenu from '@/components/globalAsideMenu'
import ViewTags from '@/components/viewTags'
</script>

<style lang="scss" scoped>
  .y-global-container{
    width: 100%;
    height: calc(100vh - 70px);
    display: flex;
    .y-global-view-main{
      flex: 1;
      background-color: #f0f0f0;
    }
    .y-view-main{
      height: calc(100% - 30px);
    }
  }
</style>
