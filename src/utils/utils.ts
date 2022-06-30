import store from '@/store'

export const getWelcome = () => {
  const date = new Date()
  const hour = date.getHours()
  if ([8, 9].includes(hour)) {
    return `早上好，欢迎回来！`
  }
  if ([10, 11].includes(hour)) {
    return `上午好，欢迎回来！`
  }
  if ([12, 13].includes(hour)) {
    return `中午好，欢迎回来！`
  }
  if ([14, 18].includes(hour)) {
    return `下午好，欢迎回来！`
  }
  if ([19, 23].includes(hour)) {
    return `晚上好，欢迎回来！`
  }
  return `凌晨好，欢迎回来！`
}

export const permission = (permission: any): boolean => {
  const state: any = store.state
  const roles = state.user.roles
  if (permission && permission instanceof Array && permission.length) {
    return roles.some((role: any) => permission.includes(role))
  }
  if (permission && typeof permission === 'string') {
    return roles.includes(permission)
  }
  return false
}
