<template>
  <count-to
    class="y-count"
    :style="countStyle"
    :startVal='val.start'
    :endVal='val.end'
    :duration='duration'
    :prefix='prefix'
    :suffix='suffix'
    :separator='separator'
  />
</template>

<script lang="ts" setup>
import { CountTo } from 'vue3-count-to'
import {
  defineProps,
  withDefaults,
  watch,
  reactive
} from 'vue'
type Props = {
  value: number
  duration?: number // 动画持续时长
  prefix?: string // 前缀
  suffix?: string // 后缀
  separator?: string // 分隔符
  countStyle?: object
}

const val = reactive({
  start: 0,
  end: 0
})
const props = withDefaults(defineProps<Props>(), {
  value: 0,
  duration: 1500,
  prefix: '',
  suffix: '',
  separator: ',',
  countStyle: () => ({})
})

watch(() => props.value, (newVal: number, oldVal: number) => {
  val.start = oldVal
  val.end = newVal
})

</script>

<style lang="scss" scoped>
</style>
