import type { RouteRecordRaw } from 'vue-router'
import { LANGUAGE } from '@/utils/storage-vars'

export default {
  namespaced: true,
  state: {
    collapsed: false, // 是否收起菜单
    viewTags: [],
    language: localStorage.getItem(LANGUAGE) || 'zh'
  },
  getters: {
  },
  mutations: {
    switchLanguage(state: any, val: string) {
      state.language = val
      localStorage.setItem(LANGUAGE, val)
    },
    switchMenu(state: any, val: boolean) {
      state.collapsed = val
    },
    addViewTag(state: any, tag: RouteRecordRaw) {
      state.viewTags = [...state.viewTags, tag]
        .filter((e: RouteRecordRaw) => e.meta && e.meta.showViewTag)
        .reduce((list: Array<RouteRecordRaw>, next: RouteRecordRaw) => {
        if (!list.find((e: RouteRecordRaw) => e.path === next.path)) {
          list.push(next)
        }
        return list
      }, [])
    },
    deleteViewTag(state: any, tag: RouteRecordRaw) {
      state.viewTags = state.viewTags.filter((e: RouteRecordRaw) => e.path !== tag.path)
    }
  },
  actions: {
  }
}
