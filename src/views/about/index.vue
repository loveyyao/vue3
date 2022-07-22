<template>
  <div class="y-view-main">
    <el-button v-permission="['admin']">测试权限admin</el-button>
    <el-button v-permission="['admin', 'about']" type="primary">测试权限about</el-button>
    <el-button v-permission="['admin', 'table']" type="primary">测试权限table</el-button>
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
        :progress="progressCircle[0]"
        :colors="colors[0]"
        :max-progress="100"
      >
        <template
          #suffix="{progressValue, maxProgress}"
        >
          {{ progressValue + ' - ' + maxProgress }}
        </template>
      </y-progress>
    </div>
    环形进度
    <div style="display: flex">
      <y-progress
        type="circle"
        :progress="progressCircle[0]"
        :colors="colors[0]"
        :max-progress="100"
      />
      <y-progress
        type="circle"
        :progress="progressCircle[1]"
        :colors="progressColor"
        :max-progress="200"
      >
        <template
          #circleContent="{progressValue, maxProgress}"
        >
          {{ progressValue + ' / ' + maxProgress }}
        </template>
      </y-progress>
    </div>
    类型切换
    <div>
      <y-progress
        :type="progressType"
        :progress="progressCircle[0]"
        :colors="colors[0]"
        :max-progress="100"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'about'
})

const val = ref<number>(0)
const dashoffset = ref<number>(0)
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
const progressCircle = ref([10, 100])
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
const progressColor = ref('#19D4AE')
const progressType = ref('default')

const getRandomNumber = (maxNum: number) => {
  return parseFloat((Math.random() * maxNum).toFixed(2))
}
const changeProgress = () => {
  dashoffset.value = getRandomNumber(169)
  val.value = getRandomNumber(10000)
  progress.value = [getRandomNumber(25), getRandomNumber(25), getRandomNumber(25), getRandomNumber(25)]
  progressCircle.value = [getRandomNumber(100), getRandomNumber(200)]
  progressColor.value = `rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)})`
  progressType.value = progressType.value === 'default' ? 'circle' : 'default'
}
</script>

<style lang="scss" scoped>
  .chart{
    height: 200px;
  }
</style>
