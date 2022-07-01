import store from '@/store'

export const getWelcome = (login?: boolean) => {
  const date = new Date()
  const hour = date.getHours()
  let timeStr = '下午好'
  if ([8, 9].includes(hour)) {
    timeStr = `早上好`
  }
  if ([10, 11].includes(hour)) {
    timeStr = `上午好`
  }
  if ([12, 13].includes(hour)) {
    timeStr = `中午好`
  }
  if ([14, 15, 16, 17, 18].includes(hour)) {
    timeStr = `下午好`
  }
  if ([19, 20, 21, 22, 23].includes(hour)) {
    timeStr = `晚上好`
  }
  return login ? `${timeStr}，欢迎回来！` : timeStr
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
