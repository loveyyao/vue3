<template>
  <div class="y-view-main">
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="title-welcome">
              {{ userInfo.realname ? welcome + '，' + userInfo.realname + '！' : welcome }}
            </div>
          </template>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="y-statistic-item right-border">
                <el-icon :size="35"><Baseball /></el-icon>
                <div class="y-statistic-content">
                  <div class="y-statistic-title">销售量</div>
                  <y-count-to
                    :value="statisticInfo.val1"
                    :count-style="{
                      'font-size': '20px',
                      'color': 'rgb(29, 33, 41)'
                    }"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="y-statistic-item right-border">
                <el-icon :size="35"><Baseball /></el-icon>
                <div class="y-statistic-content">
                  <div class="y-statistic-title">销售量</div>
                  <y-count-to
                    :value="statisticInfo.val2"
                    :count-style="{
                      'font-size': '20px',
                      'color': 'rgb(29, 33, 41)'
                    }"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="y-statistic-item right-border">
                <el-icon :size="35"><Baseball /></el-icon>
                <div class="y-statistic-content">
                  <div class="y-statistic-title">销售量</div>
                  <y-count-to
                    :value="statisticInfo.val3"
                    :count-style="{
                      'font-size': '20px',
                      'color': 'rgb(29, 33, 41)'
                    }"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="y-statistic-item">
                <el-icon :size="35"><Baseball /></el-icon>
                <div class="y-statistic-content">
                  <div class="y-statistic-title">销售量</div>
                  <y-count-to
                    :value="statisticInfo.val4"
                    :count-style="{
                      'font-size': '20px',
                      'color': 'rgb(29, 33, 41)'
                    }"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="statistic-bottom-line" />
          <div class="statistic-cheart">
            <div class="cheart-title">
              <span>数据视图</span>
              <el-button type="primary" link>
                查看更多
              </el-button>
            </div>
            <div class="cheart-content">
              <v-chart :option="option" :autoresize="true" />
            </div>
          </div>
        </el-card>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card style="margin-top: 20px">
              <template #header>
                <div class="y-card-header">
                  <span>热门内容</span>
                  <el-button type="primary" link>查看更多</el-button>
                </div>
              </template>
              <el-tabs v-model="activeName">
                <el-tab-pane label="User" name="first">User</el-tab-pane>
                <el-tab-pane label="Config" name="second">Config</el-tab-pane>
                <el-tab-pane label="Role" name="third">Role</el-tab-pane>
                <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
              </el-tabs>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card style="margin-top: 20px">
              <div class="y-card-header">
                <span>销售类型占比</span>
              </div>
              <div class="pie-chart">
                <v-chart :option="pieOption" :autoresize="true" />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="y-card-header">
              <span>快捷操作</span>
              <el-button type="primary" link>管理</el-button>
            </div>
          </template>
          <el-row :gutter="8">
            <el-col :span="8">
              <div class="quick-item">
                <el-icon :size="30"><User /></el-icon>
                <div class="quick-item-title">用户管理</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="quick-item">
                <el-icon :size="30"><User /></el-icon>
                <div class="quick-item-title">用户管理</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="quick-item">
                <el-icon :size="30"><User /></el-icon>
                <div class="quick-item-title">用户管理</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="quick-item">
                <el-icon :size="30"><User /></el-icon>
                <div class="quick-item-title">用户管理</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
        <div class="carousel-wrap">
          <el-carousel trigger="click" height="170px" :interval="5000">
            <el-carousel-item v-for="item in 4" :key="item">
              <img src="@/assets/banner/1.jpg">
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-card>
          <template #header>
            <div class="y-card-header">
              <span>公告</span>
              <el-button type="primary" link>更多</el-button>
            </div>
          </template>
          <div class="notice-list">
            <div
              v-for="item in 5"
              :key="item"
              class="notice-item"
            >
              <div class="tag">
                <el-tag :type="item % 2 === 0 ? 'success' : 'info'">
                  {{ item % 2 === 0 ? '活动' : '通知' }}
                </el-tag>
              </div>
              <div class="content">
                内容最新优惠活动内容最新优惠活动内容最新优惠活动内容最新优惠活动
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { getWelcome } from '@/utils/utils'
import dayjs from 'dayjs'

const store = useStore()
const timer = ref(null)
const activeName = ref('first')
const welcome = ref(getWelcome(false))
const option = reactive({
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    }
  ],
  title: [
    {
      left: 'center',
      text: '销售曲线'
    }
  ],
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [
    {
      data: []
    }
  ],
  yAxis: [
    {}
  ],
  grid: [
    {
      left: '50px',
      bottom: '50px',
      right: '50px'
    }
  ],
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: []
    }
  ]
})
const pieOption = reactive({
  title: {
    text: "销售类型分析",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads"]
  },
  series: [
    {
      name: "销售类型占比",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" }
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
const statisticInfo = reactive({
  val1: 0,
  val2: 0,
  val3: 0,
  val4: 0
})

const userInfo = computed(() => store.state.user.userInfo)

const getRandomNumber = () => {
  return Math.round(Math.random() * 1000)
}
const loadData = () => {
  statisticInfo.val1 = getRandomNumber()
  statisticInfo.val2 = getRandomNumber()
  statisticInfo.val3 = getRandomNumber()
  statisticInfo.val4 = getRandomNumber()

  const xAxisData = []
  const seriesData = []
  for (let i = 0; i < 30; i++) {
    const date = dayjs().subtract(30 - i, 'day').format('YYYY-MM-DD')
    xAxisData.push(date)
    seriesData.push(getRandomNumber())
  }
  option.xAxis[0].data = xAxisData
  option.series[0].data = seriesData
  const pieList = ["Direct", "Email", "Ad Networks", "Video Ads"]
  const list = []
  for (let i = 0; i < pieList.length; i++) {
    list.push({
      value: getRandomNumber(),
      name: pieList[i]
    })
  }
  pieOption.series[0].data = list
  timer.value = setTimeout(() => {
    loadData()
  }, 10000)
}

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
onMounted(() => {
  loadData()
})
</script>

<style lang="scss" scoped>
  .title-welcome{
    font-size: 20px;
  }
  .y-statistic-item{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    .y-statistic-content{
      margin-left: 16px;
      .y-statistic-title{
        font-size: 14px;
        color: rgb(78, 89, 105);
        margin-bottom: 8px;
      }
    }
    &.right-border{
      position: relative;
      &:before{
        content: '';
        width: 1px;
        height: 80%;
        position: absolute;
        top: 50%;
        right: 0;
        background: #eee;
        transform: translateY(-50%);
      }
    }
  }
  .statistic-bottom-line{
    border-bottom: 1px solid #eee;
  }
  .statistic-cheart{
    font-size: 16px;
    .cheart-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 0;
    }
    .cheart-content{
      height: 300px;
    }
  }
  .y-card-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .quick-item{
    text-align: center;
    margin-bottom: 8px;
    .quick-item-title{
      font-size: 14px;
      margin-top: 4px;
    }
  }
  .carousel-wrap{
    margin: 20px 0;
    border-radius: 4px;
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  .notice-list{
    .notice-item{
      display: flex;
      margin-bottom: 8px;
      align-items: center;
      cursor: pointer;
      .content{
        font-size: 14px;
        flex: 1;
        margin-left: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .pie-chart{
    height: 250px;
    margin-top: 16px;
  }
</style>
