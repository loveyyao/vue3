<template>
  <div
    ref="draggableMain"
    class="y-draggable-resizable"
    :style="{
      top: currentPosition.top + 'px',
      left: currentPosition.left + 'px',
      width: currentPosition.width + 'px',
      height: currentPosition.height + 'px'
    }"
    @click.stop="handleClick"
  >
    <div
      v-if="handleShow"
      class="draggable-handle handle-tl"
      @mousedown.stop.prevent="resizable('tl', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-tm"
      @mousedown.stop.prevent="resizable('tm', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-tr"
      @mousedown.stop.prevent="resizable('tr', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-ml"
      @mousedown.stop.prevent="resizable('ml', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-mr"
      @mousedown.stop.prevent="resizable('mr', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-bl"
      @mousedown.stop.prevent="resizable('bl', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-bm"
      @mousedown.stop.prevent="resizable('bm', $event)"
      @mouseup="stopResizable"
    />
    <div
      v-if="handleShow"
      class="draggable-handle handle-br"
      @mousedown.stop.prevent="resizable('br', $event)"
      @mouseup="stopResizable"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  withDefaults,
  defineProps
} from 'vue'
// import useMousePosition from '@/hooks/useMousePosition'
// const mousePosition = useMousePosition()
type Props = {
  // 控制缩放
  tl?: boolean
  tm?: boolean
  tr?: boolean
  ml?: boolean
  mr?: boolean
  bl?: boolean
  bm?: boolean
  br?: boolean
  parent?: boolean
  maxWidth?: string | number
  maxHeight?: string | number
  minWidth?: number
  minHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  tl: true,
  tm: true,
  tr: true,
  ml: true,
  mr: true,
  bl: true,
  bm: true,
  br: true,
  parent: true,
  maxWidth: '',
  maxHeight: '',
  minWidth: 0,
  minHeight: 0
})
const handleShow = ref<boolean>(false)
// 当前位置
const currentPosition = reactive({
  left: 0,
  top: 0,
  width: 300,
  height: 300
})
// 鼠标按下缓存当前位置
const cacheCurrentPosition = reactive({
  left: 0,
  top: 0,
  width: 300,
  height: 300
})
// 父元素的位置信息
const parentPosition = ref<DOMRect>({
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0
})
// 鼠标按下时的位置
const mouseDownPosition = reactive({
  clientX: 0,
  clientY: 0
})
const draggableMain = ref<HTMLElement | null>(null)
// 缩放类型
const handleType = ref<string>('')

