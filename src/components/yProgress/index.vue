<template>
  <div class="y-progress-wrap" :style="{width: width}">
    <div
      ref="progressRef"
      class="y-progress-main-wrap"
    >
      <transition-group
        class="y-progress-main"
        tag="div"
        name="progress-transition"
      >
        <div
          v-for="(item, index) in progressList"
          :key="index"
          class="y-progress-item"
          :style="{
            width: item.width + 'px',
            'background-color': progressList.length === 1 ? 'none' : item.color,
            'background-image': progressList.length === 1 ? 'linear-gradient( to left , rgba(145, 215, 255, 1),rgba(62, 139, 255, 1))' : 'none',
            'transition-delay': 0.1 * index + 's'
          }"
        />
      </transition-group>
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
  nextTick
} from 'vue'
type Props = {
  progress: any[] | number,
  colors: any[] | string,
  maxProgress?: number
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  progress: () => ([]),
  colors: () => ([]),
  maxProgress: 100,
  width: '100%'
})
const progressList = ref<any>([])
const progressValue = ref(0)
const progressRef = ref<HTMLElement>(null)

watch(() => props.progress, (newVal) => {
  const arr: any[] = []
  if (typeof newVal === 'number') {
    arr.push(newVal)
  } else {
    arr.push(...newVal)
  }
  progressValue.value = arr.reduce((val, next) => {
    val = parseFloat((val + next).toFixed(2))
    return val
  }, 0)
  nextTick(() => {
    initProgress(arr)
  })
}, {
  deep: true,
  immediate: true
})

const initProgress = (newVal: any[]) => {
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
      width: newVal[i] / props.maxProgress * w,
      progress: newVal[i],
      color: colorList[i]
    })
  }
}
</script>

<style lang="scss" scoped>
  .y-progress-wrap{
    width: 300px;
    display: flex;
    align-items: center;
    .y-progress-main-wrap{
      flex: 1;
    }
    .y-progress-main{
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background-color: rgba(64, 140, 255, .2);
      overflow: hidden;
      display: flex;
      .y-progress-item{
        width: 0;
        height: 100%;
        transition: all 0.3s;
        &:last-child{
          border-radius: 0 4px 4px 0;
        }
      }
    }
    .y-progress-suffix{
      margin-left: 8px;
      color: rgba(29, 33, 41, 1);
      font-size: 12px;
      font-weight: 400;
    }
    //@for $i from 1 through 12 {
    //  .y-progress-item:nth-child(#{$i}){
    //    transition-delay: 0.1s * ($i - 1);
    //  }
    //}
  }
  .progress-transition-enter-active {
    opacity: 0;
    transform-origin: left;
    transform: scaleX(0);
  }

  .progress-transition-enter-to {
    opacity: 1;
    transform-origin: left;
    transform: scaleX(1);
    //transition: all 0.3s; //transition要写在此处
  }
</style>
