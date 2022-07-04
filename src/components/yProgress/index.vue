<template>
  <div class="y-progress-wrap">
    <div
      ref="progressRef"
      class="y-progress-main"
    >
      <div
        v-for="(item, index) in progressList"
        :key="index"
        class="y-progress-item"
        :style="{
          width: item.width + 'px',
          'background-color': item.color,
          'transition-delay': 0.1 * index + 's'
        }"
      />
    </div>
    <div class="y-progress-suffix">{{ progressValue }}/{{ maxProgress }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  watch,
  ref,
  nextTick,
  computed
} from 'vue'
type Props = {
  progress: any[] | number,
  colors: any[] | string,
  maxProgress?: number
}

const props = withDefaults(defineProps<Props>(), {
  progress: () => ([]),
  colors: () => ([]),
  maxProgress: 100
})
const progressList = ref([])
const progressRef = ref<HTMLElement>(null)

const progressValue = computed(() => {
  return progressList.value.reduce((val, next) => {
    val = parseFloat((val + next.progress).toFixed(2))
    return val
  }, 0)
})

watch(() => props.progress, (newVal) => {
  const arr = []
  if (typeof newVal === 'number') {
    arr.push(newVal)
  } else {
    arr.push(...newVal)
  }
  nextTick(() => {
    initProgress(arr)
  })
}, {
  deep: true,
  immediate: true
})

const initProgress = (newVal) => {
  const num = (newVal || []).length
  const w = progressRef.value.getBoundingClientRect().width
  progressList.value = []
  let colorList = []
  if (typeof props.colors === 'string') {
    colorList = [props.colors]
  } else {
    colorList = props.colors
  }
  for (let i = 0; i < num; i++) {
    progressList.value.push({
      width: 0,
      progress: newVal[i],
      color: colorList[i]
    })
  }
  setTimeout(() => {
    for (let i = 0; i < num; i++) {
      progressList.value[i].width = newVal[i] / props.maxProgress * w
    }
  }, 0)
}
</script>

<style lang="scss" scoped>
  .y-progress-wrap{
    width: 300px;
    display: flex;
    align-items: center;
    .y-progress-main{
      flex: 1;
      height: 8px;
      border-radius: 4px;
      background-color: rgba(64, 140, 255, .2);
      overflow: hidden;
      display: flex;
      .y-progress-item{
        width: 0;
        height: 100%;
        transition: all .3s;
        &:last-child{
          border-radius: 0 4px 4px 0;
        }
      }
    }
    .y-progress-suffix{
      margin-left: 8px;
    }
    //@for $i from 1 through 12 {
    //  .y-progress-item:nth-child(#{$i}){
    //    transition-delay: 0.1s * ($i - 1);
    //  }
    //}
  }
</style>
