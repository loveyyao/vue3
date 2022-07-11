<template>
  <div class="y-view-tags">
    <el-tag
      v-for="(item, index) in viewTags"
      :key="item.path"
      style="cursor: pointer"
      type="info"
      :effect="router.currentRoute.value.path === item.path ? 'dark' : 'plain'"
      :closable="index !== 0"
      @close="closeViewTag(item, index)"
      @click="toViewTag(item)"
    >
      {{ $t('menuLang.' + item.meta.title) }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const viewTags = computed<Array<RouteRecordRaw>>(() => store.state.app.viewTags)
const closeViewTag = (tag: RouteRecordRaw, index: number) => {
  store.commit('app/deleteViewTag', tag)
  if (router.currentRoute.value.path === tag.path) {
    toViewTag(viewTags.value[index - 1])
  }
}
const toViewTag = (tag: RouteRecordRaw) => {
  router.push(tag)
}
</script>

<style lang="scss" scoped>
  .y-view-tags{
    height: 30px;
    background-color: #fff;
    box-shadow: 0 5px 10px #ddd;
    padding: 2px 10px;
    position: relative;
    z-index: 9;
  }
  ::v-deep{
    .el-tag+.el-tag{
      margin-left: 8px;
    }
  }
</style>
