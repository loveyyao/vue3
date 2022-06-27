<template>
  <div>
    <global-header
      ref="header"
      title="my header"
      @change="emitEvent"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import GlobalHeader from '@/components/globalHeader/GlobalHeader.vue'
// 子组件自定义事件提交触发
const emitEvent = (msg) => {
  console.log(msg)
}
// 声明组件ref
const header = ref<InstanceType<typeof GlobalHeader>>()
onMounted(() => {
  console.log(header.value) // 子组件ref对象
  // 使用ref对象手动向外暴露的方法  相当于vue2 this.$refs.xxx.fun()
  header.value.fun('父组件调用子组件方法')
})
</script>

<style scoped>

</style>
