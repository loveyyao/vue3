<template>
  <div class="y-view-main">
    <el-button v-permission="['admin']">测试权限admin</el-button>
    <el-button v-permission="['about']" type="primary">测试权限about</el-button>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>
