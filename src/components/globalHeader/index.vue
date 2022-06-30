<template>
  <header class="y-global-header">
    <div class="y-header-left">
      <img class="logo" src="@/assets/logo.png" />
      <div class="title">后台管理系统</div>
      <el-icon style="cursor: pointer" @click="switchMenu">
        <Expand v-if="$store.state.app.collapsed" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="y-header-right">
      <el-switch
        v-model="isZh"
        style="margin-right: 16px"
        inline-prompt
        active-text="中"
        inactive-text="英"
        @change="onlanguagechange"
      />
      <el-badge is-dot>
        <el-icon :size="25"><Bell /></el-icon>
      </el-badge>
      <el-avatar style="margin: 0 16px" :size="35">
        <img :src="userInfo.avatar || '@/assets/avatar.jpg'"/>
      </el-avatar>
      <el-dropdown trigger="click" @command="command">
        <span class="user-name">
          {{ userInfo.realname }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              icon="Setting"
              command="setting"
            >
              {{ $t('common.setting') }}
            </el-dropdown-item>
            <el-dropdown-item
              icon="SwitchButton"
              divided
              command="logout"
            >
              <span v-t="'common.logout'"></span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { getCurrentInstance, ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const isZh = ref<boolean>(true)
const store = useStore()
const router = useRouter()
const { locale, t } = useI18n()
const { appContext } = getCurrentInstance()
const globalProxy = appContext.config.globalProperties
const userInfo = computed(() => store.state.user.userInfo)
onMounted(() => {
  const lang = store.state.app.language
  isZh.value = lang === 'zh'
})
// 下拉菜单点击item事件
const command = (key: string) => {
  if (key === 'logout') {
    logout()
  }
}
// 退出登录
const logout = () => {
  globalProxy.$messageBox({
    title: t('common.tips'),
    message: t('common.logoutText'),
    showCancelButton: true,
    cancelButtonText: t('common.cancel'),
    showClose: false,
    confirmButtonText: t('common.ok'),
    closeOnClickModal: false
  }).then(() => {
    console.log('ok')
    const loadingInstance = globalProxy.$loading({
      lock: true,
      text: '退出中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    store.dispatch('user/logout').then(() => {
      loadingInstance.close()
      router.push('/user/login')
    }).catch(() => {
      loadingInstance.close()
    })
  }).catch(() => {
    console.log('cancel')
  })
}
// 菜单展开收起
const switchMenu = () => {
  const collapsed = store.state.app.collapsed
  store.commit('app/switchMenu', !collapsed)
}
const onlanguagechange = () => {
  store.commit('app/switchLanguage', isZh.value ? 'zh' : 'en')
  locale.value = isZh.value ? 'zh' : 'en'
}
</script>

<style lang="scss" scoped>
  .y-global-header{
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    background-color: #242f42;
    color: #fff;
  }
  .y-header-left{
    display: flex;
    font-size: 22px;
    align-items: center;
    .logo{
      height: 50px;
      margin-right: 16px;
    }
    .title{
      margin-right: 16px;
    }
  }
  .y-header-right{
    display: flex;
    align-items: center;
    height: 100%;
    .user-name{
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
    }
  }
  ::v-deep{
    .el-badge{
      height: 25px;
      cursor: pointer;
    }
  }
</style>
