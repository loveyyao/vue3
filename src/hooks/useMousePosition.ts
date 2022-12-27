import {
  onBeforeUnmount,
  onMounted,
  reactive
} from 'vue'

export default function () {
  const client = reactive({
    x: 0,
    y: 0
  })
  const page = reactive({
    x: 0,
    y: 0
  })
  const clickHandler = (event: MouseEvent) => {
    client.x = event.clientX
    client.y = event.clientY
    page.x = event.pageX
    page.y = event.pageY
  }
  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('click', clickHandler)
  })
  return {
    client,
    page
  }
}
