y-progress进度条
===
> 该组件可用于基础进度条使用，用于展示操作进度，告知用户当前状态和预期。
> 也可作为多个数据的柱状横向堆积展示

基础使用
----
进度条使用

```vue
<template>
  进度条
  <y-progress
      :progress="progress"
      :colors="color"
      :max-progress="maxProgress"
  />
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const progress = ref(10)
const color = ref('#19D4AE')
const maxProgress = ref(100)
</script>
<style scoped>
</style>
```
环形进度条

```vue
<template>
  环形进度条
  <y-progress
      type="circle"
      :progress="progress"
      :colors="color"
      :max-progress="maxProgress"
  />
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const progress = ref(10)
const color = ref('#19D4AE')
const maxProgress = ref(100)
</script>
<style scoped>
</style>
```

横向柱状图堆积使用
----
横向柱状图

```vue
<template>
  横向柱状图
  <y-progress
      :progress="progress"
      :colors="colors"
      :max-progress="maxProgress"
  />
</template>
<script lang="ts" setup>
import {ref} from 'vue'

const progress = ref([10, 20])
const colors = ref(['#19D4AE', '#1593C5'])
const maxProgress = ref(100)
</script>
<style scoped>
</style>
```

内置属性
----

| 属性           | 说明                                                          | 类型              | 默认值  |
| ------------- | ------------------------------------------------------------  | ------------------| ------ |
| type          | 进度条类型。 circle 为环形                                        | string           | default |
| progress      | 显示进度。 type 为 circle时 progress为数组只显示数组第一项                                                 | [array, number]   | []      |
| showSuffix     | type 为 default时 是否显示后缀                                                | boolean   | true      |
| colors        | 进度条显示颜色，progress为数组时显示按照顺序显示，没有就显示内置颜色。 type 为 circle时 colors为数组时只显示数组第一项     | [array, string]   | []     |
| maxProgress   | 最大值                                                        | number             | 100
| width         | 进度条外层宽度。 type 为 default时  才生效                                              | string             | 100%
| size         | 环形进度宽度。 type 为 circle时  才生效                                              | number             | 200


内置插槽
----

| 名称           | 说明                                                            |
| ------------- | ------------------------------------------------------------   |
| suffix          | type 为 default时 后缀插槽。参数为{progressValue, maxProgress}， showSuffix 为true时生效                                 |
| circleContent    | type 为 circle时 内容插槽。参数为{progressValue, maxProgress}                                  |
