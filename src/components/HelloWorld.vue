<template>
  <header>
    {{ title }}
  </header>
  <el-button @click="emitEvent">emit</el-button>
  <el-button @click="buttonClick">show message</el-button>
</template>

<script lang="ts" setup>
// setup语法糖
// 只需在script标签中添加setup，
// 组件只需引入不用注册，
// 属性和方法也不用返回，
// 也不用写setup函数，
// 也不用写export default ，
// 甚至是自定义指令也可以在我们的template中自动获得。
// defineProps 用来接收父组件传来的 props ; defineEmits 用来声明触发的事件。
// defineExpose 来向外暴露数据及方法
import {
  getCurrentInstance,
  defineProps,
  withDefaults,
  defineEmits,
  defineExpose
} from 'vue'

// getCurrentInstance 返回当前vue实例对象
const { appContext } = getCurrentInstance()
// 获取全局绑定的方法，相当于vue2的this.$message这些之类的  $router $store
const globalProxy = appContext.config.globalProperties
// 定义props类型
type Props = {
  title?: string
}
// 定义提交事件类型
type Emits = {
  (e: 'change', msg: string): void,
  (e: 'focus', msg: string): void
}
// defineProps  声明组件props
// withDefaults  在TS下组件props默认值的定义
const props = withDefaults(defineProps<Props>(), { title: 'header' })
// 还可以不用withDefaults来定义props及校验
// const props = defineProps<Props>({
//   title: {
//     type: String,
//     default: 'default',
//     required: false,
//     validator: (val: string) => {
//       return typeof val === 'string'
//     }
//   }
// })
// defineEmits 声明自定义事件
const emits = defineEmits<Emits>()
const buttonClick = () => {
  // 使用全局对象提供的方法
  globalProxy.$message.success('message')
}
const emitEvent = () => {
  // 提交自定义事件
  emits('change', props.title)
  emits('focus', 'focus msg')
}
const fun = (e: any) => {
  console.log(e)
}
// 在传统的 Vue 组件中，
// 所有暴露在模板上的东西都隐含地暴露在组件实例上，
// 也就是父组件可以通过ref 或者子链可以全量获取到子组件所有的属性、方法。
// 大多数时候，这种全量暴露是过度的，而 vue3 setup 中必须进行手动暴露。
defineExpose({ fun })
</script>

<style scoped>

</style>
