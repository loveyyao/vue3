<template>
  <div v-loading="loading" class="y-login">
    <div class="y-login-welcome">欢迎使用后台管理系统</div>
    <div class="y-login-form">
      <el-input v-model="form.username" placeholder="username">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
      <el-input
        v-model="form.password"
        type="password"
        placeholder="password"
        style="margin: 16px 0"
      >
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
      <el-button
        type="primary"
        style="width: 100%"
        @click="submitLogin"
      >
        登录
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
type Form = {
  username: string
  password: string
}
const store = useStore()
const router = useRouter()
const form = reactive<Form>({
  username: 'admin',
  password: 'password'
})
const loading = ref<boolean>(false)
const submitLogin = () => {
  loading.value = true
  store.dispatch('user/login', { ...form }).then(() => {
    loading.value = false
    router.replace('/')
  }).catch(() => {
    loading.value = false
  })
}
</script>

<style lang="scss" scoped>
  .y-login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    border-radius: 5px;
    background: hsla(0, 0%, 100%, .3);
    overflow: hidden;
    .y-login-welcome{
      width: 100%;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #545c64;
      border-bottom: 1px solid #ddd;
    }
    .y-login-form{
      padding: 30px;
    }
  }
</style>