const resizable = (type: string, event: MouseEvent) => {
  handleType.value = type
  // 获取鼠标位置
  mouseDownPosition.clientX = event.clientX
  mouseDownPosition.clientY = event.clientY
  // 缓存当前位置信息
  cacheCurrentPosition.width = currentPosition.width
  cacheCurrentPosition.height = currentPosition.height
  cacheCurrentPosition.left = currentPosition.left
  cacheCurrentPosition.top = currentPosition.top
  // 事件
  document.body.addEventListener('mousemove', handleMove)
  document.body.addEventListener('mouseup', stopResizable)
}
const stopResizable = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  document.body.removeEventListener('mousemove', handleMove)
}
const handleMove = (event: MouseEvent) => {
  event.preventDefault()
  event.stopPropagation()
  const movePosition = {
    left: currentPosition.left,
    top: currentPosition.top,
    width: currentPosition.width,
    height: currentPosition.height
  }
  // 缩放
  if (handleType.value === 'tl' && props[handleType.value]) {
    movePosition.width = cacheCurrentPosition.width - (event.clientX - mouseDownPosition.clientX)
    movePosition.left = event.clientX
    movePosition.height = cacheCurrentPosition.height - (event.clientY - mouseDownPosition.clientY)
    movePosition.top = event.clientY
    if (props.parent) {
      if (movePosition.top < parentPosition.value.top) {
        movePosition.top = parentPosition.value.top
        movePosition.height = currentPosition.height
      }
      if (movePosition.left < parentPosition.value.left) {
        movePosition.left = parentPosition.value.left
        movePosition.width = currentPosition.width
      }
    }
  }
  if (handleType.value === 'tm' && props[handleType.value]) {
    movePosition.height = cacheCurrentPosition.height - (event.clientY - mouseDownPosition.clientY)
    movePosition.top = event.clientY
    if (props.parent) {
      if (movePosition.top < parentPosition.value.top) {
        movePosition.top = parentPosition.value.top
        movePosition.height = currentPosition.height
      }
    }
  }
  if (handleType.value === 'tr' && props[handleType.value]) {
    movePosition.width = cacheCurrentPosition.width + (event.clientX - mouseDownPosition.clientX)
    movePosition.height = cacheCurrentPosition.height - (event.clientY - mouseDownPosition.clientY)
    movePosition.top = event.clientY
    if (props.parent) {
      if (movePosition.top < parentPosition.value.top) {
        movePosition.top = parentPosition.value.top
        movePosition.height = currentPosition.height
      }
      if (event.clientX > (parentPosition.value.width + parentPosition.value.left)) {
        movePosition.width = cacheCurrentPosition.width + ((parentPosition.value.width + parentPosition.value.left) - mouseDownPosition.clientX)
      }
    }
  }
  if (handleType.value === 'ml' && props[handleType.value]) {
    movePosition.width = cacheCurrentPosition.width - (event.clientX - mouseDownPosition.clientX)
    movePosition.left = event.clientX
    if (props.parent){
      if (movePosition.left < parentPosition.value.left) {
        movePosition.left = parentPosition.value.left
        movePosition.width = currentPosition.width
      }
    }
  }
  if (handleType.value === 'mr' && props[handleType.value]) {
    movePosition.width = cacheCurrentPosition.width + (event.clientX - mouseDownPosition.clientX)
    if (props.parent) {
      if (event.clientX > (parentPosition.value.width + parentPosition.value.left)) {
        movePosition.width = cacheCurrentPosition.width + ((parentPosition.value.width + parentPosition.value.left) - mouseDownPosition.clientX)
      }
    }
  }
  if (handleType.value === 'bl' && props[handleType.value]) {
    movePosition.width = cacheCurrentPosition.width - (event.clientX - mouseDownPosition.clientX)
    movePosition.left = event.clientX
    movePosition.height = cacheCurrentPosition.height + (event.clientY - mouseDownPosition.clientY)
    if (props.parent) {
      if (movePosition.left < parentPosition.value.left) {
        movePosition.left = parentPosition.value.left
        movePosition.width = currentPosition.width
      }
      if (event.clientY > (parentPosition.value.height + parentPosition.value.top)) {
        movePosition.height = cacheCurrentPosition.height + ((parentPosition.value.height + parentPosition.value.top) - mouseDownPosition.clientY)
      }
    }
  }
  if (handleType.value === 'bm' && props[handleType.value]) {
    movePosition.height = cacheCurrentPosition.height + (event.clientY - mouseDownPosition.clientY)
    if (props.parent) {
      if (event.clientY > (parentPosition.value.height + parentPosition.value.top)) {
        movePosition.height = cacheCurrentPosition.height + ((parentPosition.value.height + parentPosition.value.top) - mouseDownPosition.clientY)
      }
    }
  }
  if (handleType.value === 'br' && props[handleType.value]) {
    movePosition.height = cacheCurrentPosition.height + (event.clientY - mouseDownPosition.clientY)
    movePosition.width = cacheCurrentPosition.width + (event.clientX - mouseDownPosition.clientX)
    if (props.parent) {
      if (event.clientY > (parentPosition.value.height + parentPosition.value.top)) {
        movePosition.height = cacheCurrentPosition.height + ((parentPosition.value.height + parentPosition.value.top) - mouseDownPosition.clientY)
      }
      if (event.clientX > (parentPosition.value.width + parentPosition.value.left)) {
        movePosition.width = cacheCurrentPosition.width + ((parentPosition.value.width + parentPosition.value.left) - mouseDownPosition.clientX)
      }
    }
  }
  currentPosition.left = movePosition.left
  currentPosition.top = movePosition.top
  currentPosition.width = movePosition.width
  currentPosition.height = movePosition.height
}
const handleClick = () => {
  handleShow.value = true
}
const hideHandle = () => {
  handleShow.value = false
}
// 初始化组件位置
const init = () => {
  parentPosition.value = draggableMain.value.parentNode.getBoundingClientRect()
  console.log(parentPosition.value)
  currentPosition.top = parentPosition.value.top
  currentPosition.left = parentPosition.value.left
}
onMounted(() => {
  init()
  window.addEventListener('click', hideHandle)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', hideHandle)
  document.body.removeEventListener('mouseup', stopResizable)
})
</script>

<style lang="scss" scoped>
  .y-draggable-resizable{
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background: #3e8bff;
    opacity: .5;
  }
  .draggable-handle{
    position: absolute;
    width: 8px;
    height: 8px;
    background: #ffffff;
    border: 1px solid #333;
    box-shadow: 0 0 2px #bbb;
    &.handle-tl{
      top: -3px;
      left: -3px;
      cursor: nw-resize;
    }
    &.handle-tm{
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
      cursor: n-resize;
    }
    &.handle-tr{
      top: -3px;
      right: -3px;
      cursor: ne-resize;
    }
    &.handle-ml{
      top: 50%;
      transform: translateY(-50%);
      left: -3px;
      cursor: w-resize;
    }
    &.handle-mr{
      top: 50%;
      transform: translateY(-50%);
      right: -3px;
      cursor: w-resize;
    }
    &.handle-bl{
      bottom: -3px;
      left: -3px;
      cursor: sw-resize;
    }
    &.handle-bm{
      bottom: -3px;
      left: 50%;
      transform: translateX(-50%);
      cursor: s-resize;
    }
    &.handle-br{
      bottom: -3px;
      right: -3px;
      cursor: se-resize;
    }
  }
</style>
