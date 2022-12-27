export interface YProgressProps {
  size?: number
  type?: string // circle 圆形  default默认
  showSuffix?: boolean
  progress: number[] | number
  colors?: string[] | string
  maxProgress?: number
  width?: string
}

export interface progressItem {
  width: number,
  progress: number | string
  color: string
}
