import { createI18n } from 'vue-i18n'
import zh from '@/locals/lang/zh'
import en from '@/locals/lang/en'
import { LANGUAGE } from '@/utils/storage-vars'

const i18n = createI18n({
  locale: localStorage.getItem(LANGUAGE) || 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh,
    en
  }
})

export default i18n
