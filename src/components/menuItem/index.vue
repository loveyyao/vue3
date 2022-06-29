<template>
  <template v-for="item in menus" :key="item.path">
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ $t('menuLang.' + item.meta.title) }}</span>
      </template>
      <menu-item :menus="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <el-icon v-if="item.meta.icon">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>{{ $t('menuLang.' + item.meta.title) }}</template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
// 用于菜单的自动生成
import {
  defineComponent,
  defineProps,
  withDefaults
} from 'vue'
import type { RouteRecordRaw } from 'vue-router'

defineComponent({
  name: 'menuItem'
})
type Props = {
  menus: Array<RouteRecordRaw>
}

const props = withDefaults(defineProps<Props>(), { menus: () => [] })
</script>

<style scoped>

</style>
