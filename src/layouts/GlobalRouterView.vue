<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in" :duration="{ enter: 500, leave: 300 }">
      <keep-alive
        :include="cachedViews"
        :max="cachedMax"
      >
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const cachedMax = ref<number>(10)
const cachedViews = computed<Array<RouteRecordRaw>>(() => store.state.app.cachedViews)
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s;
}

.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.3;
}

.slide-fade-enter-to, .slide-fade-leave-from {
  opacity: 1;
}
</style>
