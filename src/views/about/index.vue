<template>
  <div class="y-view-main">
    <el-button v-permission="['admin']">测试权限admin</el-button>
    <el-button v-permission="['about']" type="primary">测试权限about</el-button>
    <y-count-to
        :value="val"
        prefix="￥"
        suffix="RMB"
        :count-style="{ color: 'red' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const val = ref<number>(0)

onMounted(() => {
  setTimeout(() => {
    val.value = 2000
  }, 1500)
})
</script>

<style lang="scss" scoped>

</style>
