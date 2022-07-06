<template>
  <div class="y-view-main">
    <el-button v-permission="['admin']">测试权限admin</el-button>
    <el-button v-permission="['about']" type="primary">测试权限about</el-button>
    <el-button type="primary" @click="changeProgress">changeProgress</el-button>
    <v-chart class="chart" :option="option" />
    <div class="count">
      <div>数字</div>
      <y-count-to
        :value="val"
        prefix="￥"
        suffix=" RMB"
        :count-style="{ color: 'red' }"
      />
    </div>
    <div>
      横向柱状图
      <y-progress
        :progress="progress"
        :colors="colors"
      />
    </div>
    <div>
      进度条
      <y-progress
        :progress="progress[0]"
        :colors="colors[0]"
        :max-progress="100"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const val = ref<number>(0)
const option = ref({
  title: {
    text: "Traffic Sources",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: 1548, name: "Search Engines" }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
})
const progress = ref([11, 24, 30, 10])
const colors = ref([
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

const getRandomNumber = (maxNum: boolean) => {
  return parseFloat((Math.random() * maxNum).toFixed(2))
}
const changeProgress = () => {
  val.value = getRandomNumber(10000)
  progress.value = [getRandomNumber(25), getRandomNumber(25), getRandomNumber(25), getRandomNumber(25)]
}
</script>

<style lang="scss" scoped>
  .chart{
    height: 200px;
  }
</style>
