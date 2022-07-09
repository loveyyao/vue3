<template>
  <div
    class="y-progress-wrap"
    :style="{width: type !== 'circle' ? width : size + 'px'}"
  >
    <template v-if="type !== 'circle'">
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
      <div
        v-if="showSuffix"
        class="y-progress-suffix"
      >
        <slot
          name="suffix"
          :progressValue="progressValue"
          :maxProgress="maxProgress"
        >
          {{ progressValue }}/{{ maxProgress }}
        </slot>
      </div>
    </template>
    <template v-else>
      <svg
        class="progress-circle"
        :width="size"
        :height="size"
        viewBox="0 0 60 60"
      >
        <circle
          cx="30"
          cy="30"
          :r="r"
          fill="transparent"
          stroke-width="2.5"
          stroke="rgba(64, 140, 255, .2)"
        />
        <circle
          class="progress"
          :r="r"
          cy="30"
          cx="30"
          stroke-width="2.5"
          :stroke="colorList[0]"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
          :stroke-dashoffset="progressCircleValue + 'px'"
          :stroke-dasharray="perimeter + 'px'"
        />
      </svg>
      <div class="progress-circle-content">
        <slot
          name="circleContent"
          :progressValue="progressValue"
          :maxProgress="maxProgress"
        >
          {{ parseFloat(((progressValue / maxProgress) * 100).toFixed(2)) }}%
        </slot>
      </div>
    </template>
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
  size?: number
  type?: string // circle 圆形  default默认
  showSuffix?: boolean
  progress: any[] | number
  colors?: any[] | string
  maxProgress?: number
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 200,
  type: 'default',
  showSuffix: true,
  progress: () => ([]),
  colors: () => ([]),
  maxProgress: 100,
  width: '100%'
})
const progressList = ref<any>([])
const colorList = ref([
  '#3e8bff',
  '#19D4AE',
  '#1593C5',
  '#FA6E86',
  '#FFB980',
  '#69840A',
  '#378256',
  '#B79757',
  '#8C73DD',
  '#EFAAB5',
  '#F272BE'
])
const progressCircleValue = ref(0)
const progressValue = ref(0)
const r = ref(27)
const perimeter = ref(parseFloat((Math.PI * 2 * r.value).toFixed(2)))
const progressRef = ref<HTMLElement>(null)

watch(() => props.progress, (newVal) => {
  const arr: any[] = []
  if (typeof newVal === 'number') {
    arr.push(newVal)
  } else {
    arr.push(...newVal)
  }
  if (props.type === 'circle') {
    progressValue.value = arr[0]
    let list = []
    if (typeof props.colors === 'string') {
      list = [props.colors]
    } else {
      list = props.colors
    }
    colorList.value = [...new Set([...list, ...colorList.value])]
  } else {
    progressValue.value = arr.reduce((val, next) => {
      val = parseFloat((val + next).toFixed(2))
      return val
    }, 0)
  }
  nextTick(() => {
    if (props.type === 'circle') {
      initCircleProgress(arr)
    } else {
      initProgress(arr)
    }
  })
}, {
  deep: true,
  immediate: true
})

const initCircleProgress = (newVal: any[]) => {
  const val = newVal[0] || 0
  progressCircleValue.value = parseFloat(((props.maxProgress - val) / props.maxProgress * perimeter.value).toFixed(2))
}
const initProgress = (newVal: any[]) => {
  const num = (newVal || []).length
  const w = progressRef.value.getBoundingClientRect().width
  progressList.value = []
  let list = []
  if (typeof props.colors === 'string') {
    list = [props.colors]
  } else {
    list = props.colors
  }
  colorList.value = [...new Set([...list, ...colorList.value])]
  for (let i = 0; i < num; i++) {
    progressList.value.push({
      width: newVal[i] / props.maxProgress * w,
      progress: newVal[i],
      color: colorList.value[i]
    })
  }
}
</script>

<style lang="scss" scoped>
  .y-progress-wrap{
    display: flex;
    align-items: center;
    position: relative;
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
    .progress-circle{
      transform: rotate(-90deg);
      .progress{
        transition: all .3s;
      }
    }
    .progress-circle-content{
      color: rgba(29, 33, 41, 1);
      font-size: 16px;
      font-weight: 400;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
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
