<template>
  <div class="y-view-main">
    <el-button v-permission="['admin']">测试权限admin</el-button>
    <el-button v-permission="['about']" type="primary">测试权限about</el-button>
    <y-count-to
      :value="val"
      prefix="￥"
      suffix="RMB"
      :count-style="{ color: 'red' }"
    />
    <v-chart class="chart" :option="option" />
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

onMounted(() => {
  setTimeout(() => {
    val.value = 2000
  }, 1500)
})
</script>

<style lang="scss" scoped>
  .chart{
    height: 500px;
  }
</style>
