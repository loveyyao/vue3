<template>
  <div class="y-view-main">
    <div class="page">
      <div class="page-404">
        4 0 4
      </div>
      <div class="tips">
        埃罗芒阿老师提醒你访问的页面不存在哦~~
      </div>
      <div>
        <el-button
          size="large"
          type="primary"
          @click="goHome"
        >
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.replace('/')
}
</script>

<style lang="scss" scoped>
.y-view-main {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/404.jpg") center center no-repeat;
  position: relative;
  //background-size: cover;
  text-align: center;

  .page {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    opacity: .8;
  }

  .page-404 {
    font-size: 250px;
    font-weight: bolder;
    color: #ffd04b;
  }

  .tips {
    font-size: 30px;
    color: #777;
    margin: 100px 0;
  }
}
</style>
