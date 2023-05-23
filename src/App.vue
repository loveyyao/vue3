<template>
  <div id="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
import enLocale from 'element-plus/lib/locale/lang/en'
import { LANGUAGE } from '@/utils/storage-vars'

const locale = ref<any>(null)
const store = useStore()
const lang = computed(() => store.state.app.language)
watch(lang, (val) => {
  locale.value = val === 'zh' ? zhLocale : enLocale
})
onMounted(() => {
  locale.value = (localStorage.getItem(LANGUAGE) || 'zh') === 'zh' ? zhLocale : enLocale
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
