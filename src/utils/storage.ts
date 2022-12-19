// 检测 localStorage 是否可用
export const checkLocalStorageSupported = (): boolean => {
  try {
    window.localStorage.setItem('checkLocalStorageSupported', 'checkLocalStorageSupported')
    window.localStorage.removeItem('checkLocalStorageSupported')
    return true
  } catch (e) {
    return false
  }
}
// 获取值
export const getItem = (key: string): string | null => {
  if (checkLocalStorageSupported()) {
    // 使用 localStorage
    return window.localStorage.getItem(key)
  } else {
    // 不可用采用 cookie  作为替代方案
    let result = ''
    const name = `${key}=`
    const cookieList = document.cookie.split(';')
    for(let i=0; i< cookieList.length; i++) {
      const c = cookieList[i].trim()
      if (c.indexOf(name) === 0) {
        result = c.substring(name.length, c.length)
        break
      }
    }
    return result
  }
}
// 设置值
export const setItem = (key: string, value: string) => {
  if (checkLocalStorageSupported()) {
    window.localStorage.setItem(key, value)
  } else {
    const d = new Date()
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)) // 设置一个月过期时间
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=${value}; ${expires}`
  }
}
// 删除值
export const removeItem = (key: string) => {
  if (checkLocalStorageSupported()) {
    window.localStorage.removeItem(key)
  } else {
    const d = new Date()
    d.setTime(d.getTime() - 1) // 立即过期
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `${key}=; ${expires}`
  }
}
