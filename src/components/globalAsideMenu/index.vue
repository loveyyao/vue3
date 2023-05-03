<template>
  <div class="y-aside-menu">
    <el-menu
      :router="true"
      :active-text-color="activeTextColor"
      :background-color="backgroundColor"
      :collapse="$store.state.app.collapsed"
      :default-active="activePath"
      :text-color="textColor"
    >
      <menu-item :menus="menus" />
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  computed,
  watch,
  ref
} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// import MenuItem from '@/components/menuItem'

type Props = {
  backgroundColor?: string
  activeTextColor?: string
  textColor?: string
}
const store = useStore()
const router = useRouter()
const activePath = ref<string>()
const menus = computed<Array<RouteRecordRaw>>(() => {
  // 获取侧边栏路由自动生成菜单
  return store.state.user.menus.reduce((list: Array<RouteRecordRaw>, menu: RouteRecordRaw) => {
    if (menu.path === '/') {
      list = menu.children || []
    }
    return list
  }, [])
})
const props = withDefaults(defineProps<Props>(), {
  // backgroundColor: '#545c64',
  // activeTextColor: '#3e8bff',
  // textColor: '#fff'
})
const addViewTag = (tag: RouteRecordRaw) => {
  store.commit('app/addViewTag', tag)
}
watch(() => router.currentRoute.value, (newValue: RouteRecordRaw)=> {
  activePath.value = newValue.path
  addViewTag(newValue)
}, { immediate: true })
</script>

<style lang="scss" scoped>
  .y-aside-menu{
    position: absolute;
    top: 70px;
    left: 0;
    height: 100%;
    z-index: 10;
  }
  ::v-deep{
    .el-menu{
      height: 100%;
      border: none;
    }
    .el-menu:not(.el-menu--collapse){
      width: 200px;
    }
  }
</style>
